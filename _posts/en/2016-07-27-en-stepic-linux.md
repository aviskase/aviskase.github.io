---
title: Notes for course "Intro to Linux" 
ref: 160727
lang: en
---
If there is a Linux course on a platform, I'll always watch it. Those who know me are aware that I am using some kind of Debian-based distributive full time --- I'm not a hardcore fan, but I like it here. One might ask: why am I watching all these courses when they are mostly for beginners? Answer is simple: repetition is the mother of learning, plus there are always some tricks that you forget or can become more interesting with time.

So it happened with [Intro to Linux](https://stepic.org/course/Введение-в-Linux-73)[[ru]] on Russian platform Stepic. First, I've got month license for any JetBrains IDE by solving some exercises and that's cool. Second, cute guys from Bioinformatics Institute made me adore tmux and almost persuaded to look at vim. Almost.

And now as usual, some notes to not to forget. If something looks like a magic: read books or watch some course!

---

Run program in background: 

```
program &
```

Check if link is available: 

```
wget --spider somelink
```

Download files by links from a text file: 

```
wget -i some-textfile
```


Using arguments in scripts:

* `$#` --- number of arguments
* `$0` --- script name
* `$1` --- the first argument
* `$2` --- the second argument

How much space does something occupy:

```
du [--max-depth <depth> -h] <path>
```

Create several directories / files at once:

```
mkdir {dir1,dir2,dir3,dir4}
touch {fileA,fileB}.txt
```

tmux --- terminal multiplexor

* Go to commands mode: <kbd>Ctrl + B</kbd>
* Create new window: <kbd>Ctrl + B , C </kbd>
* Create vertical split: <kbd>Ctrl + B , % </kbd>
* Create horizontal split: <kbd>Ctrl + B , " </kbd>
* Go to window number N: <kbd>Ctrl + B , &lt;N&gt;</kbd>
* Go to next window: <kbd>Ctrl + B , N</kbd>
* Go to previous window: <kbd>Ctrl + B , P</kbd>
* Close window or split: <kbd>Ctrl + B , X</kbd>
* Detach (temporal exit): <kbd>Ctrl + B , D</kbd>
* Return to tmux: `tmux attach / tmux a`
* List all running tmux: `tmux list-sessions`