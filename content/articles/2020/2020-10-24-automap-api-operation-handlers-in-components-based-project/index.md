---
title: "Automap API Operation Handlers in Components-Based Project"
date: 2020-10-25T22:05:10-04:00
Modified: 2020-10-28T23:10:10-04:00
draft: false
---

[Node.js best practices repo](https://github.com/goldbergyoni/nodebestpractices) is the most comprehensive list of style guides and architectural tips for Node.js apps I've seen. The very first of them is about [structuring projects based on components instead of layers](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/breakintcomponents.md).

For example, the typical layers-based layout would be:

```
.
├── common
│   └── utils.ts
├── routers
│   ├── locations.router.ts
│   └── users.router.ts
├── services
│   ├── locations.service.ts
│   └── users.service.ts
└── index.ts
```

In comparison, this is a components-based layout:

```
.
├── common
│   └── utils.ts
├── components
│   ├── locations
│   │   ├── locations.router.ts
│   │   └── locations.service.ts
│   └── users
│       ├── users.router.ts
│       └── users.service.ts
└── index.ts
```

When it comes to API design, the design-first approach is the most recommended: write the OpenAPI description document (or in any other format), then write the implementation code. Usually, you'd want to leverage the description doc as much as possible to automate routine stuff, like request/response validation and operation handlers automapping.

For these purposes I use [`express-openapi-validator`](https://github.com/cdimascio/express-openapi-validator/) package. The default behavior for automapping is:

- grab all files sitting directly under base directory (set on `OpenApiValidator` middleware options)
- check files with names equal to `x-eov-operation-handler` from the description doc
- search files for exported functions with the names equal to either `operationId` or `x-eov-operation-id`

This behavior isn't compatible with the components-base layout, since there is no such thing as base directory: each handler lives in the separate directory. Fortunately, you can customize default behavior with [custom resolver](https://github.com/cdimascio/express-openapi-validator/#%EF%B8%8F-operationhandlers-optional)!

For example, custom resolver I wrote:

```js
operationHandlers: {
    basePath: path.join(__dirname, 'components'),
    resolver: (basePath: string, route, apiDoc) => {
        const pathKey = route.openApiRoute.substring(route.basePath.length);
        const schema = apiDoc.paths[pathKey][route.method.toLowerCase()];
        const functionName = schema['operationId'];
        const [componentName, routerName] = schema['x-eov-operation-handler'].split('.');
        const routerPath = routerName ? `${routerName}.router` : `${componentName}.router`;
        const modulePath = path.join(basePath, componentName, routerPath);
        const handler = require(modulePath);
        if (handler[functionName] === undefined) {
            throw new Error(`Could not find a [${functionName}] function in ${modulePath} when trying to route [${route.method} ${route.expressRoute}].`);
        }
        return handler[functionName];
    }
}
```

{{< warning title="" >}}
The code was updated after the fix [#426](https://github.com/cdimascio/express-openapi-validator/issues/426). Should be a valid example as of version v4.3.6.
{{< /warning >}}


It assumes several things about the project's structure:

- All handlers are in the `components/{componentName}` directories.
- All handlers have `.router` postfix in the filename
- There could be several handlers inside component. 
- Default handler should have the same name as the component. 
- `x-eov-operation-handler` is equal to either component name (default handler) or `{componentName}.{handler}`.

Why so many assumptions? First, I wanted it simple. Second, I avoided introducing libraries for glob file search (yes, Node.js doesn't have globs in standard library, bleh). And third, it will be fairly easy to change anyway!

