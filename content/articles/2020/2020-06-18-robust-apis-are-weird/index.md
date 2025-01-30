---
Title: Robust APIs are weird
Date: 2020-06-18T00:30:59.650913
categories: [it]
Tags: api
og_image: og_robust_apis_are_weird.png
---

My first full-time API testing experience was for SOAP services. There you learn what XSD is. You learn to love it.

Of course, you do! With server-side enabled validation based on a schema, you need not worry about stupid testing like checking what happens when you send 100 length string where expected maximum length is 50. Just make sure that XSD is correct.

After that witchcraft, testing RESTish APIs feels like going back in time. To the very _manual_ times. But then you learn about JSON Schema (RAML, OpenAPI, etc) and you are happy again! Yay, we can turn on server-side validation and shove off stupid testing again.

The problem is that JSON and XML are different beasts. Assuming at face value that whatever is defined in schema should be blindly validated **can be wrong.**

Let me explain why. And don't worry, I did the same mistake.

Here is a simple XML:

```xml
<?xml version="1.0"?>
<item>
  <name>Ring of the Wild Hunt</name>
  <tugrik>10</tugrik>
</item> 
```


Take _a good look at_ `tugrik` element. Without XSD you wouldn't know the expected type. While it looks like something numeric, you can't be sure. Maybe it's a string like a `name`? 

Addition of XSD clarifies that `tugrik` expects decimal value:

```xml
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="https://www.w3schools.com" xmlns="https://www.w3schools.com" elementFormDefault="qualified">

<xs:element name="item">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="name" type="xs:string"/>
      <xs:element name="tugrik" type="xs:decimal"/>
    </xs:sequence>
  </xs:complexType>
</xs:element>

</xs:schema> 
```

Now, let's convert the same document to JSON.

```json
{
	"item": {
		"name": "Ring of the Wild Hunt",
		"tugrik": "10"
	}
}
```

Oh no, you say, that looks wrong! We know that `tugrik` is a number, so make it so:

```json
{
	"item": {
		"name": "Ring of the Wild Hunt",
		"tugrik": 10
	}
}
```

Yet by doing that, now we don't even need any JSON Schema to guess the type. No pesky little quotes --- it's a number!


Perhaps you see where this is going. XML documents are plain-text. Each element's value is a simple string that frameworks cast into proper types using XSD. 

So, if `tugrik` is defined as decimal field:

```
float("10") == 10.0
float("10.0") == 10.0
float("blah") --> Exception
```

Maybe there is a trimming in between too, so `float("  10  ".trim()) == 10.0`.

Maybe our casting is incredibly smart and can do things like `float("ten") == 10.0`!

But I digress. The main point is that XML-based documents often go through casting mechanism. **Validation fails only when casting could not be done.**

JSONs are not plain-text. They already have some rudimentary types visible just by looking at them. If you add JSON Schema on top and use any _not overly robust_ validator, the behavior will be different.

Because the simplest way to validate a JSON document is first to consume it with some common library that guesses types almost like we do: "does it have quotes around? string!" And only then, with already cast value, to compare its type with whatever is defined in a schema.

(Yes, yes, I do oversimplify internals)

```
x = parse(<json>) 
assert typeof(x) == 'float'
```

then for:

- `"tugrik": 10` passes 
- `"tugrik": 10.0` passes 
- `"tugrik": "10"` fails 
- `"tugrik": "blah"` fails 


Can you guess how _really robust_ validators are different? Right! They make `"tugrik": "10"` to pass validation. Because they follow Postel's law:

> Be conservative in what you send, be liberal in what you accept.

While this statement is way more complex than puny little tester's blog could handle, it's important to know its existence and application.  Following Postel's law to any degree is _a design choice._ 

If your service is designed to handle weak input like `"tugrik": "10"` as a valid number, it's not a bug. If you send additional properties in the request and a service ignores them without throwing 4xx error, it's not a bug either. It can be very well a feature. 

And yes, there is definitely a way [to do robustness wrong or overdo it](https://techblog.workiva.com/tech-blog/wrestling-postel%E2%80%99s-law). If you write a browser engine from scratch (why?), you'll follow Postel's law religiously. Another reason would be ensuring the maximum uptime of API clients. More successful requests they do and less work is required from them to connect to your product result in more profit. 

So, when you explore new API, make sure you understand how's and why's around the design before filing bugs "Achtung, Achtung, no validation!!!1". 
