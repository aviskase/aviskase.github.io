---
Title: "Amazing Marvin for task management"
Date: 2019-07-30
Tags: 
- practical
categories: [kaleidoscope]
---

I'm an infrequent blogger, so how weird it is that my last post was about RTM? I was a loyal RTM user for quite a time... Well, I have a new love now. His name is [Marvin](https://www.amazingmarvin.com/). 

Marvin is still young, yet powerful. He has some problems and rough corners, but development couple (yes, just 2 persons!) is the most responsive and creative force I've seen. I'm still learning and tweaking my system there, but I want to describe the first working iteration to be able to improve and compare later.

## Enabled strategies

Strategies are like extensions: add more to have more abilities.

## Essential

Because these are essential, I'll explain their usage later.

- Category Context (big square, also beneath title, show full path)
- Task Notes
- Labels
- Timers
- Backburner (no setup)
- Planning Ahead
- Smart Lists
- Custom Sidebar
- Top Mini List
- Custom Sections
- Dependencies
- End Dates (show end dates below the task)
- Start Dates
- Work Session Scheduler
- Saved Items (Templates)
- Smart List Day Alerts
- Auto-schedule Due Tasks (cutoff = 1 day)
- Staleness Warning (period = 40 days)
- Email to Marvin
- Zapier Integration
- Review Date
- Weekly Review

### Extras

- Eat that Frog (just 2 frog levels) --- nice to have, but I don't use it as intended (I tend to assign a frog to the bad tasks, but I don't do them first)
- Task Reminders (create automatically) --- very important feature, but less powerful than in RTM for now (cannot create multiple reminders). Though, I have a feeling that with proper review system I actually don't need reminders that much now.
- Duration Estimates --- I'm experimenting with having estimates for all tasks, but so far don't feel it increases productivity.
- Time Tracking (show > in title) --- goes hand in hand with duration estimates, feels needed but not essential
- Beat The Clock --- same as time tracking, still experimenting with it
- Project Focus Picker --- just started to use it; at least it works as an "eye  bugger" to push me to work on project
- Suggested Task --- never used it really, but something about it feels good ><
- The Wall --- using it occasionally, would like to have block division by section
- Day Progress Bar --- I don't know why I enabled it 
- Procrastination Count (default) --- important but not essential
- Missing Next Steps Warning --- important, but not very used much at the moment
- Day Note (with archive) --- nice to have, but I'm not very good at keeping a habit to write (as can be guessed by this blog updates frequency)
- Calendar, Calendar Sync, All-Day Items, Top Mini List --- I'll have a whole calendar workflow moved to AM as soon as these will work with Google Calendar and Outlook. Until then, I have to go to calendars.
- Dashboard --- I like it, but not sure that I need it
- Reward Tasks --- awesome feature which I've never used. Dunno why. 

## Planning and scheduling cycle

My PS cycle has three phases:

- Monthly planning
- Weekly planning
- Daily scheduling

Notice difference between planning and scheduling? This is because AM has a bit head-scratching at first, but really powerful distinction between these processes. In short, *planning* is about assigning *start date* and *end date* ("soft deadline") and *scheduling* is about assigning a *do date* ("when should I do this task"). Also, there can be a *due date*, it's not quite clear is it planning or scheduling category. I think both, because I use **Auto-schedule Due Tasks** strategy. For example, if something is due tomorrow, this task will have a do date = today.

### Monthly planning

I have a recurring task *Plan tasks for the next month*, which is setup to run monthly on the 31st day. To complete this task I go to **Planning > Monthly** and plan tasks **only** for the next month while working from *Master List*. I don't want to overplan too much into the future.  What can be changed is maybe I should work from some smart list, but so far I don't have too many tasks in ML.

### Weekly planning

This is a **Weekly Review** strategy with checklist scheduled to be done on Sundays. Checklist is a combination of weekly planning and everyday review stuff.

#### Reformulate task names left in today pool

Done on: Daily view

This is a part from Jedi techniques, which goal is to rename tasks you didn't complete for some reason. That way the next day they will look "fresher" or more inviting to you.

#### Review calendars for 2 weeks ahead: add tasks if needed

Done on: external sites, tasks are added to inbox

- birthdays
- special all day events like holidays
- work meetings

Basically, it's something that is not really actionable, but has a day and duration. This is what I want to do in AM in the future, when calendar sync works better:

- **Smart list** with all calendar events in the next 2 weeks (to use for weekly planning)
- **Top Mini List** strategy showing upcoming birthdays in the next 3 days
- Depending on how AM will show calendar events (probably as tasks which have to be completed, which is a bit unnecessary for me), maybe all of them should be shown in **Top Mini List**

Right now what I use is a **Custom Sidebar** with links to my google and outlook calendars.

#### Reflect on completed week: do I need to do more?

Done on: Archive, tasks are added to inbox

Go to **Archive** and check what was done this week. It's a bit cumbersome, because it shows tasks per month and not per week. In RTM I've used a smart list for that, but AM does not support searching completed tasks (yet).

Other way is to click through daily views, but for me it's too many clicks)

#### Review start dates for backburner tasks (smartlist)

Done one: Master List,  work from smartlist

**Smartlist**: `any start date, on backburner`

I use backburner only for tasks which are **dependent** on others or with **start date** in the future. I try to be very strict with start dates and set them only if it really makes sense, for example: getting a vaccine boost shot in Dec 2028 has a start date in Sept 2028, because I don't want this task to pollute my planning all these years. Another use for start dates is for sub-project, like 3-day long learning session, which is part of a project without start date (because I want to do some preparatory tasks before session starts). 

So, in order to keep backburner in check, I review it once in week. Now that I think about it, maybe I should have an alert about tasks which does not have start date and are not dependent, but are in backburner...? But more on alerts later =)

#### Review all projects: add new tasks if needed (smartlist)

Done on: Master List, work from smartlist

**Smartlist**: Projects

I had to create a smart list to show all projects, because I wanted to see backburner's too.

#### Recall this day: write down everything missed (triggers/ backwards-day-recall)

Done on: **Sidebar**, tasks added to inbox

Two links in Sidebar:

* link to mind map containing triggers
* link to timer set for 20m

Triggers are things which can be used to recall what was forgotten. For example, one of the subtrees in my mindmap contains all types of utilities or all kinds of cleaning which could be done.

Backwards day recall is a technique also used to recall things. You sit down and try to remember today in detail in backwards: from now to the morning.

#### Empty inboxes: paper, GMail, Outlook, Joplin, AM

Categorize everything and clean up all inboxes I can have. First go with paper notes, then emails (gmail + outlook), then note taking application (for now it's Joplin), and finally AM category *Inbox*

If you see something that should be planned for this month, set it right away.

#### Plan tasks for the next week (selecting from this month)

Done on: **Planning > Weekly**, working from *This month* list

Because everything was planned for *this month*, I can just bring relevant tasks to next week.

#### Schedule tasks for Monday by checking next week list

Done on: Daily view for tomorrow, working from *This week* list

### Daily scheduling

Because there is no "Daily review" strategy yet, I have a recurring task for that. It repeats every Wed and Fri, just because I'm still getting accustomed to always do it. When I'm ready, it will be repeated every day except for Sunday, where weekly review is done.

Checklist is a subset of weekly review:

- reformulate
- reflect on Completed Today
- recall this day
- empty inboxes
- schedule tasks for the next day

## Extras

### Categories

Main:

* Inbox
* Work
* Household --- tasks related to house or family
* Hobbies  --- anything related to my hobbies, learning, and reading
* Reputation --- quite new for me, this is for tasks related to my *external image*. Participating in open source projects, buying birthday gifts, writing blog, answering some emails. Sometimes there is no clear distinction between hobbies and this category, so it's fluid.
* Health
* Productivity --- tasks like everyday review or cleaning up overflown inboxes. I suppose calendar sync will go there too.

### Sections

I use **Custom Sections** strategies:

- Morning
- Work --- linked to smartlist which finds all tasks/projects `in #Work`
- Outside --- linked to smartlist which finds all tasks/projects which `has @outside` label
- Evening
- Bonus

Morning and Evening tasks are essentials, while Bonus ones are nice to do. Outside tasks are for stuff where I need to go somewhere, like shopping errands. I'm still not hard set on these categories, except for Work, this one will definitely stay.

### Alerts

I use **Smart List Day Alerts** strategy for finding and fixing potential planning problems.

- New items pulled from backburner --- reminder to check items with `*new`
- Stale --- review items with `*stale`
- To review (waiting or pinged) --- some tasks are ready to review)
- This week unestimated --- add estimation for all tasks, smartlist: `Tasks, no time estimate, &thisWeek scheduleDate today == ||`



### Review

**Review date** strategy is not the best name for my usage. I use it for tasks which are not done by me. 

* tag *waiting* (3 day) --- for long waiting tasks
* tag *ping* (1 day) --- reminds me ask someone everyday if s/he finished the task

### Occasional tasks

I was not able to setup this correctly in AM yet, so I'm using some hacks around it. Basically, these are tasks which I want to do every 15-40 days, without specifying exact day. One of the tasks is *Productivity system review*. It has a note with questions which I ask while going through all my tasks and projects:

1. Is it really mine? Maybe delegate?
2. Is there any real profit from this task?
3. Maybe it's possible to do some other task so that this one becomes obsolete?
4. Is there any easier way to do it?
5. Do I really still need to do it?

Goal is to remove or reformulate tasks.

## Ending thoughts

Of course this is just a small part of AM experience. I like being able to create work sessions for working on projects in pomodorro-style chunks. Templates are awesome and I use them for mindful book reading projects (reading, making notes, transferring them to Joplin). Gamification abilities are cute and I will explore them more, when I'll be more comfortable and less procrastinating.

I've noticed that features which were very important to me in RTM, like tagging, are not so needed here. Here you can have categories, sections, do/due/end dates, projects to achieve similar goals. This granularity and specificity are the most awesome aspect of AM!






