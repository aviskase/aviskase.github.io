---
title: Как посмотреть SWF видео
lang: ru
ref: 151223
---

Частенько люди пользуют Jing для записи видосиков, что бы потом прикрепить к описанию баги. А эта зараза сохраняет их как SWF. Так что вот простая заметка, как это чудо открывать.

Всё до неприличия просто. Firefox умеет их открывать (конечно, если установлен Shockwave plugin). Качаешь видео-бяку и открываешь в ФФ, лепота.

Но есть нюанс. Как там на винде, я не в курсе, но для линуха нужно подправить mime определения, ибо ФФ не окукливает. Для этого нужно создать файл `~/.mime.types` и внести в него следующую строку:

{% highlight text %}
application/x-shockwave-flash  swf swfl
{% endhighlight %}

И это всё! Данный способ самый простой, потому что работает только на юзера домашней папки, в которой был создан файл.

Если хочется заморочиться, то можно сделать сию настройку глобальной, но будь осторожен, друг, при апгрейде это изменение затрётся. Нужно открыть на редактирование файл

{% highlight console %}
sudo nano /usr/share/mime/packages/freedesktop.org.xml
{% endhighlight %}

и заменить строку:

{% highlight text %}
<mime-type type="application/vnd.adobe.flash.movie">
{% endhighlight %}

на эту строку:

{% highlight text %}
<mime-type type="application/x-shockwave-flash">
{% endhighlight %}

И потом выполнить:

{% highlight console %}
sudo update-mime-database /usr/share/mime
{% endhighlight %}
