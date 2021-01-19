---
title: "Crash course into API-related terminology"
date: 2020-12-07T20:59:28-05:00
see_also: ["2019-10-26-a-testers-guide-on-hunting-for-api-related-sources"]
---

Anyone trying to dive into the world of APIs is doomed to be confused by conflicting terminology. In this post I'm gonna touch upon the main definitions and processes. I already tried it once during [lunch&learn session at work]({{< ref 2020-03-08-hmms-february >}}), but the time has come to revisit [that old presentation](https://github.com/aviskase/trucs/blob/master/api_salad.pdf) in the written form.
 
One last note: the basis for my definitions goes from [OpenAPI Glossary](https://github.com/openapi-contrib/glossary) started by [Phil Sturgeon](https://philsturgeon.com/).
 

## Main definitions
**Specification** is some standard or RFC or whatever describing a particular format or protocol. 

**Schema** (aka: data model) is a metadata describing the data type, formats, and validation rules. Schema can be defined for content body, header, path or query parameters, etc.

**Hypermedia controls** is an easier way to say **HATEOAS**. What's that? It's a special affordance that allows a client to traverse API without hardcoding links. The simplest example would be including pagination links in the response data. E.g., a client asked to get collection of items --- the server responded with first N items and a link to the next page of results --- the client can use the link to get the next page without constructing a link on their own. 

```json
{
    "items": [
        {"id": 1},
        {"id": 2}
    ],
    "links": {
        "next": { "href": "/api/items?cursor=ae12fb2" }
    }
}
```


**Description** (aka: definition, contract) is a metadata about API, its endpoints, resources, operations, headers, parameters, and etc. 

**API description document** is a file that contains API description. It is usually written with a particular format from specifications like OpenAPI, WSDL, RAML.

**API documentation** is a collection of information pieces that allows clients to successfully use an API. It includes, *but not limited to,* an API reference documentation (which is often generated from description document). Other important pieces are: tutorials, concept explanations, registration helpers, SDKs.

## Specifications (some of them)

There are *tons* of API-related specifications. I'll cover only some.

**[OpenAPI](https://www.openapis.org/)** is used to describe both the service model and the request/response body *kinda* based on JSON Schema. It was called Swagger before being donated to Linux Foundation. You probably noticed that this created a sore spot: people still call it Swagger, perhaps, because "OpenAPI" is a bit mouthful. Anyway, know that Swagger is just a part of the  SwaggerHub branding of tooling like Swagger Editor or SwaggerUI. 

{{< warning title="" >}}
You may stumble upon people using the word "swagger" even in weirder situations:

- as a synonym for "API": "We developed swagger for creating users!", "Use this swagger to export files!" 
- as a synonym for response body: "We make a request and the swagger we got back…"
{{< /warning >}}


**[JSON Schema](https://json-schema.org/)** is for describing an instance of JSON data. OpenAPI was using an extended subset of it, but this was fixed in OAS 3.1, and now they are fully compatible. Why does it matter? Well, JSON Schema have additional tooling for client-side validations or HATEOAS support.

**[JSON: API](https://jsonapi.org/)** is an anti-bikeshedding spefication for building APIs. Imagine not inventing your own guidelines for naming and other patterns! A notable feature is  ingrained support for HATEOAS.

**[AsyncAPI](https://www.asyncapi.com/)** is like OpenAPI but for event-driven architectures. Think Kafka, AMQP, WebSocket.

Notable mentions: [gRPC](https://grpc.io/), [GraphQL](https://graphql.org/), [OData](https://www.odata.org/), [HAL](http://stateless.co/hal_specification.html), [Siren](https://github.com/kevinswiber/siren).


## Processes

 ### API-first vs. API design-first vs. API code-first
 
Read [this article for more details](https://stoplight.io/blog/is-api-planning-the-same-thing-as-api-design/). Here is a TL;DR.

**API-first** is about how you approach your API as a product: not an afterthought on top of already created system, but thought through right from the start. The good example came recently from [Obsidian's devs](https://obsidian.md/):

> For the developer the biggest issue is migrating an existing app that wasn't designed with plugin/API in mind. Having experienced this first hand with our previous product, we designed Obsidian from the ground up with a plugin API from the first version.

**API design-first** means prototyping and testing a design before any coding is started. **API code-first** (or implementation-first) means having some code written even at the the design stage. Often though, a more restricted definition is used and it's about the source of truth: description doc or code.

- Design-first: "we write description doc first and then implement".
- Code-first: "we annotate code and generate a description doc from these annotations".

Beware, as I said, this is a more restricted definition! The article I've linked uses a broader one.
 
  
 ### Description doc validation vs. linting vs. preprocessing
 
 API description doc is often written in machine-readable format, thus, we can manipulate it and check for errors. 
 
**Validation** checks that description doc conforms to some specification. 

**Linting**  checks custom rules like style. For example: check that all paths are lowercase.

**Preprocessing** allows transforming the doc based on additional rules before using it in code or documentation generation. For example, hiding some endpoints from the published version or injecting descriptions from markdown files. 


 ### `$ref`
 
When working with OpenAPI or JSON Schema you will stumble upon `$ref`'s a great deal. These are pointers to JSON structures in different locations: inside the same file or to some other file:

For example, this reference points to the schema from the other file.

```yaml
...
application/json:
  schema:
    type: object
    properties:
      data:
        $ref: ../components/schemas/Users/User.yaml
```

References help with structuring schemas, separating them into reusable pieces. 

The process of looking for value of `$ref` is called **resolution** (or lookup). Not all tools and libraries play well with multi-file resolutions, so you may want to do one of these:

- **Bundling** (aka: external inlining) replaces `$ref`'s to external files with internal references. This creates one file that is easier to share.
- **Dereferencing** (aka: internal inlining) replaces `$ref`'s to external or internal data with actual data. The resulting file will have no `$ref`'s, but will be noticeably bigger.

---

This post was triggered by discussion with [Areti Panou](https://unremarkabletester.com/) in [AB Testing podcast's slack](https://www.angryweasel.com/ABTesting/). I hope it will help you!
