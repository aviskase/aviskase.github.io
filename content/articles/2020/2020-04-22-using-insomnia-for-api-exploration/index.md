---
Title: Using Insomnia for API exploration
Date: 2020-04-22T01:06:01.497569
Tags: api, tools, practical
categories: [it]
og_image: og_using_insomnia_for_exploration.png
see_also: ["2020-12-18-using-openapi-cli-intro"]
---

One of the tools I use almost daily is [Insomnia](https://insomnia.rest/).
It's a great alternative to the _P-everyone-knows-that-one._
Insomnia is easy to use on Linux, has plugins, and UI is clean and simple.

Let me show you some basic features. We will use [OpenWeatherMap API](https://openweathermap.org/).

## Workspaces

Workspaces are collections of thematically combined requests. Some of my workspaces are service-specific,
while others contain everything related to the particular client use case or event (i.e., cross-service).

Our first examples: get current weather and forecast for Montreal. OpenWeatherMap API requires an API key,
so you need to add it to the query parameters for each request.

![Insomnia: basic interface](insomnia_1.png)

## Environments
Too much duplication, isn't it?

Welcome to environments. Insomnia supports multi-layered variable assignments:

* Base environment: values are accessible regardless of which environment is selected.

* Sub environments: you can create as many as you want. Especially useful for testing APIs on different servers.

* Folder-level environment: requests can be grouped by folders and sometimes it makes sense to assign specific values
to all requests in the folder.


Ok, so for this API let's do like this. `https://api.openweathermap.org/data/2.5` can go into base,
because we have access only to one server.

![Insomnia: base environment](insomnia_2.png)

An API key is perfect for the sub environment.

![Insomnia: sub environment](insomnia_3.png)

_"Montreal"_ is stored as a folder-level value, just for the sake of example.

![Insomnia: folder-level environment](insomnia_4.png)

Then, our requests will look like (use `{{var_name}}` to access variable):

![Insomnia: requests with variables from environments](insomnia_5.png)

You might notice that we still have to fill out the API key query parameter for each request. Kinda boring.
That's where plugins can help, in this case, it's `insomnia-plugin-defaults`.
Just go into _Preferences > Plugins_ and type its name to install.
This plugin allows us to set default headers and/or query parameters in the environments.

![Insomnia: environment setup with query param defaults](insomnia_6.png)

And now we can remove it from requests:

![Insomnia: requests with default query params](insomnia_7.png)

## Response querying

The response for the forecast API is big. What if we want to check all returned values for
weather descriptions? We can do it by using JSONPath response filtering.

`$.list[*].weather[*].description` means _'Get descriptions from each element of `weather`
array that is a property of elements in the `list` array'_.

![Insomnia: querying response using JSONPath](insomnia_8.png)

## Generating values

Sometimes we want to use random values. Insomnia has embedded
[template tags](https://support.insomnia.rest/article/40-template-tags) for that, like timestamp and UUID. For other
cases plugins come to the rescue yet again: `insomnia-plugin-random` uses [Chance](https://chancejs.com/) library
which gives you tons of options.

Here is how to generate random latitude and longitude coordinates:

![Insomnia: random value generation](insomnia_9.png)

![Insomnia: usage of generated values in the request](insomnia_10.png)

BTW, use {{<kbd Ctrl Space>}} shortcut for the fastest template tag autocomplete.

## Reusing response values

Another commonly used feature is sending a request with values from the response of another request.
In Insomnia you should use `Response` template tag and JSONPath if you want to grab a value from the response body:

![Insomnia: pulling values from previous response](insomnia_11.png)

![Insomnia: request with pulled values](insomnia_12.png)

Pretty simple, huh?

There are other useful features and no one stops you from writing a plugin if you miss anything. But, s'il te plaît,
don't try to turn it into a complex automation solution. That's what programming languages are for.

