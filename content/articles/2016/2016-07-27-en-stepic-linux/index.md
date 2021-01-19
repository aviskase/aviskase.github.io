---
Title: 'Notes for course "Intro to Linux"'
Date: 2016-07-27
Tags: linux, course, practical
Category: Other
---

If there is a Linux course on a platform, I'll always watch it. Those who know me are aware that I am using some kind of Debian-based distributive full time --- I'm not a hardcore fan, but I like it here. One might ask: why am I watching all these courses when they are mostly for beginners? Answer is simple: repetition is the mother of learning, plus there are always some tricks that you forget or can become more interesting with time.

So it happened with [Intro to Linux](https://stepic.org/course/Введение-в-Linux-73)(ru) on Russian platform Stepic. First, I've got month license for any JetBrains IDE by solving some exercises and that's cool. Second, cute guys from Bioinformatics Institute made me adore tmux and almost persuaded to look at vim. Almost.

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

* Go to commands mode: {{<kbd Ctrl b>}}
* Create new window: commands mode and {{<kbd c>}}
* Create vertical split: commands mode and {{<kbd "%">}}
* Create horizontal split: commands mode and {{<kbd "\"">}}
* Go to window number 1 ... 9: commands mode and {{<kbd "1">}} ... {{<kbd "9">}}
* Go to next window: commands mode and {{<kbd n>}}
* Go to previous window: commands mode and {{<kbd p>}}
* Close window or split: commands mode and {{<kbd x>}}
* Detach (temporal exit): commands mode and {{<kbd d>}}
* Return to tmux: `tmux attach / tmux a`
* List all running tmux: `tmux list-sessions`
