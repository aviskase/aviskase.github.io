---
Title: "A Tester’s Guide on Hunting for API Related Sources"
Date: 2019-10-26T16:52:40.751554
Tags: api
Category: Testing
og_image: og_a-testers-guide-on-hunting-for-api-related-sources.png
see_also: ["2020-12-05-crash-course-into-api-related-terminology"]
---

You've got interested in APIs. Or you're not a fan (yet) but you have to test it. Whatever the cause, you'd want to develop a mental model of this vast field. And a model construction demands a generous supply of information to consume and digest. 

I prefer to seek knowledge in these five areas:

- standards
- dev experience
- usability
- tech writers
- vendors and companies


In this article, I'll explain a bit why each area matters and give a bunch of sources. I won’t go into details why I selected these sources in particular: some just came to my mind first. Treat them as examples, and if you know not mentioned *must-reads,* I'm happy to learn about them.

## Standards

Standards are the foundation. And reading abridged explanations in Wikipedia or someone’s blog is never enough. True understanding requires the ability to read and reason based on original documents. Details do matter for APIs.

For web services, the most valuable sources are RFC, API description and schema specifications. While some of them are community-driven, others, like GraphQL or gRPC, are backed by companies.

- [RFC 7396. JSON Merge Patch](https://tools.ietf.org/html/rfc7396)
- [RFC 7807. Problem Details for HTTP APIs](https://tools.ietf.org/html/rfc7807)
- [RFC 8594. The Sunset HTTP Header Field](https://tools.ietf.org/html/rfc8594)
- [OpenAPI](https://swagger.io/specification/)
- [RAML](https://raml.org/)
- [JSON Schema](https://json-schema.org/)
- [gRPC](https://grpc.io/)
- [GraphQL](https://graphql.org/)

## Dev Experience

Barebone foundation is important, but let's add some meat. While you can try to speculate about practical differences between GraphQL and REST+HTTP/2, you'll learn faster from those who develop and use APIs as their career. I'm talking about developers, of course. For some inexplicable reason, some so-called "professionals" still perpetuate a myth about testers not being able to understand devs' books and articles, so prove those haters wrong!

- [Martin Fowler](https://martinfowler.com)
- [Mark Nottingham](https://www.mnot.net/blog/)
- [Phil Sturgeon](https://phil.tech/)
- [APIs You Won't Hate](https://apisyouwonthate.com)

## Usability

I [like API usability]({{< ref "2019-10-13-how-to-test-api-usability-part-1" >}}) [very much]({{< ref "2019-10-19-how-to-test-api-usability-part-2" >}}). Compared to performance or security, this theme is often overlooked. HCI is the whole field of study with real research and statistics magic, which may feel overwhelming at first. [Here is a selection of papers to begin with](https://docsbydesign.com/2017/09/20/a-brief-history-of-api-docs/).

By the way, there is a term in HCI: developer's experience. DX is like UX, but when a user is a developer. 

## Tech Writers

I insist that without proper documentation an otherwise perfect API is still a shit. And who knows about docs better than technical writers? APIs are a hot topic for them, simply because that's higher-paying field.

- ["Docs by Design" by Bob Watson](https://docsbydesign.com)
- ["I'd Rather Be Writing" by Tom Johnson ](https://idratherbewriting.com/)

On the side note, it's curious from the tester's viewpoint that tech writers have the same holy war about how "technical" they should be. Cute, isn't it?

## Vendors and Companies

Almost all IT companies now have blogs and even conferences, and those prove to be an excellent source. I'd suggest paying attention to:

* vendors who create tools to work with API:
    * [Postman](http://blog.getpostman.com)
    * [Stoplight](https://stoplight.io/blog/)
* companies whose main business is to provide or consume APIs:
    * [The Zapier Engineering](https://zapier.com/engineering/)
    * [Stripe Engineering](https://stripe.com/en-ca/blog/engineering)

Though, be skeptical. The former tries to sell their tools, whereas the latter tend to show-off.

## Testers

Some of you are probably asking where are recommendations on testers? Well... **fuck testers.**

_Don't even bother reading **attentively** testers' blogs about API._ Don't make my mistake! I've lost an unimaginable amount of time doing that: oftentimes, all of them can be divided into three categories:

1. How to apply well-known testing methods and techniques to APIs.
2. Basic theory on how APIs work. 
3. Tutorials on using `<insert a library or a tool name>` to test API. All those RestAssured, Karate, you name it.

Don't get me wrong, I do understand that I'm also an offender and write similar articles. There is some value in them. For me, it's a way to sort my thoughts. And reading still helps making sense on what to look for. Moreover, if you've just started your tester's journey, perhaps you're not so comfortable with test theory, then [stories about its application](https://www.developsense.com/blog/2018/07/exploratory-testing-on-an-api-part-1/) are useful. Nevertheless, I can go on a day-long rant about how _learning **only** from testers stupefies you._ 

So, heed my advice. I bet you already follow all those testers and see API related stuff from them once in a while. Skim through, there could be some interesting info, but don't rely on them. Fun fact: the most popular talks on the [Heisenbug conference](https://heisenbug.ru/en/) are from non-testers. Testing can never be an idea by itself; you need a practical application to other fields to give testing a sense and direction. That's why studying those fields proves to be productive and enlightening. **Always hunt for other sources!** 


