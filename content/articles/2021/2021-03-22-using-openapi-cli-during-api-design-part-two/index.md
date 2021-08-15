---
title: "Using `openapi-cli` during API design: part two"
date: 2021-03-23T00:30:57-04:00
draft: false
see_also: []
---

[Part one]({{< ref "2021-01-31-using-openapi-cli-during-api-design-part-one" >}}) showed the basics of using `openapi-cli` for a single-definition project. Let's see how it works for multi-definition projects.

## Multi-what?

By multi-definition project I mean a project with several OpenAPI description documents. For example, it can be useful if you want to keep contracts for all services in one place. Then, you can reuse common schemas between definitions. 

Another use case is keeping parts of your APIs hidden from the final description document (internal and external APIs). This approach will mostly work only if separation is on path-level ([see more here](https://redoc.ly/docs/resources/hide-apis/)).


## Configuration

In our small Stargate API example we are splitting gates and addresses APIs into two description docs ([commit](https://github.com/aviskase/openapi-cli-examples/commit/18f1bdb2de458859b93c1c99a6400567a2cb9442)). Next step is to change [configuration file](https://redoc.ly/docs/cli/configuration/#apidefinitions), so that `openapi-cli` would know that we have two definitions ([commit](https://github.com/aviskase/openapi-cli-examples/commit/47c4a4947b9827509a02c52550f036a139dccf36)).

```
apiDefinitions:
  gates: openapi/gates.yaml
  addresses: openapi/addresses.yaml
```
But now we need to fix our scripts in the `package.json` so that we could work with both definitions!

## Preview
If you simply run `openapi preview-docs` as we did before, it will start server only for the first definition in config file (in our case: gates).
To preview a specific definition, you need to pass a definition label from configuration file: `openapi preview-docs addresses`.

But what if we want to preview both definitions? The simple fix will be adding separate scripts to run each definition on different ports:

```
"scripts": {
	"preview:gates": "openapi preview-docs -p 8080 gates",
	"preview:addresses": "openapi preview-docs -p 8081 addresses",
	...
}
```
Then, run both commands (either setting them to background processes or in the different terminals).


## Linting
Nothing to change here! `openapi lint` without any definition labels will check all of them.



## Bundling
Remember how we had to use `-o dist/openapi` to properly generate bundled desciption doc for single-definition project? Now we should simply leave it as `-o dist`. This will generate `dist/gates.yaml` and `dist/addresses.yaml` based on definitions labels.


## Generating reference docs
To generate static reference docs we should split `npm run docs` into separate scripts to target each definition:

```
"scripts": {
	...
	"docs:gates": "node plugins/prepareOptions.js && redoc-cli bundle dist/gates.yaml -o dist/redoc-gates.html --options .redoc.json",
	"docs:addresses": "node plugins/prepareOptions.js && redoc-cli bundle dist/addresses.yaml -o dist/redoc-addresses.html --options .redoc.json",
	"docs": "npm run docs:gates && npm run docs:addresses",
	...
}
```

There is no need to run `prepareOptions.js` twice, but I'm keeping it in case I'd want to generate only one reference doc.

---

The final working `package.json` is [here](https://github.com/aviskase/openapi-cli-examples/commit/48599bdfa3322e2976329e62ea2a094be4be8bd4). As you can see, we have to manually manage some building processes, but the most important pieces (linting & bundling) are quite transparent.

In the next article we're gonna finally see juicy linting magic!
