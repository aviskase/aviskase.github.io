---
date: "2025-02-03T12:12:54-05:00"
title: "Writeup: TryHackMe Lo-Fi"
draft: false
see_also: []
categories:
    - "it"
    - "writeups"
slug: "writeup-tryhackme-lo-fi"
---

{{< callout type="info" >}}
- [Lo-Fi](https://tryhackme.com/r/room/lofi)
- Difficulty: easy
- Platform: web


Want to hear some lo-fi beats, to relax or study to? We've got you covered! 
Check out similar content on TryHackMe:

- LFI Path Traversal
- File Inclusion
{{< /callout >}}

Very simple room. Its description mentions *local file inclusion* vulnerability.

Open the website at `http://MACHINE_IP`. There are links to other pages like this: `http://MACHINE_IP/?page=relax.php`

Attempt to get LFI `http://MACHINE_IP/?page=../../../etc/passwd` is working. 

Let's try to find a flag. I just stompted up in the directory hierarchy: `http://MACHINE_IP/?page=../../../flag.txt`. Success: `flag{REDACTED}`!

Even though it is a very simple room, I still checked other writeups. And it was a good idea because here you can read about [how to escalate LFI to RCE](https://jaxafed.github.io/posts/tryhackme-lo-fi/#extra---rce).