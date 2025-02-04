---
title: "Weekly hmms: API practices, Yegor Bugaenko, culture"
date: 2019-12-21T19:33:46.298723
categories: [it, kaleidoscope]
og_image: og_wh_6.png
---

## API practices if you hate your customers
A fun [article from ACM Queue magazine](https://queue.acm.org/detail.cfm?ref=rss&id=3375635) about how to alienate
customers from using your API. I like an ["anti-tutorial" form](https://www.aviskase.com/articles/2019/09/02/your-api-is-your-public-image/), 
it is easier to recall bad patterns and behaviors.


> One such form I filled out required me to describe the application I planned to write. <...>
> Sadly, I didn't have a particular application in mind. I was going to explore the API and write a few simple 
> Python-based utilities to automate some daily tasks. I didn't want to explain all that, however, for fear that 
> my answer would not be good enough for whoever was judging my application. 
> In a panic, I simply described my application as "dark purple with white highlights." 
> A few weeks later my application was approved. So far, I haven't been visited by any auditor SWAT teams, 
> but as a precaution my code editor has been themed in dark purple with white highlights ever since.

This particular quote hit hard:

> Nothing says "we don't actually want you to use our API" like making your API documentation invisible 
> to search engines. The "build, run, debug" cycle of decades ago has been replaced by "run, crash, Google, fix."

Once we tried to research our competitors and we couldn't find even screenshots. How the hell 
a potential customer is supposed to evaluate your product if you hide **everything**?


## Yegor Bugaenko on QA vs testing

Yegor Bugaenko presented ["Quality Assurance vs. Testing" on QA Fest 2019](https://www.youtube.com/watch?v=jZitXMQaXvE).

And I am disappointed. 

For those who don't know Yegor, he is famous for controversial [eXtremely Distributed Software Development](https://www.xdsd.org/) 
methodology. One of the ideas is to pay only for closed tasks.

So, I grabbed popcorn and expected blood and gore. Didn't happen, it was dull, except for one or two topics.
The talk started with an obvious difference between QA and testing and moved to explain the importance of 
quantitative metrics to measure tester's productivity. Unfortunately, he suggested the most stupid metric ever: the 
number of bugs logged. I also was annoyed by his notion that testers should not talk to devs much and must log every issue. 
My practice shows that working with dev together and fixing bugs as we go is way more productive and requires less time. 
Perhaps, his ideas works in XDSD, where everyone is expendable, but I hope others won't borrow them into normal agile teams.

## Cultures and sci-fi

Speaking of teams.

Prelude: I'm a fan of space sci-fi series. Not a nerd, but I watched my share:

- Star Trek: TOS (bits), TNG, DS9, Voyager, Enterprise
- LEXX
- Battlestar Galactica (with spin-offs, except Caprica)
- Firefly
- Babylon 5 (and all spin-offs)
- Farscape
- Andromeda
- Stargate SG-1 (in progress)

As you may notice, there is no Expanse, Orville, or new Star Treks (Discovery, Short Trek). We watch only
finished stuff. I hope to avoid spoilers, but it's impossible with the new Star Treks. Also, I doubt I would even
want to watch them (mushroom drives? horrid Klingons??).

This week I stumbled upon a [comparison between TNG and Short Trek](https://www.youtube.com/watch?v=rnlxugk3Qb0). 
How this is related to teams and culture? Well, the basic problem is the same for both series: a crew member with a quirky 
behavior who doesn't fit a team.


TNG solved the problem by trying to help Lieutenant Barclay to overcome his anxiety and integrate into the team. 
While he remained awkward for the rest of the series, some of his quirks were channeled into a productive direction and
helped to save the crew numerous times.

Short Trek's approach was... different. Edward Larkin died and was called an idiot by his _"competent"_ captain. 
Just watch it. The captain wanted to transfer that scientist even _before he made a mistake._ Show defenders say that 
it's just a comedy, but these series are not marketed as a parody show.  It's a canon now. Which means, 
that obnoxious and demeaning conduct of the captain is considered ok in that universe. No one reprimanded her for
causing an ecological disaster, and she never showed any remorse for the "idiot's" death. 

I understand that showrunners are just money hoarders and want to have a comedy because it's profitable. They 
probably never consider how it affects existing canon. 

Still. I wonder, what this _modern_ approach tells about our society? 
