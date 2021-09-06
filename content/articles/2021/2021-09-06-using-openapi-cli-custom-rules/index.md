---
title: "Using `openapi-cli`: custom rules"
date: 2021-09-06T16:35:43-04:00
see_also: []
draft: false
---


If you're planning to [lint OpenAPI description documents]({{< ref "2020-12-05-crash-course-into-api-related-terminology#description-doc-validation-vs-linting-vs-preprocessing" >}}) (you should!), always check whether a linter supports adding custom rules. And I mean not just [changing severity or disabling predefined rules]({{< ref "2019-12-26-linting-openapi-specs" >}}), but actually adding new ones specific to your API standards.

`openapi-cli`, as any respectable OpenAPI linter, [allows that](https://redoc.ly/docs/cli/custom-rules/). The process is very similar to [adding preprocessors]({{< ref "2021-08-16-using-openapi-cli-custom-preprocessing" >}}).

## Example: enforcing case style
Let's look at our previous enumeration example:

```yaml
state:
	type: string
	nullable: true
	x-aviskase-enum:
	  - OK
	  - DESTROYED
	  - BURIED
```

Typically, there are guidelines for case style of enumeration values. Imagine that our rule is: all values in enumerations and extensible enumerations MUST be `CAPITAL_CASE`.

### Adding a rule
First, here is our rule file `./plugins/rules/uppercase-schema-enums.js`:

```js
//@ts-check
module.exports = UppercaseSchemaEnums;

/** @type { import('@redocly/openapi-core/src/visitors').Oas3Rule } */
function UppercaseSchemaEnums(options) {
  const enumProperties = ['enum', ...(options.enumLikeProperties || [])];
  
  return {
    Schema: {
      skip(node) {
        return node.type !== 'string';
      },
      enter(node, { report, location }) {
        for (const prop of enumProperties) {
          if (node[prop] !== undefined) {
            if (node[prop].some(s => s !== s.toUpperCase())) {
              return report({ message: `All enum values should be uppercase`, location: location.child(prop) });
            }
          }
        }
      }
    }
  };  
}
```

- Export a rule function `UppercaseSchemaEnums` that can be configured with enumeration-like properties in addition to the standard `enum`.
- All rules (like preprocessors) should return a _visitor_. We use `Schema` visitor with two methods:
	- `skip` method to ensure that we check enumerations only for properties with `type: string`
	- normal `enter` method to check the rule
- To report a problem we use the second argument of `enter` method: context. It's [destructured](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to `report` and `location`:
	- `report` is a function to report a problem (duh!)
	- `location` has several properties and methods, in our example we use `location.child()` to ask reporter to pinpoint the problem to the node's child location. Thus, the problem will be pointed to `state.x-aviskase-enum` instead of simply `state`. 

### Enabling the rule via a custom plugin
Similarly to the preprocessor plugin, we keep all custom rules bundled as a plugin in `./plugins/custom-rules.js`:

```js
//@ts-check
const UppercaseSchemaEnums = require('./rules/uppercase-schema-enums');
const id = 'custom-rules';

/** @type { import('@redocly/openapi-core/src/config/config').CustomRulesConfig } */
const rules = {
  oas3: {
    'uppercase-schema-enums': UppercaseSchemaEnums,
  },
};

module.exports = {
  id,
  rules,
};

```

Next, enable the plugin and configure the rule in the `.redocly.yaml` file:

```yaml
...
  plugins:
    - './plugins/custom-preprocessors.js'
    - './plugins/custom-rules.js'
...
  rules:
    custom-rules/uppercase-schema-enums:
      severity: error
      enumLikeProperties:
        - x-aviskase-enum
...
```

The final result is in [commit 45a99c7](https://github.com/aviskase/openapi-cli-examples/tree/45a99c7f3cfa8e1725ebccc601280f948c637910).


## Example: checking `description` property style

Let's add one more housekeeping rule: all `description` properties should start with a capital letter and end with a punctuation mark.

```js
//@ts-check
module.exports = DescriptionStyle;

/** @type { import('@redocly/openapi-core/src/visitors').Oas3Rule } */
function DescriptionStyle() {
  return {
    Info: checkStyle(),
    Server: checkStyle(), 
    ServerVariable: checkStyle(),
    PathItem: checkStyle(),
    Operation: checkStyle(), 
    ExternalDocs: checkStyle(),
    Parameter: checkStyle(),
    RequestBody: checkStyle(),
    Response: checkStyle(),
    Example: checkStyle(),
    Header: checkStyle(),
    Tag: checkStyle(),
    Schema: checkStyle(),
    SecurityScheme: checkStyle(),
  };  
}

function checkStyle(attribute = 'description') {
  return {
    skip(node) {
      return typeof node[attribute] !== 'string';
    },
    enter(node, { report, location, type }) {
      const loc = location.child([attribute]);

      const content = node[attribute].trim();
      if (content.length === 0){
        report({message: `The ${type.name} description should not be empty string.`, location: loc});
      }

      const firstChar = content.slice(0,1);
      if (firstChar !== firstChar.toLocaleUpperCase()){
        report({message: `The ${type.name} description should start with capital letter.`, location: loc});
      }

      const lastChar = content.slice(-1);
      if (!(['.', '!'].includes(lastChar))) {
        const suggest = `"<...>${content.slice(-10)}."`;
        report({message: `The ${type.name} description should end with punctuation.`, location:loc, suggest: [suggest]});
      }
    }
  };
}
```

- `description` property can be present [in several objects](https://spec.openapis.org/oas/v3.0.3.html). Thus, we target several visitors at once.
- `report` can also show suggestions: here we show a possible fix for the punctuation problem.



Don't forget to enable it in `.redocly.yaml`. Here is what we have after adding the rule and fixing _most_ of the errors: [commit 33e6a46](https://github.com/aviskase/openapi-cli-examples/tree/33e6a46e39c5237746448d8fcc9e3b8924b7d176)

But there are still two errors to fix:

```bash
validating /openapi/gates.yaml...
[1] openapi/components/schemas/Stargate.yaml:10:5 at #/properties/state/description

The Schema description should end with punctuation.

Did you mean: "<...>, `BURIED`." ?

 8 |     - nullable: true
 9 | state:
10 |   type: string
11 |   nullable: true
 … |   < 4 more lines >
16 | environment:
17 |   type: string
18 |   description: Last known place where gate is situated.

Error was generated by the custom-rules/description-style rule.


[2] openapi/components/schemas/Stargate.yaml:18:18 at #/properties/environment/description

The Schema description should end with punctuation.

Did you mean: "<...>DE_OBJECT`." ?

16 | environment:
17 |   type: string
18 |   description: Last known place where gate is situated.
19 |   nullable: true
20 |   x-aviskase-enum:

Error was generated by the custom-rules/description-style rule.
```

Hmm, looks confusing. Thanks to `suggest` we can at least see that something was added to the original description... Oh, right, that was our preprocessor! That's why I suggested to use it in the first place: if we were to modify descriptions via decorators, the rule wouldn't be able to catch this problem. 

Finally, to make linter passing, we need to fix the preprocessor plugin code [commit 81a4332](https://github.com/aviskase/openapi-cli-examples/tree/81a43321ae607fd20afd5abe4922fc86fa0fcce0).

{{< cta >}}
Rules are cooler than preprocessors and decorators: they support nested visitors. I'll cover this concept in the next article. Until then, try to come up with an example where the uppercase rule in its current form might have undesired behavior.
{{< /cta >}}
