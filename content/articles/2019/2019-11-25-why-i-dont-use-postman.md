Title: Why I Don't Use Postman
Date: 2019-11-25T01:20:58.916485
Tags: API, tools, thoughts
Category: Testing
og_image: og_why-i-dont-use-postman.png

Being an API person, many people would expect me to use Postman. It's the most well-known tool for HTTP-based APIs and it's so ubiquitous that some use it even for SOAP (not the best idea ever).

_I did use Postman._ [My gist with installation scripts for Linux](https://gist.github.com/aviskase/e642248c35e400b56e2489430952369f) was so popular that Postman support team reached me out when it started causing non-obvious issues with updates. I also used this tool for internship courses. Yet I won't do it anymore and let me explain why.

## I'm Not a Tech Writer

Postman isn't just a tool for testing: it's often used for writing documentation. I'm a tester, thus, this use case does not apply to my day-to-day work. Maybe it can be useful for your organization, though I don't approve of the inability to self-host.

## I'm Confused by GUI-Driven Tools

I still have PTSD from SoapUI. It's the best exploratory testing tool for SOAP services, but, damn, scenarios more difficult than request+response are brain busters. Many people don't have problems with GUI-driven stuff:

* JMeter for load testing
* UI git apps
* Point&click tools for web automation

For me, all these are torture devices for anything more involved than two clicks. _It's something psychological,_ because if GUI tool requires tinkering with LEGO-like loop/if steps or  pre/post-scripts, my nerve cells start audibly screeching. I'm not a command line nerd and I use these tools for certain activities, but not for complex automation.

## I Can Code

Here we go to the obvious part: I am comfortable with code. Yeah, shitty smelling code, nevertheless, I find it way more intuitive to write a for loop _purely_ in a programming language than to glue together pieces of JavaScript with GUI-level bits.

My language of choice is Python because it's very easy to scribble down a working script. It also has packages for any API needs imaginable, be it [Requests](https://requests.kennethreitz.org/en/master/), [Bravado](https://github.com/Yelp/bravado), [Zeep](https://python-zeep.readthedocs.io/en/master/), or [Yandex.Tank](https://github.com/yandex/yandex-tank).

## I Use Insomnia

Until recently I still used Postman a bit. I switched to Insomnia for mostly emotional reasons:

* Insomnia is open-source.
* Postman is bloated with features I don't need. 
* There is _too much_ Postman around. They even organize a conference now! I wonder is there a certification somewhere already.

Insomnia is a case where _less is more._ I hope its recent acquisition by a bigger company won't be detrimental, but being open-source we can always fork it. 

Though it's not the only tool I use for exploratory API testing. My general patterns are:

* Rapid data creation or testing simple requests: curl
* Requests with bigger payloads: SwaggerUI or Insomnia
* Chained, looped, or other complex stuff: reusing bravado-based adapters from automation framework

And for actual automation, it's code and code only.

---

Your brain is your brain. Your context is your context. Mine resulted in avoiding GUI-driven tools. Research, try different approaches, and don't simply default to the most popular choice.
