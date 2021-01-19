---
Title: "API testing in Python: requests vs bravado"
Date: 2020-02-07T23:40:44.958491
Tags: api, practical, tools
Category: Testing
og_image: og_requests-vs-bravado.png
---


{{< note >}}
This article is written as a result of collaboration with [TestProject](https://testproject.io/). 
While many of you know me as [a GUI-driven tools hater]({{< ref "2019-11-25-why-i-dont-use-postman" >}}), 
that's just my preference, so if something works for you and your company, that's the only thing 
that matters. There are no best practices and there are no best tools for everyone. 

What I really admire the TestProject team for is their strategy of creating a knowledge-sharing community.
And their product has a totally free usage tier. You don't see such combo often.
{{< /note >}}

API testing is not an uncommon topic and you can find a gazillion of articles about it. If you check tutorials in 
Java or JavaScript, you’ll notice that they use a plethora of diverse libraries. Yet for Python 
[tutorials](https://www.dowen.me.uk/Automated-rest-api-testing-with-python/) are usually based on general-purpose 
[requests](https://requests.kennethreitz.org) library. In this article, I would like to suggest a different approach. 

Warning: all code examples are written and checked in Python 3.7.
[You can find the source code here](https://github.com/aviskase/testproject-api-example).

TestProject has an API based [on OpenAPI 2.0 specification](https://api.testproject.io/docs/v2/). 
I’ll use it as an example. If you want to try yourself, don’t forget to create an API key!

Let’s start with the plain old _requests_ first. But before diving into coding, I suggest **thinking** about what your 
framework should be capable of. Don’t spend too much time on the design though, premature overengineering is harmful.

TestProject API is structured around different resources and methods. For example, to get information about a specific 
project you should use `projects/{identifier}` endpoint with method GET. You’ll probably soon get tired writing 
`request.get(<params>)` all the time, so let’s create a custom function (or method).

The next commonly used piece is authorization. All calls to API require `Authorization` header with your API key. 
But sometimes you want to pass additional headers, so your framework should support that as well.

This is an example class I wrote:

```python
import requests


class APITestProject:
    endpoint = 'https://api.testproject.io/v2'
    auth_headers = {}

    def __init__(self, api_key=None):
        # Sometimes we don't want to authorize requests
        if api_key:
            self.auth_headers = {'Authorization': api_key}

    def _construct_headers(self, headers):
        # Allows to combine authorization header with per-request custom headers
        if isinstance(headers, dict):
            return {**self.auth_headers, **headers}
        return self.auth_headers

    def get_specific_project(self, identifier, headers=None):
        return requests.get(f'{self.endpoint}/projects/{identifier}', headers=self._construct_headers(headers))

```

Now it’s time to write simple tests. I use _pytest_ as a test runner because of its versatility and pluggability.

```python
import pytest

from requests_client.api_testproject import APITestProject


@pytest.fixture(scope='module')
def api(api_key):
    return APITestProject(api_key)


def test_get_specific_project(api, existing_project):
    response = api.get_specific_project(existing_project)
    assert response.status_code == 200


def test_get_nonexisting_project(api):
    response = api.get_specific_project('iZyZmrbAAkuHyqdB3O6fHd')
    assert response.status_code == 404


def test_get_specific_project_accept_html(api, existing_project):
    response = api.get_specific_project(existing_project, headers={'Accept': 'text/html'})
    assert response.status_code == 406

```

If you are not familiar with pytest fixtures, you can read about them in 
[the official documentation](https://docs.pytest.org/en/latest/fixture.html). In short, here I have three fixtures: 

* `api_key` — defined in `conftest.py` and returns a string with my API key
* `existing_project` — defined in `conftest.py` and returns a string with id of one of my project
* `api` — constructs a default client for API using an API key

Tests are pretty straightforward:

* Retrieve information about the existing project.
* Attempt to get information using non-existing project id.
* Attempt to retrieve information about the existing project while asking to send information in the HTML format.

They assert only responses’ status codes (not the best tests ever). But take a look at the last test. At the time 
of writing the only officially supported response content types were: `application/json`, `text/json`, `text/plain`, and
`application/json-patch+json`. Though, if you take a careful look at the description doc, you’ll notice that 
`application/xml` is supported too. Anyway, with `Accept: text/html` you’d expect server to respond with 
`406 Not Acceptable`. Yet, that’s not the case: the current version responds with 200 code and plain text json body. 
It's not a serious issue, but it's worth exploring because it means that there are places where server capabilities 
don't match the published description doc. I suspect it's a sign of a design-first approach (which I like!), but it can 
be hard to manage.

As you noticed, for creating API tests using requests library we need to write a lot of boilerplate code:

* Wrappers for headers and query string managements.
* Methods/functions written in business terms rather than GET/POST/etc way.
* Constructing endpoints path (concatenating the main URL with paths, ids, and query parameters).

Basically, you create a whole API client. And we haven’t even touched data models. Oh, if only this could be 
simplified and automated, right? And it can! Welcome to the brave _old_ world of client generation based on API 
description docs. TestProject doesn't just provide endpoints but also has a description doc to describe their API. 
Currently, it’s based on Open API 2.0, or, as many people still call it, Swagger. This description doc is used to 
generate a documentation UI with "Try out" capabilities, and it also can be used for client generation. Personally, I 
ended up using [bravado](https://github.com/Yelp/bravado) library for this task.

Here is how our small class will look with bravado:

```python
import json
from pathlib import Path

from bravado.client import SwaggerClient
from bravado.requests_client import RequestsClient


class APITestProject:
    host = 'api.testproject.io'
    swagger_spec = 'https://api.testproject.io/docs/v2/swagger.json'
    swagger_file = Path(__file__).parent / 'swagger.json'

    def __init__(self, api_key=None):
        http_client = RequestsClient()
        if api_key:
            http_client.set_api_key(self.host, api_key, param_name='Authorization', param_in='header')
        # Usually I'll use `from_url` generation, but current version of specification is not valid OpenAPI 2.0
        # self.client = SwaggerClient.from_url(self.swagger_spec, http_client=http_client)
        swagger_spec = json.load(self.swagger_file.open())
        self.client = SwaggerClient.from_spec(swagger_spec, http_client=http_client)

```

There are two ways to generate a client with bravado: pointing either to URL where description doc is hosted or to 
the local file. The example uses local file because bravado doesn't just simply generate client, but also can 
perform validation, and unfortunately at the time of writing TestProject API description doc contains some invalid 
attributes. But that’s a great thing! Even though developers should be using linters to check for such problems, it 
is still a good idea to recheck during integration tests. Another nice feature is that bravado performs requests and 
response validation, which can help find dynamic problems. For example, if the description doc says that the field in 
the response should be an integer, yet you received a string, you’ll get an exception even if there were no explicit 
assertions for that field in the test. Of course, you can disable all validations, though, I wouldn't recommend that.

So, let’s go back to the tests and see how they look with bravado based client:

```python
import pytest
from bravado.exception import HTTPNotFound, HTTPNotAcceptable

from bravado_client.api_testproject import APITestProject


@pytest.fixture(scope='module')
def api(api_key):
    return APITestProject(api_key).client


def test_get_specific_project(api, existing_project):
    response = api.Projects.Projects_GetProject(projectId=existing_project).response()
    assert response.metadata.status_code == 200


def test_get_nonexisting_project(api):
    with pytest.raises(HTTPNotFound):
        api.Projects.Projects_GetProject(projectId='iZyZmrbAAkuHyqdB3O6fHd').response()


def test_get_specific_project_accept_html(api, existing_project):
    with pytest.raises(HTTPNotAcceptable):
        api.Projects.Projects_GetProject(
            projectId=existing_project,
            _request_options={'headers': {'Accept': 'text/html'}}
        ).response()

```

Did you notice magic there? I don’t need to write code with GETs anymore. Bravado generates resources and methods 
for them automagically. Usually, they are based on tag and `operationId`, so for getting a specific project: 
`tag=Projects` and `operationId=Projects_GetProject`. Another difference is that bravado throws an exception if the 
response code is not 2xx. In my view, `HTTPNotAcceptable` is more readable than a number 406.

Now it’s time to check how using client generation library helps to improve on a barebone approach with requests:

* No need for custom headers and query string management, it’s already written by library developers. 
With bravado you can have default headers for each request as well as per request custom headers.
* Methods/functions are generated and sound more domain-specific (though, it depends on how accurate was 
naming of operationIds).
* The only endpoint you should worry about is where the description doc is hosted, or, if using the local file, 
the `host` attribute.

Don’t forget, all magic comes with a price. Client generators are not perfect for everyone:

* Autogeneration is useless for constantly changing APIs. Though, it’s considered a bad practice, 
because real customers also use client generators and each breaking change is a pain for them.
* Sometimes you want to make invalid requests. In some cases, you can simply turn off request validation, 
but usually making real fuzzy tests is easier with general-purpose HTTP libraries.
* Not your code. There could be bugs. Be careful when selecting a library, it’s better to be open source with 
fresh contributions. Also, pay attention to supported specifications: bravado does not support OpenAPI 3.0 =(

The world of API related tools and libraries is enormous. Some people prefer GUI-driven tools like Postman or 
TestProject, others prefer to code. Next time you’ll be writing automation, don’t feel restricted to common generic 
libraries and consider different alternatives. 


