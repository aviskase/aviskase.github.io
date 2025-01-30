---
Title: "Postmortem: borking Ubuntu (again)"
Date: 2020-08-20T22:41:32.330195
Tags: linux
categories: [it]
og_image: og_postmortem_ubuntu.png
---

Since I had to deal with an incident recovery this week, I thought why not use it for practicing writing postmortems?

Postmortem is an excellent way to reflect and learn from disasters. Check [Google's SRE book](https://landing.google.com/sre/sre-book/chapters/postmortem-culture/) for more information.

So, let's begin.

**Summary.** On Tuesday at roughly 02:30 I wasn't able to log into Ubuntu: GNOME crashed before being able to display login screen.

**Impact.** Had to do a clean Ubuntu installation, most of the workday time lost.

**Root causes.** Incorrect and incomplete purge of accidental upgrade to Pop!_OS. The upgrade itself was cased by adding `ppa:system76/pop` and not noticing that it contains all the packages that makes Pop!_OS a different distributive.

**Action items:**

- Buy an additional external drive and setup regular `/home` backup procedure.
- Document all necessary tweaks for running Ubuntu on Dell XPS 15.

**Lessons learned:**

- Always use separate partition for `/home`. Currently Ubuntu recommends otherwise, that's why I didn't make it.
- Don't ever upgrade or purge in the middle of the night (duh!).
- Pay attention to PPA's content.
- One big external drive per household is a bottleneck.


**Timeline:** (approximate)

1. Saturday. While exploring shiny new themes for Ubuntu I stumbled upon [Pop theme](https://github.com/pop-os/gtk-theme).
2. Saturday. Since I prefer using PPA to installing from source, I added `ppa:system76/pop` repository and installed `pop-theme`.
3. Monday 20:00. Ubuntu showed notification about available updates. I didn't check it and simply agreed.
4. Monday 23:00. Rebooted into Windows.
5. Tuesday 01:30. Rebooted into Ubuntu to leave it ready for the next work day. Noticed that dual monitor settings and other customizations were gone.
6. Tuesday 01:40. Checked `apt`, it showed a warning that some GNOME packages hadn't been upgraded properly. Thus, I decided to rerun `sudo apt upgrade` manually. 
7. Tuesday 01:50. System suggests rebooting (accepted).
8. Tuesday 02:00. After rebooting it became obvious that it's no longer pure Ubuntu. Several places showed that it's now Pop!_OS. 
9. Tuesday 02:10. Googled for how to downgrade back to Ubuntu (Pop!_OS lacks certain features). Didn't read much and used the advice to run `sudo ppa-purge ppa:system76/pop` (was sleepy). 
10. Tuesday 02:20. Purge threw exception in middle and screwed up the system, GNOME in particular.
11. Tuesday 02:30. After rebooting I was not able to login into UI. Root shell recovery mode worked.
12. Tuesday 09:00. Spent time researching steps for fixing, decided it would take more time than reinstalling the system.
13. Tuesday. Booted from LiveUSB. Discovered that there was no separate `/home` partition. 
14. Tuesday. There were no recent backups, so I had to do one manually. The external hard drive at the moment didn't have enough space, and I needed to move data from it to other computer first.
15. Tuesday. After cleaning up external drive I attempted to create `tar` archives with permission preservation. I went with two archives, one for VMs, another for everything else in `/home`.
16. Tuesday. VMs' archive creation failed several times. Had to split it in more archives based on directories.
17. Tuesday. Copied all archives to external drive and checked it on the other computer. Archives for VMs were in the subdirectory and the system failed to open it (this computer has half-broken Manjaro, can't find time to fix it).
18. Tuesday. Copied VMs' archive to USB drive. Checking failed, because I forgot that this drive had `ext4` format. 
19. Tuesday. Tired and not wanting to bother with proper permissions setup, I formatted USB drive to NTFS, copied archives again, checked that they were accessible.
20. Tuesday. Created separate partitions for `/` and `/home` and reinstalled Ubuntu.
21. Tuesday. Transferred backups to the fresh system, unpacked, installed necessary apps.
22. Tuesday. Checked that dual-boot Windows was still ok after all manipulations.


---

I've been using Ubuntu, Fedora, or ElementaryOS since early university. You'd think I'll have enough experience and caution not to do stupid things like purging GUI packages while still being in GUI ;) But on the other hand, I always had a separate `/home` partition and got used to rapidly recover or change distributions. Even though it sounds like a typical Windows user behavior, I see one important difference: generally, I do know what got broken. I did it myself. I'm just not patient enough to fix all the problems ¯\\_(ツ)\_/¯