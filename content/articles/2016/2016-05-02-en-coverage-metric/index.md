---
Title: "Coverage metrics"
Date: 2016-05-02
Tags: thoughts
categories: [it]
---

There are two strange metrics on the project where I work: how much is tested and how much works. Every time I should update these two numbers my head explodes. I don't like them at all.

## What means "how much is tested"?
Traditionally we are writing a percentage of completed checks out of all checks in the checklist. I don't like this tradition, because checks are different. Here you should just assert error's text message, and there you should produce this error under some conditions.

I see this solution. Every check should have corresponding number like a story point. Let's call it a test point. To check text there is 1 tp, and to reproduce an error --- 3 tp. That way the whole checklist costs 4 tp. When we are going through the checklist, a tester should write how much is tested for every check. For example, text is asserted --- 1 pt. But reproducing is done only for several scenarios, so only 2 tp. In total, we completed 3 out of 4 test points.

## What means "how much works"?
Based on what are other testers are doing, it is a number of "green" (or passed) checks out of all checks.

Consider this situation: test some kind of import. Test session is started, and voila, there no "Import" button. That's a blocker and no more checks could be done. What we are writing for "how much works"? Zero. A developer fixes the button. Checks are flying, everything is perfect, we are writing 100% (a miracle).

Here is a question: is it correct that we put zero after the first session? After all, it was only a button, everything else was working already. I think it's correct. But we should rename this metric, because it shows not how much *works*, but how much is *available* to a user and to what extent.

## And what is in result?
Checklists are measured in test points, availability metric is renamed. Now watch carefully. We are throwing away percentages. After all, all checklists are different. Why should we use percentages, when they can't show reality. 20% of a small task with 10 tp --- not bad, 80% of a task with 1000 tp --- can ruin a release. And strictly speaking this method is using not ratio, but interval scale. You [can't multiply and divide](https://en.wikipedia.org/wiki/Level_of_measurement) in this scale, therefore, can't calculate percentage.

## Guru talks

Michael Bolton writes a lot about choosing right scales and using them properly. Recently there was [yet another article](http://www.developsense.com/blog/2016/04/is-there-a-simple-coverage-metric/). His positions is that in testing even interval scale is too much, nominal and ordinal are more correct. There is an excellent example in that article, so I just leave it here:

* :white_circle: Level 0: we know nothing at all about this area of the product.
* :no_mouth: Level 1: we have done a very cursory evaluation of this area. Smoke- or sanity-level; we've visited this feature and had a brief look at it, but we don't really know very much about it; we haven't probed it in any real depth.
* :neutral_face: Level 2: we've had a reasonable look at this area, although we haven't gone all the way deep. We've examined the common, the core, the critical, the happy paths, the handling of everyday errors or exceptions. We've pretty familiar with this area. We've done the kind of testing that would expose some significant bugs, if they were there.
* :sunglasses: Level 3: we've really kicked this area harshly and hard. We've looked at unusual and complex conditions or states. We've probed deeply for subtle or hidden bugs. We've exposed the product to the extreme, the exceptional, the rare, the improbable. We've looked for bugs that are deep in the corners or hidden in the dark. If there were a serious bug, we're pretty sure we would have found it by now.
