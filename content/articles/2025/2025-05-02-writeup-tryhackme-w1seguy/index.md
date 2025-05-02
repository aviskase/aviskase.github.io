---
title: "Writeup: TryHackMe W1seGuy"
date: "2025-05-02T14:04:40.723Z"
slug: "writeup-tryhackme-w1seguy"
categories:
    - "writeups"
    - "it"
---


> [!info]
> - [W1seGuy](https://tryhackme.com/room/w1seguy)
> - Difficulty: easy
> - Platform: cryptography
>
> Yes, it's me again with another crypto challenge! Have a look at the source code before moving on to Task 2.
>
> The server is listening on port 1337 via TCP.

This room's focus is cracking a weak encryption.

{{< toc >}}

## Information gathering

We're provided with source code of application running on port 1337. Here is the most import part of it:

```python
def setup(server, key):
    flag = 'THM{thisisafakeflag}' 
    xored = ""

    for i in range(0,len(flag)):
        xored += chr(ord(flag[i]) ^ ord(key[i%len(key)]))

    hex_encoded = xored.encode().hex()
    return hex_encoded

def start(server):
    res = ''.join(random.choices(string.ascii_letters + string.digits, k=5))
    key = str(res)
```

1. The first flag is hard-coded in the code. We get it in a hex-encoded encrypted form.
2. The second flag is provided if we guess encryption key
3. Encryption key is 5 alphanumeric characters.
4. Encryption is based on XOR.

XOR with a small key is pretty weak. It is also a reversible operation, so if we know ciphertext and part of the plaintext, we can find the key.

Accessing the service, we see ciphertext size is 80 character hex string, which should translate to 40 character plaintext string:


```sh
$ nc -n MACHINE_IP 1337
This XOR encoded text has flag 1: 661a7435400REDACTED2a763c4d
What is the encryption key?
```

## Getting the key

Usually, TryHackMe's flags start with `THM{` string. That covers the first four key characters. Since ciphertext's size is divisible by key size, we can assume that its last byte corresponds to `}` character.

I used [CyberChef](https://gchq.github.io/CyberChef/) to decode key and the flag.

First, I ran this recipe to get the key. It uses XOR operation and first 4 bytes + + last byte of encrypted string on input `THM{}`.

```
XOR({'option':'Hex','string':'661a74354d'},'Standard',false)
```

The output is the encryption key used in the app. By submitting it, I got the second flag:

```sh
$ nc -n MACHINE_IP 1337
This XOR encoded text has flag 1: 661a7435400REDACTED2a763c4d
What is the encryption key? REDACTED
Congrats! That is the correct key! Here is flag 2: THM{REDACTED}
```

And to get the first flag, run this recipe using encrypted string as an input:

```
From_Hex('Auto')
XOR({'option':'Latin1','string':'REDACTED'},'Standard',false)
```
