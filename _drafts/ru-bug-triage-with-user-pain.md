---
title: Сортировка дефектов по боли (перевод)
ref: dr01
lang: ru
---
Перевод статьи [Improving Bug Triage with User Pain](http://www.lostgarden.com/2008/05/improving-bug-triage-with-user-pain.html)<sup>en</sup> от Daniel Cook.

Не являюсь хорошим переводчиком, поэтому заранее прошу прощения. Но так как я не видела нигде перевода на русский, то может мой, пусть и дурацкий, перевод кому-то пригодится.

## ~*~

The traditional bug triage process is miserably inefficient. Over my decade in this industry, I’ve spent months of my life sitting in windowless offices manually reviewing (and re-reviewing) thousands of bugs. Often times, there are three or four folks on the triage team, typically the most skilled people on the team, sitting about and bickering for hours over the finer points of obscure bugs. Politics, boredom and arbitrary decisions are unfortunately common. The result is wasted time and poorly managed bugs.

So we came up with a better way.

User Pain is a technique I’ve been using for many releases across multiple teams. It involves sorting bugs on a single unified scale called User Pain that takes into account common bug ranking criteria. I’ve found that it can reduce the cost of triage, help teams ship on time and greatly clarify which bugs you should be fixing right now. This essay describes how User Pain works and some best practices for implementing it on your team.


## Problems with current bug triage

Traditional bug triaging is a time consuming and tedious process. Bugs come into a bug database with little prioritization, the team leads sort and rate each problem and then assign them to the appropriate members of the team. This process tends to run into several issues:

* *Lack of shared criteria:* Different people often value different aspects of a bug, which leads to unhealthy disagreement. A designer might think a usability issue is a critical fix, while a programmer might be concerned about a crash. With no common criteria, it is hard to build consensus quickly.
* *Wasted time:* Often the highest skilled team members are required to triage bugs. They spend hundreds of hours poring over mundane issues again and again. This is time that could be better spent improving the product.
* *Bottlenecks:* Bugs are often required to go through a review process so that precious developer time isn’t spent on bugs that would have otherwise been punted. The loop from the submitter to the triage team to the developer can cause delays for critical bugs.
* *Big undifferentiated bins of bugs:* Since the incoming rate of bugs is often higher than the fix rate, large piles of bugs will accumulate for each developer. If a developer has 50 bugs on their plate, they will fix them in a semi-random order or rely on micromanagement by the triage team. The first tactic means critical bugs are sometimes left to be fixed until the end. The second means more time is wasted on reviewing bugs.
* *Triage burn out:* After reviewing thousands of bugs, many triage teams stop caring or become fixated on a few bugs at the cost of reviewing others. The result is that some bugs are poorly triaged and the quality of bug ranking in the database is low.

These are the problems we want to solve with User Pain.

## The basic system
User Pain is yet another technique inspirted by the world of Lean Manufacturing, the ancient mother of so many Agile practices. The technique was original developed in the 80’s as a method of efficiently classifying product defects on manufacturing lines. While some of the ideas are new to software development, the core concepts have been tested in intense product development situations for decades.

At with many agile techniques, User Pain isn’t all the complicated.

1. Rank each bug on several criteria
2. Combine those criteria into a single score called User Pain
3. Sort all bugs by User Pain into a public list
4. Start fixing the most painful bugs at the top of the list.

There is a distinct philosophy at work here. First, empower bug submitters to easily create well formed, well classified bugs. Next, give the team the tools and information necessary to make smart decisions about what to work on first. Finally, encourage practices that make it easy to put quality first. Instead of relying on expert managers, you rely on a well informed, empowered team. As a result, the User Pain system removes most of the need for a triage middleman.

Let’s dig into each step and explore the devil in the details.

## Step 1: Rank each bug on several criteria
Bug submitters use a simplified bug submission page that clearly lists three factors: Type, Likelihood and Priority. Each factor has multiple values, listed in order of impact. At submission time, the bug submitter rates the bug.

### Three bug rating factors
Here are the three factors that I’ve been using.

* *Type:* What type of bug is this? For example is it a crashing issue, a problem with localization or a matter of visual polish?
* *Likelihood:* How likely are users to experience the bug? For example, does everyone run into the issue or do only a few users run into it?
* *Priority:* Of the people who experience the bug, how badly does it affect their experience with the product?

These particular factors have been battle tested for many a release and were selected for the following reasons.

* *Good coverage:* These cover the range of concerns expressed by most stakeholders. Type includes business priorities while Likelihood and Priority help classify user impact.
* *No overlap (aka orthogonal):* A bug can be rated on one factor without affecting how you would rate the other factors. This allows you to rate each factor in isolation and greatly improves the objectivity of the results.
* *Small number:* There are few enough of them that they don’t overload the bug submitter. It is easy to add more factors for various edge cases, but typically this results in a cluttered and confusing bug submission form.

### Use anchored scales
Now that we have our factors, each one needs a rating scale. At this point, we do something slightly tricky. Each point on the three scales is anchored to an objective description. Here are the anchored scales I prefer:

*Type* (What type of bug is this?)

* 7: Crash: Bug causes crash or data loss. Asserts in the Debug release.
* 6: Major usability: Impairs usability in key scenarios.
* 5: Minor usability: Impairs usability in secondary scenarios.
* 4: Balancing: Enables degenerate usage strategies that harm the experience.
* 3: Visual and Sound Polish: Aesthetic issues
* 2: Localization:
* 1: Documentation: A documentation issue

*Priority* (How will those affected feel about the bug?)

* 5: Blocking further progress on the daily build.
* 4: A User would return the product. Cannot RTM. The Team would hold the release for this bug.
* 3: A User would likely not purchase the product. Will show up in review. Clearly a noticeable issue.
* 2: A Pain – users won’t like this once they notice it. A moderate number of users won’t buy.
* 1: Nuisance – not a big deal but noticeable. Extremely unlikely to affect sales.

*Likelihood* (Who will be affected by this bug)

* 5: Will affect all users.
* 4: Will affect most users.
* 3: Will affect average number of users.
* 2: Will only affect a few users.
* 1: Will affect almost no one.
An anchored scale describes each point on the scale with specific, objective criteria. As long as the item being rated meets the criteria, you know what value it should be assigned. An anchored scale is preferred over a relative scale (ex: Please rate this problem from 1 to 10) since there is less subjective judgment involved in assigning the value.

### Display the anchored scales prominently on the UI where bugs are entered
Anchored scales are only useful if the team can see the descriptions.

On one team, we only displayed values 1 to 5 in a drop down list and asked submitters to remember what each value meant. This wasn’t very effective. People treated each factor as a relative scale and would rate items by ‘feel’ initially instead of referring to the definitions of each value. The end result was that bug ratings were heavily influenced by personal preference.

Instead, build a bug submission UI that lets the submitter read the descriptions as they rate the bug. Radio buttons work wonderfully since you can place all the descriptions right in front of the user. A drop down that contains the descriptions is also feasible.

This may seems like a minor issue, but people are usually in a hurry. If you don’t make the rating process painless, they’ll happily toss random data into your bug database. Improving the clarity of your bug submission UI is the single cheapest thing you can do to improve the quality of your bugs.

### Who enters bugs
This system is intended to be used by members of the development team. Artists, testers, developers, designers, project managers and producers all should be able to understand the criteria and enter well rated bugs. They'll need an understanding of the core scenarios and the target user. The better that you educate the team on what you are doing and who you are doing it for, the better your bugs will be.

This system does not work well for bug submissions by external users. They don’t understand the terminology and tend to create bugs that are poorly formed. A good solution is for a tester to reenter the user bugs with the proper ratings and format. It is a form of triage, but is a relatively minor cost in the grand scheme of things.

### Benefits
Using anchored scaled for rating bugs upon submission has the following benefits.

* *Less reliance on personal opinion:* A tester who has some domain knowledge can quickly classify the bug into one of the buckets without relying overly much on their personal opinion. The result is that even when multiple people independently rate the same bug, the final user pain tends to cluster very tightly around the same values.
* *Harder to game the system:* Anchored scales also make it harder to simply ‘bump the pain’ up for a bug that has become a hot topic. Due to the clarity of the rating categories, poorly rated bugs are usually flagged by the next person who looks at them.
* *Push triage to the submitter:* When you can trust the ratings set by bug submitters, you can eliminate a large portion of the triage process. Provided that your submitters have basic domain expertise, 80-90% of the values that they set during the initial submission stay the same throughout the life of the bug. This means that there is less need for reviews to reset random values.

## Step 2: Combine those criteria into a single score called user pain
Once a bug is ranked on all three factors, you multiply the numbers together to get the User Pain score. User Pain is a single value that can be used to compare widely divergent bugs. User pain deals with the gray area in which most bugs live.

* *Obvious fixes:* A bug that the users hate, blocks major user scenarios and affects everyone causes a big hit to perceived product quality. So it receives a very high pain score.
* *Hard calls:* A bug that occurs all the time, despite the fact that it blocks only minor scenarios, still receives a moderately high score.
* *Tricky punts:* A crash that is never seen by anyone receives a low score.

The basic equation for calculating User Pain is as follows:

```text
User Pain = Type * Likelihood * Priority / Max Possible Score
```

User pain is auto calculated when the bug is entered and whenever the bug changes. After you calculate user pain for a set of bugs, you’ll find that you have a smooth spectrum of bugs ranked from 1 to 100% Pain.

### Benefits

* *One value for comparing different bugs:* Instead of forcing users to juggle multiple different criteria when comparing bugs, they only need to look at one. This means quicker judgments and easier sorting.
* *Fewer big bug buckets:* No longer do you need to deal with huge swathes of undifferentiated bugs. Instead of dealing with 300 priority 2 issues, you typically will see much more manageable clumps of 3 to 5 bugs with the same pain rating. Bug Maturity, as described in the Appendix also helps spread out the bugs.

## Step 3: Sort all bugs by User Pain into a public list
Once you have your list of bugs complete with user pain, you need to display them to your team in an easy to understand manner. I’ve dabbled with custom queries inside bug tracking tools, but my favorite technique is to create the world’s simplest bug dashboard.

### The Pain List
The Pain List is a webpage that lists all the active bugs in order of User Pain. You put the highest pain bugs at the top of the list and you make each bug a hyper link that takes you to the bug details in your bug database. Be sure to auto reload the list every 10 seconds or so the data is fresh and reliable.

![Пример болелиста]({{ site.url }}/assets/images/pain_list.png)

The Pain List becomes your central dashboard for daily bug management. I’ve gone so far as to make it the homepage on my web browser.

### Quality bars
The team can use the Pain List to set easy-to-understand quality bars as exit criteria for your milestones. For example, they can say “In order to release, we want no bugs greater than 30 pain.” At the 30 pain threshold on the Pain List, you draw a line. Anything above the line needs to be fixed. Anything below the line you can ship with.

Quality bars can be more meaningful than traditional bug counts since you are implicitly taking into account the final user experience. Meeting this bar means that you’ve fixed all crashing and unpleasant bugs and the only issues that are left are minor cosmetic ones that are rarely seen by users.

Since you have a finely incremented spectrum of bugs, you can also precisely adjust quality bars based on your place in the release cycle. You could set a high pain threshold if you are dealing with new features. You can tighten the quality bar further for subsequent releases.

### Benefits
* *One view:* One view shared by everyone, including both testers and developers. You don’t have to worry about juggling divergent database queries.
* *Simple to understand for all parties involved.* There are no specialized tools or incomprehensible graphs. Even management can know where you are at just by glancing at the list.
* *Clear understanding of status:* If there are bugs above the quality bar, you need to start fixing bugs.

## Step 4: Start fixing the most painful bugs at the top of the list
Now that we have the Pain List, we can finally put it to use. Developers check the Pain List daily and fix the highest pain bugs on the list. If there are no bugs left above the current quality bar, they work on feature work. This basic heuristic is a surprisingly efficient method for managing quality.

### Assigning bugs
All bugs are assigned to Active upon submission, not a particular developer. When a developer sees a high pain bug that they want to work on, they assign it to themselves. The bug then goes through the standard process of being fixed, tested, and closed by the submitter. In general, developers should have no more than a half dozen bugs assigned at once. They pop items off the list, fix them and go back for more. Hoarding is highly discouraged. So is assigning bugs based on feature area.

### Fixing bugs before feature work
All bugs above the quality bar should be fixed before new feature work is started. If you follow this practice, you should exit each sprint with no more high pain bugs than you entered the sprint. Bug debt doesn’t accumulate.

This practice helps you build quality in as you develop. When this practice is paired with solid automated tests, you enter into a whole new world of high quality development.

### My bugs
At the top of the Pain List is a section that lists the current user’s assigned bugs. This both helps devs treat the Pain List as their entry into the bug database and it reminds them that they should finish the items on their plate before taking on new work. Since this list is short, it rarely interferes with browsing the Pain List.

### Benefits

* *Developers always know what to fix:* All they need to do is look at the top of the list and there is almost always a bug waiting for them to grab. As a result, developers never need to juggle multiple criteria in their head when deciding what to work on next. Nor do they have to wait on leads or managers to assign them bugs.
* *Promotes shared code ownership:* The rule ‘fix from the top’ rarely correspond with ‘fix the code that I developed’. Short term, this is less efficient since developers may need to ask questions of the original developer about an area of the code. Long term, the broad knowledge of the code base that comes from fixing bugs outside area of expertise results in higher overall productivity and team flexibility.
* *Bugs that prevent you from shipping don't accumulate:* The benefits of fixing bugs before features are numerous. The pain of shipping is greatly reduced. Testing is more effective since they don’t need to constantly juggle workarounds to problems that won’t be fixed for months. Finally, the team feels better because they know they are always building a high quality product.

## Pitfalls
There are a few pitfalls that emerge when you first try to implement a User Pain system.

### Training the team
There are likely people on your team that have been dealing with bugs for decades. Changing the bug tracking system will require retraining before you see positive results.

In my experience, new teams initially rank 80% of the bugs incorrectly because they A) do not use the rating scale or B) do not understand the target user. To fix this issue, keep making the anchored scales highly visible and keep promoting the major scenarios and target user. After people get the chance to enter a few dozen bugs, their pain ratings will become far more reliable.

### The temptation to assign ‘cost’
You’ll notice that there is no place for ‘cost’ or technical risk of fixing a bug anywhere in the pain score. This is one factor that most developers immediately request. Despite the temptation, I recommend leaving it out.

* *It requires extra effort:* 8 times out of 10 the developer actually needs to dig into the code to figure out what is causing the bug before they know how much it will take to fix. If you require ‘cost’ to be figured into the User Pain calculation, you bog down the entire system.
* *99% of the time it doesn’t matter.* The cost of fixing bugs tends to fall on an exponential distribution. Many bugs are one or two line fixes. Others rarely take more than a couple of days. Only a very few are truly killer bugs. Flag the exceptions and use a generic bug velocity to track the rest and your results will be just as predictable as if you had costed each and every bug.

### The temptation to automate exceptions
The User Pain system is about automating triage. There is a temptation to attempt to automate everything. What about the 1% of the bugs that have the potential to push your release into the next century? When you do stumble upon a bug that will take more than a week to fix, flag it as a ‘killer’ bug. Killer bugs show up in red on the Pain List and an email is sent to the team.

It is now the responsibility of the team leaders to find a solution. They can design around it, postpone it, or even fix it. Now that they’ve been freed of the burden of triage, they have the time to attack the hard problems with great vigor.

The pain score helps keep killer bugs in perspective so that panic is kept to a minimum. There will be Killer issues that are very low pain. It probably isn’t worth delaying the product to fix these. On the other hand, a Killer issue that has high pain is likely to have a serious impact on schedule and should be addressed immediately.

There is a small lesson here. Never build a system, especially one involving people, that aims to handle every exception. You'll destroy what value the process adds by building in all the edge cases. Instead, allow people to raise an alarm so that smart minds can deal with the exception in a timely fashion.

## Conclusion
User Pain remains simple despite all the detail I’ve tossed your way. The team submits and ranks bugs. The system calculates user pain and pumps out a fresh list of prioritized bugs for everyone to see. The team fixes the bugs from the top of the list. Those are the essentials.

Teams thrive under this bug process. There is less thrashing and ambiguity. There is a lot less need for micromanaging every single little bug (and every single developer). With User Pain, the responsibility for creating a quality product is placed clearly in the hands of the team. They triage the bugs. They fix the most important ones early. The process exists to give them all the tools they need to make the right decisions. Again, it is about empowering people, not managing them.

User Pain doesn’t work for every team. Nor does it completely eliminate triaging. Anyone who thinks process is a panacea hasn’t worked in this industry very long. However, with your heart in the right place, User Pain is a substantial improvement over sitting in a room and manually reviewing hundreds of bugs. It makes the team more efficient, helps people make better decisions and focuses the team on building quality into the product.

## Appendixes

### Bug Maturity
Setting quality bar is great for fixing high pain bugs. However, over time you will build up hundreds of older low pain bugs. Since you are triaging less often, the quality of such bugs can be quite low.

You can alleviate this issue is to add a Bug Maturity factor to the pain score. For every day that passes once a bug is entered, you increment its user pain by .2 points. Over time, old bugs slowly rise to the top of the pain list. You can adjust the rate of bug maturation to match the needs of your particular project.

This has two effects

* *Old bugs are slowly removed from the system:* Either you decide to never fix them or you fix them.
* *Small bugs are fixed slowly:* Instead of indefinitely leaving small bugs in your product, you end up fixing them in order to meet your quality bars. This helps prevent the accumulation of code cruft.

### Tracking Charts

A basic line chart that tracks the number of bugs above your various quality bars works well for tracking bugs. You can compare this to your total bug count as a reference. The ideal trend is that your high priority bugs drop quickly. Warning signs include the following:

* *Focusing too much on feature work:* The bug count across the board keeps rising.
* *Poorly directed bug fixing:* The overall bug count is dropping, but the high pain bugs stays relatively constant.

Other metrics of interest include:

* *Total Pain:* This represents the accumulated impact on the user of all the bugs in the system. Some teams use this as an additional gate to determine if the product should be released or not. It is another way of ensuring that the team doesn't ship with hundreds of small issues that end up causing the user substantial grief. This value is far more meaningful than bug count, but serves a similar purpose.
* *Average Pain:* You can get a sense of the general instability of your product simply by looking at the Average Pain across all bugs. A high average pain, especially one near your quality bar, means that you have a lot of work left to do.
