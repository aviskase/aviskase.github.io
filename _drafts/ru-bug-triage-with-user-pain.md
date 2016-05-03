---
title: Сортировка дефектов по боли
ref: dr01
lang: ru
translation: true
---
Перевод статьи [Improving Bug Triage with User Pain](http://www.lostgarden.com/2008/05/improving-bug-triage-with-user-pain.html)<span class="tag tag-lang">en</span> от Daniel Cook.

Не являюсь хорошим переводчиком, поэтому заранее прошу прощения. Но так как я не видела нигде перевода на русский, то может мой, пусть и дурацкий, перевод кому-то пригодится.

---

Традиционный процесс приоритизации дефектов страшно неэффективен. За десять лет работы я потратил месяцы моей жизни сидя в безоконных офисах вручную проверяя (и перепроверяя) тысячи багов. Чаще всего в триажной группе нас было трое или четверо, обычно самые опытные ребята в команде, которые сидели и часами спорили о тонкостях неоднозначных багов. Подтасовка, скука и необоснованные решения были увы распространены. В результате --- потраченное в пустую время и плохо управляемые дефекты.

Поэтому мы придумали кое-что получше.

На протяжении многих релизов и в разных командах я пользуюсь техникой "боль[[Прим.: возможно звучит коряво, но мне нравится простор словоформ этого корня]] пользователя". Она заключается в том, что бы сортировать баги по однозначной унифицированной шкале "боль пользователя", которая учитывает несколько типичных критериев ранжирования дефектов. На мой взгляд эта техника позволяет снизить затраты на приоритизацию, помочь команде выпускаться вовремя и вносит ясность, какие баги нужно фиксить прямо сейчас. Данная статья описывает как работает эта техника и как можно её применить в вашей команде.


## Проблемы с обычной приоритизацией
Traditional bug triaging is a time consuming and tedious process. Bugs come into a bug database with little prioritization, the team leads sort and rate each problem and then assign them to the appropriate members of the team. This process tends to run into several issues:

* *Lack of shared criteria:* Different people often value different aspects of a bug, which leads to unhealthy disagreement. A designer might think a usability issue is a critical fix, while a programmer might be concerned about a crash. With no common criteria, it is hard to build consensus quickly.
* *Потерянное время:* Often the highest skilled team members are required to triage bugs. They spend hundreds of hours poring over mundane issues again and again. This is time that could be better spent improving the product.
* *Bottlenecks:* Bugs are often required to go through a review process so that precious developer time isn’t spent on bugs that would have otherwise been punted. The loop from the submitter to the triage team to the developer can cause delays for critical bugs.
* *Big undifferentiated bins of bugs:* Since the incoming rate of bugs is often higher than the fix rate, large piles of bugs will accumulate for each developer. If a developer has 50 bugs on their plate, they will fix them in a semi-random order or rely on micromanagement by the triage team. The first tactic means critical bugs are sometimes left to be fixed until the end. The second means more time is wasted on reviewing bugs.
* *Triage burn out:* After reviewing thousands of bugs, many triage teams stop caring or become fixated on a few bugs at the cost of reviewing others. The result is that some bugs are poorly triaged and the quality of bug ranking in the database is low.

These are the problems we want to solve with User Pain.

## Суть техники
User Pain is yet another technique inspirted by the world of Lean Manufacturing, the ancient mother of so many Agile practices. The technique was original developed in the 80’s as a method of efficiently classifying product defects on manufacturing lines. While some of the ideas are new to software development, the core concepts have been tested in intense product development situations for decades.

At with many agile techniques, User Pain isn’t all the complicated.

1. Rank each bug on several criteria
2. Combine those criteria into a single score called User Pain
3. Sort all bugs by User Pain into a public list
4. Start fixing the most painful bugs at the top of the list.

There is a distinct philosophy at work here. First, empower bug submitters to easily create well formed, well classified bugs. Next, give the team the tools and information necessary to make smart decisions about what to work on first. Finally, encourage practices that make it easy to put quality first. Instead of relying on expert managers, you rely on a well informed, empowered team. As a result, the User Pain system removes most of the need for a triage middleman.

Let’s dig into each step and explore the devil in the details.

## Шаг 1: оценить каждый баг по нескольким критериям
Bug submitters use a simplified bug submission page that clearly lists three factors: Type, Likelihood and Priority. Each factor has multiple values, listed in order of impact. At submission time, the bug submitter rates the bug.

### Три фактора оценки
Here are the three factors that I’ve been using.

* *Тип:* What type of bug is this? For example is it a crashing issue, a problem with localization or a matter of visual polish?
* *Вероятность:* How likely are users to experience the bug? For example, does everyone run into the issue or do only a few users run into it?
* *Приоритет:* Of the people who experience the bug, how badly does it affect their experience with the product?

These particular factors have been battle tested for many a release and were selected for the following reasons.

* *Хорошее покрытие:* These cover the range of concerns expressed by most stakeholders. Type includes business priorities while Likelihood and Priority help classify user impact.
* *Не перекрываются (aka ортогональные):* A bug can be rated on one factor without affecting how you would rate the other factors. This allows you to rate each factor in isolation and greatly improves the objectivity of the results.
* *Малое число:* There are few enough of them that they don’t overload the bug submitter. It is easy to add more factors for various edge cases, but typically this results in a cluttered and confusing bug submission form.

### Использование фиксированной шкалы
Теперь, когда мы определились с факторами, каждому нужно определить фиксированную шкалу. Каждое очко на шкале соотносится с объективным описанием. Вот шкала, которая нравится мне:

*Тип* (Какого типа этот баг?)

1. Документация: проблемы в документации.
2. Локализация: проблемы с локализацией.
3. Шлифовка визуальной и звуковой состовляющих: эстетические проблемы
4. Регулирование: позволяет выполнять опасные действия, которые вредят взаимодействию с продуктом.
5. Незначительная проблема: мешает прохождению второстепенных сценариев.
6. Значительные проблема: мешает прохождению ключевых сценариев.
7. Сбой: баг вызывает сбой или потерю данных.

*Приоритет* (Как скажется баг на пользователе?)

1. Неприятность --- ничего особенного, но можно заметить. Влияние на продажи маловероятно.
2. Боль --- пользователь будет раздражен. Некоторое количество людей откажется от покупки.
3. Пользователь скорее всего не купит продукт. Будет упомянуто в обзорах. Очень заметная проблема.
4. Пользователь вернёт продукт. Релиз нельзя использовать как финальную версию. Команда отложит релиз из-за этого бага.
5. Блокирует дальнейшие сборки.

*Вероятность* (Кто будет затронут багом?)

1. Почти никто.
2. Только некоторые пользователи.
3. Половина пользователей.
4. Большинство пользователей.
5. Все пользователи.

Фиксированная шкала описывает каждое очко на шкале конкретными, объективными критериями. До тех пор пока все элементы,которые нужно оценить, подходят под один из критериев, вы всегда знаете какое значение нужно выбрать. Фиксированная шкала предпочтительней относительной (напр., оцените проблему от 1 до 10) т.к. она менее субъективна.

### Добавить фиксированную шкалу на видное место туда, где заводят дефекты
Anchored scales are only useful if the team can see the descriptions.

On one team, we only displayed values 1 to 5 in a drop down list and asked submitters to remember what each value meant. This wasn’t very effective. People treated each factor as a relative scale and would rate items by ‘feel’ initially instead of referring to the definitions of each value. The end result was that bug ratings were heavily influenced by personal preference.

Instead, build a bug submission UI that lets the submitter read the descriptions as they rate the bug. Radio buttons work wonderfully since you can place all the descriptions right in front of the user. A drop down that contains the descriptions is also feasible.

This may seems like a minor issue, but people are usually in a hurry. If you don’t make the rating process painless, they’ll happily toss random data into your bug database. Improving the clarity of your bug submission UI is the single cheapest thing you can do to improve the quality of your bugs.

### Кто заводит баги
This system is intended to be used by members of the development team. Artists, testers, developers, designers, project managers and producers all should be able to understand the criteria and enter well rated bugs. They'll need an understanding of the core scenarios and the target user. The better that you educate the team on what you are doing and who you are doing it for, the better your bugs will be.

This system does not work well for bug submissions by external users. They don’t understand the terminology and tend to create bugs that are poorly formed. A good solution is for a tester to reenter the user bugs with the proper ratings and format. It is a form of triage, but is a relatively minor cost in the grand scheme of things.

### Выгоды
Using anchored scaled for rating bugs upon submission has the following benefits.

* *Less reliance on personal opinion:* A tester who has some domain knowledge can quickly classify the bug into one of the buckets without relying overly much on their personal opinion. The result is that even when multiple people independently rate the same bug, the final user pain tends to cluster very tightly around the same values.
* *Harder to game the system:* Anchored scales also make it harder to simply ‘bump the pain’ up for a bug that has become a hot topic. Due to the clarity of the rating categories, poorly rated bugs are usually flagged by the next person who looks at them.
* *Push triage to the submitter:* When you can trust the ratings set by bug submitters, you can eliminate a large portion of the triage process. Provided that your submitters have basic domain expertise, 80-90% of the values that they set during the initial submission stay the same throughout the life of the bug. This means that there is less need for reviews to reset random values.

## Шаг 2: соединить критерии в одну оценку "боль пользователя"
Как только баг оценён по всем трем факторам, нужно перемножить числа что бы получить оценку боли. Боль пользователя --- это одно значение, которое можно использовать для сравнения различных дефектов. Она позволяет выявить такие дефекты как:

* *Очевидный фикс:* баг, который пользователь возненавидит, который блокирует основные сценарии использования и влияет на всех. Поэтому он получит очень высокую оценку боли.
* *Неочевидная проблема:* баг, который возникает постоянно. Несмотря на то, что он блокирует только второстепенные сценарии, оценка боли будет относительно высокой.
* *Заковыристая ошибка:* сбой, который никому не будет заметен, получит малую оценку.

Основная формула вычисления боли пользователя такая:

$$Боль = \frac{Тип \cdot Вероятность \cdot Приоритет}{МаксимальнаяОценка}$$

Боль вычисляется автоматически в момент заведения дефекта и какждый раз, когда он изменяется. После того как вы посчитаете боль для некоторого множества багов, у вас получится однородный диапазон багов с болью от 1 до 100%.

### Выгоды

* *One value for comparing different bugs:* Instead of forcing users to juggle multiple different criteria when comparing bugs, they only need to look at one. This means quicker judgments and easier sorting.
* *Fewer big bug buckets:* No longer do you need to deal with huge swathes of undifferentiated bugs. Instead of dealing with 300 priority 2 issues, you typically will see much more manageable clumps of 3 to 5 bugs with the same pain rating. Bug Maturity, as described in the Appendix also helps spread out the bugs.

## Шаг 3: отсортировать все баги по боли в общедоступном списке
Once you have your list of bugs complete with user pain, you need to display them to your team in an easy to understand manner. I’ve dabbled with custom queries inside bug tracking tools, but my favorite technique is to create the world’s simplest bug dashboard.

### Болелист
The Pain List is a webpage that lists all the active bugs in order of User Pain. You put the highest pain bugs at the top of the list and you make each bug a hyper link that takes you to the bug details in your bug database. Be sure to auto reload the list every 10 seconds or so the data is fresh and reliable.

![Пример болелиста]({{ site.url }}/assets/images/pain_list.png)

The Pain List becomes your central dashboard for daily bug management. I’ve gone so far as to make it the homepage on my web browser.

### Планки качества
The team can use the Pain List to set easy-to-understand quality bars as exit criteria for your milestones. For example, they can say “In order to release, we want no bugs greater than 30 pain.” At the 30 pain threshold on the Pain List, you draw a line. Anything above the line needs to be fixed. Anything below the line you can ship with.

Quality bars can be more meaningful than traditional bug counts since you are implicitly taking into account the final user experience. Meeting this bar means that you’ve fixed all crashing and unpleasant bugs and the only issues that are left are minor cosmetic ones that are rarely seen by users.

Since you have a finely incremented spectrum of bugs, you can also precisely adjust quality bars based on your place in the release cycle. You could set a high pain threshold if you are dealing with new features. You can tighten the quality bar further for subsequent releases.

### Выгоды
* *One view:* One view shared by everyone, including both testers and developers. You don’t have to worry about juggling divergent database queries.
* *Simple to understand for all parties involved.* There are no specialized tools or incomprehensible graphs. Even management can know where you are at just by glancing at the list.
* *Clear understanding of status:* If there are bugs above the quality bar, you need to start fixing bugs.

## Шаг 4: начать фиксить самые болевые баги сверху списка
Now that we have the Pain List, we can finally put it to use. Developers check the Pain List daily and fix the highest pain bugs on the list. If there are no bugs left above the current quality bar, they work on feature work. This basic heuristic is a surprisingly efficient method for managing quality.

### Назначение дефектов на исполнителя
All bugs are assigned to Active upon submission, not a particular developer. When a developer sees a high pain bug that they want to work on, they assign it to themselves. The bug then goes through the standard process of being fixed, tested, and closed by the submitter. In general, developers should have no more than a half dozen bugs assigned at once. They pop items off the list, fix them and go back for more. Hoarding is highly discouraged. So is assigning bugs based on feature area.

### Фикс багов до работы над фичами
All bugs above the quality bar should be fixed before new feature work is started. If you follow this practice, you should exit each sprint with no more high pain bugs than you entered the sprint. Bug debt doesn’t accumulate.

This practice helps you build quality in as you develop. When this practice is paired with solid automated tests, you enter into a whole new world of high quality development.

### Мои баги
At the top of the Pain List is a section that lists the current user’s assigned bugs. This both helps devs treat the Pain List as their entry into the bug database and it reminds them that they should finish the items on their plate before taking on new work. Since this list is short, it rarely interferes with browsing the Pain List.

### Выгоды

* *Developers always know what to fix:* All they need to do is look at the top of the list and there is almost always a bug waiting for them to grab. As a result, developers never need to juggle multiple criteria in their head when deciding what to work on next. Nor do they have to wait on leads or managers to assign them bugs.
* *Promotes shared code ownership:* The rule ‘fix from the top’ rarely correspond with ‘fix the code that I developed’. Short term, this is less efficient since developers may need to ask questions of the original developer about an area of the code. Long term, the broad knowledge of the code base that comes from fixing bugs outside area of expertise results in higher overall productivity and team flexibility.
* *Bugs that prevent you from shipping don't accumulate:* The benefits of fixing bugs before features are numerous. The pain of shipping is greatly reduced. Testing is more effective since they don’t need to constantly juggle workarounds to problems that won’t be fixed for months. Finally, the team feels better because they know they are always building a high quality product.

## Ошибки
Есть несколько ошибок, которые могут возникнуть при первой попытке внедрения техники.

### Обучение команды
There are likely people on your team that have been dealing with bugs for decades. Changing the bug tracking system will require retraining before you see positive results.

In my experience, new teams initially rank 80% of the bugs incorrectly because they A) do not use the rating scale or B) do not understand the target user. To fix this issue, keep making the anchored scales highly visible and keep promoting the major scenarios and target user. After people get the chance to enter a few dozen bugs, their pain ratings will become far more reliable.

### Соблазн приписать "стоимость фикса"
You’ll notice that there is no place for ‘cost’ or technical risk of fixing a bug anywhere in the pain score. This is one factor that most developers immediately request. Despite the temptation, I recommend leaving it out.

* *It requires extra effort:* 8 times out of 10 the developer actually needs to dig into the code to figure out what is causing the bug before they know how much it will take to fix. If you require ‘cost’ to be figured into the User Pain calculation, you bog down the entire system.
* *99% of the time it doesn’t matter.* The cost of fixing bugs tends to fall on an exponential distribution. Many bugs are one or two line fixes. Others rarely take more than a couple of days. Only a very few are truly killer bugs. Flag the exceptions and use a generic bug velocity to track the rest and your results will be just as predictable as if you had costed each and every bug.

### Соблазн автоматизировать исключения
The User Pain system is about automating triage. There is a temptation to attempt to automate everything. What about the 1% of the bugs that have the potential to push your release into the next century? When you do stumble upon a bug that will take more than a week to fix, flag it as a ‘killer’ bug. Killer bugs show up in red on the Pain List and an email is sent to the team.

It is now the responsibility of the team leaders to find a solution. They can design around it, postpone it, or even fix it. Now that they’ve been freed of the burden of triage, they have the time to attack the hard problems with great vigor.

The pain score helps keep killer bugs in perspective so that panic is kept to a minimum. There will be Killer issues that are very low pain. It probably isn’t worth delaying the product to fix these. On the other hand, a Killer issue that has high pain is likely to have a serious impact on schedule and should be addressed immediately.

There is a small lesson here. Never build a system, especially one involving people, that aims to handle every exception. You'll destroy what value the process adds by building in all the edge cases. Instead, allow people to raise an alarm so that smart minds can deal with the exception in a timely fashion.

## Заключение
User Pain remains simple despite all the detail I’ve tossed your way. The team submits and ranks bugs. The system calculates user pain and pumps out a fresh list of prioritized bugs for everyone to see. The team fixes the bugs from the top of the list. Those are the essentials.

Teams thrive under this bug process. There is less thrashing and ambiguity. There is a lot less need for micromanaging every single little bug (and every single developer). With User Pain, the responsibility for creating a quality product is placed clearly in the hands of the team. They triage the bugs. They fix the most important ones early. The process exists to give them all the tools they need to make the right decisions. Again, it is about empowering people, not managing them.

User Pain doesn’t work for every team. Nor does it completely eliminate triaging. Anyone who thinks process is a panacea hasn’t worked in this industry very long. However, with your heart in the right place, User Pain is a substantial improvement over sitting in a room and manually reviewing hundreds of bugs. It makes the team more efficient, helps people make better decisions and focuses the team on building quality into the product.

## Дополнения

### Зрелость бага
Фиксирование планки качества помогает быстрому фиксу "очень болевых" багов. Однако с течением времени скопятся сотни старых багов с малой болью. А так как процесс "насильственной" приоритизации происходит гораздо реже, само качество заведения этих дефектов может быть достаточно низким.

Что бы решить эту проблему достаточно добавить фактор зрелости бага к оценке боли. За каждый день с момента заведения бага надо прибавлять к оценке 0,2 очка. Со временем старые баги медленно подымятся к самому верху болелиста. Конечно же стоит адаптировать скорость с какой баг будет зреть к тому, что требуется на конкретном проекте.

В результате получается что:

* *Старые баги медленно уходят из системы:* вы либо решите их не фиксить вообще или фиксите.
* *Небольшие баги медленно фиксятся:* вместо того, что бы постоянно оставлять небольшие баги в продукте, в конечном итоге вы пофиксите их, что бы достичь планки качества. Тем самым предотвращается накопление технического долга.

### График появления дефектов

![График появления дефектов]({{ site.url }}/assets/images/tracking_chart.png)

Обычный линейный график, на котором изображено количество багов выше различных планк качества, очень подходит для отслеживания ситуации. Можно сравнивать его с графиком всех заведённых багов. Идеальный тренд --- когда количество багов высокого приоритета быстро уменьшается. Тревожными знаками будет:

* *Слишком много внимания разработке новых фич:* количество багов продолжает увеличиваться.
* *Неправильный приоритет в выборе что фиксить:* общее число уменьшается, но количество багов с высокой болью почти неизменно.

Другие интересные метрики:

* *Общая боль:* суммарный эффект всех багов в системе на пользователя. Некоторые команды используют это как дополнительную оценку могут ли они выпускать релиз или нет. Это ещё один из способов удостовериться, что релиз не будет содержать сотню мелких дефектов, которые вызовут у пользователя значительное раздражение. Данная оценка гораздо показательнее чем просто число дефектов, но имеет схожее назначение.
* *Средняя боль:* позволяет на глаз определить общую нестабильность продукта. Высокая средняя боль, особенно вблизи планки качества, означает что осталось ещё очень много работы.
