---
Title: "Using Google Apps scripts for productivity improvements"
Date: 2019-09-08
Tags: practical
Category: Productivity
---

Google Apps Scripts are probably the most useful automation tools I've used. They can be used as "excel macros" for Sheets, form processing, and much more. Here I want to share three small scripts I made to improve productivity and task management.


## Mark All Emails as Read

If you ever got bothered by all archived and still unread emails in Gmail, this script can help you. It is based on [the script by Mike Crittenden](https://critter.blog/2013/03/09/marking-gmail-read-with-apps-script/). 


{{< gist aviskase 634dba0b10f5cd0bad3f41709ed3e41c >}}

I don't really need it right now, because I have a filter which marks *all* incoming emails as read right away:

```
Matches: larger:1
Do this: Mark as read
```

But it was effective for cleaning up.


## Tasks Recurring Randomly for Amazing Marvin

I use Amazing Marvin for task&project management and currently it doesn't support randomly recurring items. In fact, no app I've tried supports that. It's a shame, because there could be several use cases for that: "spontaneous" cleaning&organizing, fun activities, ideas review.

If you are able to import tasks (for example, via email), you can check this script. The most important thing is a `TASKS` list. Each item should have `range_start` and `range_end`. For example, `range_start = 2` and `range_end = 9` mean that task will be created in ranges from two to nine days after last created date. E.g. if the last time task with this `id` was created on September 10, next task will be created sometime between September 12 and September 19. 

Script ensures the task will be created at some point during this range, just make sure it's triggered to run daily.

{{< gist aviskase c986a50fd0d2a24f98302201fcdc9fd7 >}}


## Create a Task When New Package Release Is Available on PyPI

I have a weird project which can start only after a particular release of one python package. It's not very urgent, so no hurry, but I don't want to check for releases manually. 

This script checks RSS for the package on [libraries.io](https://libraries.io/) and if there is a new version available, it will send email to AM to create a task.

{{< gist aviskase 079fda60adaa0c74e37c84089e4bb1ae >}}

---

I didn't go into details about how to setup these scripts, so if you have any questions, feel free to comment.
