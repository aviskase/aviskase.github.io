---
title: "New keyboard layout habits for Emacs"
date: "2025-08-03T02:18:09.630Z"
draft: true
slug: "keyboard-layout-habits-emacs"
categories:
    - "it"
---


The first thing  [a newbie Emacs user](../2025-07-27-writing-experience---emacs-you-won/index.md) learns is that it's recommended to switch {{<kbd  CapsLock>}} to {{<kbd  Ctrl>}}. Great idea, except I was using it to switch keyboard layouts (Russian <-> English). 

I explored some options:
- Switch {{<kbd  CapsLock>}} to {{<kbd  Ctrl>}} and use the default {{<kbd Win Space>}} for layouts;
- Keep {{<kbd  CapsLock>}} for the  layout change, setup pressed {{<kbd Space>}} to act as {{<kbd  Ctrl>}}.

There was also a question of Compose key which was mapped to {{<kbd AltGr>}}. And don't forget the need for an occasional use of the real {{<kbd CapsLock>}}. 

While I liked an idea of using {{<kbd Space>}} and potentially getting used to keyboards which might have dedicated thumb keys for modifier, the setup was slightly more annoing and even more so if I ever need to use Windows. Thus, I settled on this:

- {{<kbd  CapsLock>}} to {{<kbd  Ctrl>}}: in GNOME Tweaks go to Keyboard -> Additional Layout Options -> Caps Lock behavior -> Make Caps Lock an additional Ctrl;
- Keep left {{<kbd  Ctrl>}} as is for now to get used to the new layout;
- Double {{<kbd Shift>}} as {{<kbd CapsLock>}}: in GNOME Tweaks go to Keyboard -> Additional Layout Options -> Compatibility options -> Both Shifts together enable Caps Lock;
- Use default layout change on {{<kbd Win Space>}} but install [Quick Lang Switch](https://extensions.gnome.org/extension/4559/quick-lang-switch/) GNOME extenstion to hide the annoying switcher popup;
- Use {{<kbd ScrLk>}} as a Compose key:  in GNOME Settings go to Keyboard -> Compose key. I'm using Dell XPS laptop, so for times without external keyboard: {{<kbd ScrLk>}} == {{<kbd Fn S>}}.

By the way, there is a setting in GNOME Tweaks to enable Emacs input to override default shortcuts. Here is [a guide on how to enable it and fix other programs](https://blog.karssen.org/2024/06/05/using-emacs-key-bindings-in-gnome-firefox-and-other-applications/). You should also be aware of [potential problems with select all and copy to clipboard shortcuts](https://bbs.archlinux.org/viewtopic.php?id=162794). I haven't turned on this setting yet, but it's a nice option to have.