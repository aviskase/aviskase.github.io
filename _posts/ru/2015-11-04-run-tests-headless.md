---
title: Запуск тестов в headless режиме
lang: ru
ref: 151104
---


Это баян, все это знают, но а вдруг забуду?

Коротенько о том, что питон прелестен и аве плагино-писателям.

## Болтовня
Поставила Jenkins как белый человек нативно, а не war. И тут-то оказалось, что запустить Selenium тесты просто так не выйдет. Видите-ли при установке Jenkins создал себе собственного юзверя и выполняет задачки от его имени. А значит, если вы залогинены под собой, то этот пользователь не имеет доступа к гуям. Такие дела.

Поэтому нужно обеспечить ему доступ к виртуальным гуям. По сути есть два способа это сделать: *vncserver* либо *xvfb*. Здесь и далее речь идет о *nix, что там под Windows я не знаю, и не очень хочу выяснять, пока не припрет.

Честно, я не в курсе, что там за разница между этими двумя способами. Субъективно, *xvfb* быстрее.

## Установка
Команды приведены для debian-like дистрибутивов.

### Vncserver
Ставим, настраиваем. В процессе попросит поставить пароль для vnc сервера --- пишем что угодно, он нам не понадобится.

{% highlight bash %}
$ sudo apt-get install -y vnc4server
$ sudo su jenkins
$ vncserver
$ exit
{% endhighlight %}

### Xvfb
Все просто, ставим и радуемся. Поговаривают, что там еще какие-то шрифты нужно установить. Я не ставила, но тебя, заблудший сюда, если что предупредили =)

{% highlight bash %}
$ sudo apt-get install xvfb
{% endhighlight %}

## Как запускать

### Python
Существует библиотека [PyVirtualDisplay](https://pypi.python.org/pypi/PyVirtualDisplay). Это обертка вокруг этих наших виртуальных дисплеев. Нет смысла сособо ее описывать, доки очень понятные. Приведу лишь пример кода в тесте:

{% highlight python %}
from selenium import webdriver
from pyvirtualdisplay import Display
display = Display(visible=0, size=(800, 600))
display.start()
driver = webdriver.Firefox()
# tests
driver.quit()
display.stop()
{% endhighlight %}

Этот способ хорош тем, что не зависит от того, где будут запускаться тесты. Есть Jenkins, нет его, какой конкретно X установлен --- не нужно заморачиваться.

### Java
Умные люди говорят, что таких замечательных библиотек для джавы нема. У меня тоже найти не получилось. Поэтому скажем спасибо хорошим людям, которые написали плагины для Jenkins.

Если запускать через vncserver, то нужно установить плагин `xvnc`. Если через xvfb --- то `xvfb`.

И теперь при конфигурации джобов нужно все-лишь поставить галочку  "Run xvnc / xvfb during build" в разделе "Build Environment". Вроде все.

С одной стороны, этот способ хорош тем, что метод запуска отделен от логики тестов. С другой стороны, если мы захотим прогнать эти же самые тесты на локальной машине, то все равно придется городить зависимости от maven плагинов (да, они существуют).

## P.S.
Ну да, знаю, есть же еще PhantomJS. Готовый headless браузер. Замечательная штука, но он не смог переварить прелестный код мой текущего проекта и отказывается грузить половину элементов. Поэтому play-safe, лучше пусть будет тормознее, но с реальными браузерами.

Кстати. Headless. А как по-русски? Мне на ум приходит только "безбашенный".