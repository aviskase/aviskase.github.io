---
Title: >-
  Weekly hmms: \_\_init\_\_
slug: "weekly-hmms-__init__"
Date: 2019-11-11T03:40:16.585286
categories: [it]
og_image: og_wh_0.png
---


## \_\_init\_\_

This post initializes a series of weekly ponderings, interesting links, and other _hmms._ Think of it as typical a "Five for Friday," but without number constraint and more emphasis on effects on my thought process. These posts should come out on Fridays, but because _I forgot to commit,_ this one is late.

Oh, and if you have no idea what `__init__` is, that's [from Python](https://docs.python.org/3/reference/datamodel.html#object.__init__).

## "Write the Docs" podcast: episode 25

I've just started plunging in and out tech writers' media, and so far it keeps amusing me. [WTD #25](https://podcast.writethedocs.org/2019/10/20/episode-25-how-devs-use-api-documentation-andrew-head/) is interesting for two things.

First, this episode covers research on how developers use API documentation. Unlike predominant web services based papers, this research focuses on C++. One discovery was that developers prefer checking header files (aka interface definitions) to implementation or documentation.

Second, I noticed again that we, testers, and API tech writers have a common identity crisis: given enough time, developers can do our work. One guy from the podcast sounded relieved when he heard that not all the docs and comments in Google are written by devs. Maybe Alan and Brent should pitch modern testing principles to tech writers too?

## Read the damn code

This week testing slack group had an almost holy war about testers looking at code. The consensus seemed to be "access to code is awesome," nevertheless, there were other opinions:

> You should have a strong bias seeing the code. It will be more difficult to search for the unknowns.


Oh my. I don't do it as often as I should, but _I love checking commits:_

* Skimming through commit messages for the current build.
* Checking what and how was touched for implemented tasks.
* Reading commits associated with bug fixes.

And every time I uncover some unknowns. Just very recent examples:

* Caught that the task for implementing API _blah-blah_ also has commits for API _meh-meh._ Not only I wouldn't know about these changes without the Git God, but also those were scheduled with a different design for later.
* Identified code duplication and asked the dev to fix the bug in the remaining dups or refactor the code (hehe, sorry, Eric).
* Suspected that the bug fix was incomplete, asked dev, he confirmed and refixed. Not spending time on build&install&test is priceless.

So, dear testers, **read the damn code.** Stop behaving like special snowflakes whose mind will be forever damaged if you'll learn to code a bit. I learned Pascal at school. My father taught himself on paper using journal articles. That's not rocket science. The way modern society goes, coding is close to become a part of common literacy. No one asks for enterprise-levels skill, but as long as your system isn't written in [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck), even basics should be fine. 
