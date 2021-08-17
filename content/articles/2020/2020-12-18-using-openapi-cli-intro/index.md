---
title: "Using `openapi-cli`: intro"
date: 2020-12-20T22:26:21-05:00
---

Before we jump into the usage of this mysterious tool with way too generic name, let me give you an introduction.

There are many tools for supporting API design via OpenAPI description documents. You can check [the list here](https://openapi.tools/).

The most common tasks are:

- dereferencing
- linting
- reference documentation preview and/or generation

I talked about dereferencing [not long ago]({{< ref "2020-12-05-crash-course-into-api-related-terminology#ref" >}}). In short, it's needed to produce a final OpenAPI description doc from more DRY and granular schemas. You can [read more about the process here](https://stoplight.io/blog/keeping-openapi-dry-and-portable/). One of the tools that can help you is [`json-schema-ref-parser`](https://github.com/APIDevTools/json-schema-ref-parser).

[Linting]({{< ref "2020-12-05-crash-course-into-api-related-terminology#description-doc-validation-vs-linting-vs-preprocessing" >}}) is used to check OpenAPI description doc for errors and style guide violations. [Spectral](https://stoplight.io/spectral) comes to mind; Arnaud Lauret has a great talk about [using it for design reviews](https://apihandyman.io/the-augmented-api-design-reviewer/).

[SwaggerUI](https://swagger.io/tools/swagger-ui/) is the most common choice for reference documentation generation. If you need something more aesthetically pleasing you can try [Redoc](https://redoc.ly/redoc) or [RapiDoc](https://mrin9.github.io/RapiDoc/).


But there is a tool that combines all of these and more: welcome to `openapi-cli` ([GitHub](https://github.com/Redocly/openapi-cli), [docs](https://redoc.ly/openapi-cli)). It supports both OpenAPI 2 (fka Swagger) and OpenAPI 3; support for 3.1 is coming soon. At the time of the writing, the tool's version 1 is still in beta phase, so keep it in mind. But I'm fairly confident in using it anyway. Why? Two reasons.

First of all, it's developed by the same team as the famous Redoc, so you already know how reference docs look like =) Redoc *is* famous. You cannot read a book or attend a conference without seeing it mentioned by someone. A lot of people use it, so it would make sense for a `openapi-cli` to be developed further.

The second reason is stated on the team's site: *"built because we needed it"*. All tools developed by Redocly are used in the other company of its founder, Adam Altman, [Rebilly](https://www.rebilly.com/). These tools weren't created in vacuum; they are constantly dogfooded by the developers whose *primary business is making good APIs*. By the way, check their [api definitions](https://github.com/Rebilly/api-definitions) for an inspiration on how to structure description doc development.


So, in this series of articles I'm gonna write about my experience of using `openapi-cli`.

We gonna go through themes:

- [using `openapi-cli` for API exploration]({{< ref "2021-01-10-using-openapi-cli-for-api-exploration" >}})
- basic API doc structuring and preparation (dereferencing, previewing, linting, handing off results) ([part 1]({{< ref "2021-01-31-using-openapi-cli-during-api-design-part-one" >}}) & [part 2]({{< ref "2021-03-22-using-openapi-cli-during-api-design-part-two" >}}))
- advanced topic: [preprocessing]({{< ref "2021-08-16-using-openapi-cli-custom-preprocessing" >}})
- advanced topic: custom linting rules
- advanced topic: decorators

And while I'm writing next posts (hehe), install and play with it!



P.S. It's a pity that Redocly team isn't very active about advertising themselves. While everyone knows and praises Redoc, `openapi-cli` isn't that well-known. Maybe the team wants to finish the beta first? Anyway, I was using it for almost a year, and I think it's time to break the silence and give it some public love!
