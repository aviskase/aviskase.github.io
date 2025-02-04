---
title: "Weekly hmms: Fowler, collaborations, HTML, and CTS"
date: 2019-11-23T02:45:30.579833
categories: [it, kaleidoscope]
og_image: og_wh_2.png
---

New week, new hmms!

## Martin Fowler and exploratory testing

_All_ testers' slack groups, forums, and blogs erupted this week with the tidings of joy: [Martin Fowler wrote a post about exploratory testing](https://martinfowler.com/bliki/ExploratoryTesting.html). Of course, it seems a bit _late_ and _cursory,_ but at least now we have _a very respected source_ to point to. 

## Collaborations

### Mob programming

Finally found time to read a ["Mob Programming Guidebook" by Maaret Pyhäjärvi](https://mobprogrammingguidebook.xyz/). I'm not entirely sure about applying it at the moment, but it looks like an interesting method for knowledge sharing facilitation.

And contributions style roles can be reused as hats in other activities:

* driver (intelligent input device)
* sponsor (supporting others from a unique position)
* nose (noticing things about the code)
* navigator (translating ideas into code)
* researcher (having better information available)
* automationist (recognizing repetition)
* conductor (enhancing others contributions)
* mobber (always contributing in different  ways)
* rear admiral (helping designated navigator do better and learn)
* archivist (improving team visibility)

### Tips for code review

Google Testing blog is still alive and has posted a nice [short guide about being a good code reviewer](https://testing.googleblog.com/2019/11/code-health-respectful-reviews-useful.html). The best thing is that there are not only tips for reviewers but also _for authors._ Likewise, they could and should be applied for issue reports and other communications.

## Validation for email inputs

Standards are weird. We had a tiny funny problem this week with an OpenAPI spec and a `format: email.` The context:

* SwaggerUI generates `input` fields, and with this format it will have `type=email`.
* When I don't care about cross-browser stuff, I use Chrome.
* Our middleware seems to validate email formats, somewhere very deep in dependencies.
* We also have a custom validation.

First, I checked a request with a garbage email. It failed on the middleware layer. Then I checked an email with non-ASCII characters, but our validation failed. That meant that validation in middleware was passing; therefore, its validation checks were better than ours. 

The dev who worked on fixing the bug noticed an interesting behavior. If you use Firefox to open SwaggerUI, it will add a red highlighting for an email input field when a value contains non-ASCII characters. According to the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email), this is a known problem due to [HTML5 issue](https://github.com/whatwg/html/issues/4562). The specification proposes using a simple regex for validation! 

Chrome does not complain about internationalized values. And it means that Firefox implemented HTML5 spec _too well,_ introducing a confusing behavior. Oops.

## Carpal tunnel syndrome 

I wasn't diagnosed with CTS (yet), but my posture at home is awful, so my right hand _hurts._ I don't have a proper desk and usually I sit with a laptop at a _round table._ Thus, there is not enough room to position a "mouse" hand.

A year ago I bought a cheap [Anker vertical mouse](https://www.amazon.ca/Anker-Wireless-Vertical-Ergonomic-Optical/dp/B00FGI2QVC). It's great, even with my shitty habits I have had no pain. But it's wired, and soon I'll need a wireless one. Logitech is always my first choice in this case because it doesn't drain batteries too fast. Unfortunately, their only vertical mouse is unreasonably expensive, so I've decided to experiment with their [M570 trackball](https://www.amazon.ca/Logitech-910-001799-M570-Wireless-Trackball/dp/B0043T7FXE/). 

It's cool that you don't need to move your hand at all, but _the pain has returned:_ it looks like vertical mouse works better for small spaces. For a trackball, you should be able to lay down your hand somewhere fully. Though, the more expensive trackball model can be vertically adjusted. Anyway, I'll get a real own desk soon, will see how it goes. 

