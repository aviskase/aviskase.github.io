Title: How to Watch SWF in Linux
Date: 2015-12-23

Sometimes people use Jing to record videos for bug reports. This pest is saving them as SWF file. So, here is a simple note on how to open these videos in Linux.

It's really easy. Firefox can open them (of course, if Shockwave plugin is present). Just download that nasty video and open it in FF, all's done.

But there is a catch. I don't know how it's on Windows, but for Linux you should edit mime types. In order to do that you should create a file `~/.mime.types` with this content:

```text
application/x-shockwave-flash  swf swfl
```

That's all! This way is the easiest, because it works only for the owner of the home directory, where the file was created.

But if you want, you can make this setting global. But be careful, because everything will be reset after an upgrade. You should open the file: 

```bash
$ sudo nano /usr/share/mime/packages/freedesktop.org.xml
```

and replace this string:

```text
<mime-type type="application/vnd.adobe.flash.movie">
```

with this one:

```text
<mime-type type="application/x-shockwave-flash">
```

Then execute:

```bash
$ sudo update-mime-database /usr/share/mime
```
