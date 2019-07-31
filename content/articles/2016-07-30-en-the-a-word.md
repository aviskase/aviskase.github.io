Title: Thoughts on "The 'A' Word"

Alan Page is known as one of the authors of "How We Test Software at Microsoft". But there is another good book and it's called "The 'A' Word". You can buy it on [LeanPub](https://leanpub.com/TheAWord).

The book is about automation in testing, but not how _to do_ it --- it's about how _to think_ about it. It's short, just 58 pages, but very dense with ideas and Alan's opinions.

As I am not qualified to give an opinion on automation topics (because I don't have much experience with it), I've just gathered some notes for future referencing. Sections are divided by chapters.

---

> Sometimes, testers use programming skills to help their testing. Sometimes, that code automates some application functionality. That's it.


### Testing: Failing to Succeed
There is a very famous concept called "Orders of Ignorance" introduced by Phillip Glen Armour ([more here](https://www.researchgate.net/publication/27293624_The_five_orders_of_ignorance)). Chapter's idea is that mostly tests are done on 0OI level, but we should never forget about 2OI test. 0OI is a lack of ignorance (I know) and 2OI is a lack of awareness (I don't know what I don't know).

> 0OI tests are _knowledge-proving_ tests, while 2OI tests are _knowledge-acquiring_ tests.

### The Robots are Taking Over
> Humans fail when they don't use automation to solve problems impossible or impractical for manual efforts.


> Automation fails when it tries to do or verify something that's more suited for a human evaluation.

### To Automate ...?
> _Good_ testers test first --- or at the very least they think of tests first. 

> _Great_ testers first think about how they're going to approach a testing problem, then figure out what's suitable for automation, and what's not suitable. 


> You should automate 100% of the tests that _should be_ automated

Alan's heuristic when to automate: "I'm Bored"

### The Coding Tester
Summary:

* the role of a coder-tester _is not_ to automate everything
* testers _do not_ need to have a computer science
* testers _do not_ need to be able to program
* programming knowledge _does not_ destroy "a proper tester angle"
* background similar to customer's _does not_ make you a customer

### GUI Shmooey
> For 95% of all software applications, directly automating the GUI is a waste of time. 

> For the record, I typed 99% above first, then chickened out.

### Design for GUI Automation
Alan's main points for disliking GUI automation:

* It's (typically) fragile --- tests tend to break / stop working / work unsuccessfully often
* It rarely lasts through multiple versions of a project (another aspect of fragility)
* It's freakin' hard to automate UI (and keep track of state, verify, etc.)
* Available tools are weak to moderate (this is arguable, depending on what you want to do with the tools --- I'm particularly pleased, for example, with what good testers are able to do with selenium and web driver).

> I love GUI automation that can automatically explore variations of a GUI based task flow.

> I like GUI automation is in stress or performance issues.

### It's (probably) a Design Problem

* Record & Playback automation is a non-starter
* Basic verification that would be hit by anyone walking through the basics of the application isn't worth automation
* Tests that do exactly the same thing every time are not valuable
* Always think forward
* Plan for failure and ensure that all test failures tell you exactly what is wrong
* Tests should be reliable
* There is always a better alternative to Sleep statements
* UI is fragile, its testability should designed

### In the Middle
Alan's brainstorming technique: first spend a reasonable amount of time focusing on the extremes --- because often, some great ideas for "the middle" comes out of that brainstorming. 

### Test Design for Automation
> The first step --- and most important --- is to think how you're going to test.

> From that initial test design effort, you can deduce what aspects of testing could be accomplished more efficiently with automation (and without).

### Orchestrating Test Automation
> Designing good tests is one of the hardest tasks in software development.

### LOL --- UR AUTOMASHUN SUCKZ!
Your tests don't suck:

* when you treat their code like a production code
    * core reviews
    * static analysis
    * running with the debugger to ensure they are doing what you think they are
    * trust: if a test fails, it's a product bug, not a test bug
* when they execute automatically
* when failures are handled automatically
    * bugs are entered automatically --- including logs, call stacks, screen shots, trace information, and other relevant info
    * when bug is fixed, it's checked automatically
    * generation of "Test Result Report"

### Musings on Test Design
> Some tests can only be run via some sort of test automation.

> Some tests can only be done via human interaction.

> You can't effectively think about automated testing separately from human testing.

> In my world, there are no such things as automated testing, exploratory testing, manual testing, etc.

> There is only testing

### Beyond Regression Tests & Testing with Code
> Useful tests are tests that provide new information. 

> An automation strategy that only performs regression testing is short-sighted and incomplete.

How to make test useful:

* model-based testing
* introducing some randomness
* data driven testing
* scaled fault injection 
* fuzzing

### More on Test Design
> Test Design ideas are _endless._


> To be a _good_ test designer (and tester), you need a lot of testing ideas, and you need to know how and when to apply them.
