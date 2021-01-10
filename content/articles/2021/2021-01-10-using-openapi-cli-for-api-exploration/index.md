---
title: "Using `openapi-cli` for API exploration"
date: 2021-01-10T14:28:31-05:00
---

[As promised]({{< ref "2020-12-18-using-openapi-cli-intro" >}}), let's dive into the usage of `openapi-cli`. The first topic is semi-non-technical: API exploration. You might be interested if:

- you're a tech writer
- you're a tester
- you don't know what the heck API exploration is


## What is API exploration
I use this term akin to *exploratory testing*. You can search for works of Cem Kaner, James Bach, Michael Bolton, Elisabeth Hendrickson, James Whittaker, but beware, that's a nice little serpentarium of a field.

In the simplest words, it is a process of learning something about API I don't know or have a limited information about. That's it. The main contexts for this activity are:

- **Necessity**. I want to use some API.
- **Curiosity**. Just looking at how other APIs are done.
- **Assessment**. I need to check APIs for certain characteristics.

There are many ways to perform exploration, countless tools and sources to use. In this article I'll be looking only at OpenAPI description documents, because that's where `openapi-cli` comes handy.

{{< note title="" >}}
When exploring unknown APIs, I run a globally installed package: `npm i -g @redocly/openapi-cli`. Then it is accessible in the terminal as `openapi <args>`. 
{{< /note >}}

## `openapi stats`
Gathers some basic statistics for an OpenAPI description document. Can be in "stylish" format (as in the example below) or in JSON.

```
➜ openapi stats http://localhost:8888/api/v1/swagger.json
Document: http://localhost:8888/api/v1/swagger.json stats:

🚗 References: 12 
📦 External Documents: 0 
📈 Schemas: 12 
👉 Parameters: 9 
🔗 Links: 0 
➡️ Path Items: 4 
👷 Operations: 7 
🔖 Tags: 1 
```

Nothing useful for me at the moment. The only use case that comes to mind is when you have a bunch of documents for an **assessment** and you're not sure where to start. Then, you can check stats for each doc and proceed with the smallest one. 

## `openapi preview-docs`
This command is the primary reason I have `openapi-cli` installed as a global package: I use it all the time. The command accepts path or link to the existing OpenAPI description document and starts a local HTTP server with the generated Redoc reference doc.

```
➜ openapi preview-docs  http://localhost/api/v1/swagger.json
Using Redoc community edition.
Login with openapi-cli login or use an enterprise license key to preview with the premium docs.


🔎  Preview server running at http://127.0.0.1:8080

👀  Watching http://localhost/api/v1/swagger.json and all related resources for changes


Bundling...

Created a bundle for http://localhost/api/v1/swagger.json successfully
```

Why you'd want that?

First, sometimes there is just an OpenAPI description document and nothing else. No documentation whatsoever. Rare, but I do stumble upon this with internal APIs.

The second reason is when there are some reference docs, but they don't fit you. 

For example, it's a SwaggerUI, and you don't like it, or the description doc has advanced features like `oneOf` or `discriminator`. In such case, SwaggerUI cannot generate fancy form-based presentation, so you have to read bare model definitions.

Or perhaps you have special needs. Lorna Jane Mitchell in her presentation on [Delightful SDKs](https://lornajane.net/resource/delightful-sdks-with-openapi) mentions that she often generates her own local reference docs because official documentations aren't *accessible*. AFAIK, she uses Redoc and made several pull requests specifically for better accessibility support.


{{< note title="" >}}
You can generate reference docs with [`redoc-cli`](https://www.npmjs.com/package/redoc-cli), but I prefer using `openapi-cli` as a one-stop shop. The difference is when you want to generate static HTML with your theme: right now you have to use a small hack [from this issue](https://github.com/Redocly/openapi-cli/issues/133).
{{< /note >}}

## `openapi split`
Reading a big OpenAPI description doc is cumbersome. Especially when you need to jump back and forth between references.

Split for the rescue! It's an opposite of the [bundling operation]({{< ref "2020-12-05-crash-course-into-api-related-terminology#ref" >}}) and separates references into several files. Though, it's a bit smarter; for example, it splits paths into separate files too. 


{{< warning >}}
This command doesn't support OpenAPI 2.
{{< /warning >}}

Let's split a description doc into `out` directory: `openapi split --outDir out openapi.json`. Here is a sample result:

```
~/out 
➜ tree
.
├── components
│   ├── parameters
│   │   ├── pageNumber.yaml
│   │   ├── pageSize.yaml
│   │   └── resourceId.yaml
│   ├── requestBodies
│   │   ├── User.yaml
│   ├── responses
│   │   ├── Error.yaml
│   │   ├── Forbidden.yaml
│   │   ├── Ok.yaml
│   │   └── Unauthorized.yaml
│   └── schemas
│       ├── Id.yaml
│       ├── ResourceId.yaml
│       ├── UserCollection.yaml
│       └── User.yaml
├── openapi.yaml
└── paths
    ├── users@{id}.yaml
    └── users.yaml
```

Another reason to use split is when you're not just exploring API, but you plan to work on it. For example, when you're switching from annotations-driven to handcrafted approach; *split creates a good starting point for refactoring*.

## `openapi lint`
You may want to do [linting]({{< ref "2020-12-05-crash-course-into-api-related-terminology#description-doc-validation-vs-linting-vs-preprocessing" >}}) in **assessment** or **curiosity** contexts:

- Assessment:
    - Is this old API at least valid per OpenAPI standard or it's complete garbage?
    - We came up with new API guidelines. Do our existing APIs conform to it? How many don't?
- Curiosity:
  - I wonder how many APIs out there follow this rule? Is it common and should we apply it in our API?


As you can see, the biggest benefits of `openapi lint` come when you use custom rules and configurations. This topic I'll be covering in later articles, stay tuned.

---

If you want to read more about OpenAPI-based API exploration, I recommend [Arnaud Lauret's series of articles about `jq`](https://apihandyman.io/api-toolbox-jq-and-openapi-part-1-using-jq-to-extract-data-from-openapi-files/).