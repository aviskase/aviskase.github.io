---
title: Конфигурация виртуалки для автотестов
lang: ru
---

Опять грохнула свою виртуалку. В прошлый раз я поняла, что надо делать снепшоты. В этот раз &mdash; что надо делать бекапы снепшотов.

Кратко опишу, что составляет мою магическую виртуалку для обучения автотестированию и курсов.


## VM и ОС
Использую VirtualBox со стандартными настройками для ubuntu. В качестве гостевой ОС --- Ubuntu Server 14.04.

Настройки сети: bridged adapter. Я почти нифига не понимаю в этом, поэтому делаю так. Ибо так просто и так работает. Статический айпишник сконфигурирую уже из самой бубунты. Для этого нужно открыть файл:

```console
sudo nano /etc/network/interfaces
```

И вписать значения (машина будет по адресу `192.168.1.100`):

```text
auto eth0
iface eth0 inet static
address 192.168.1.100
netmask 255.255.255.0
network 192.168.1.0
broadcast 192.168.0.255
gateway 192.168.1.1
dns-nameservers 192.168.1.1
```

Так же я убираю запрос пароля на sudo. Открыть `sudo visudo` и вписать:

```text
username ALL=(ALL) NOPASSWD: ALL
```

Ну и напоследок, поставить ssh.

```console
sudo apt-get install ssh
```

Больше с виртуалкой изнутри не работаю, подключаюсь к ней по ssh из родного терминала.

Напоследок. Что бы перекинуть на сервер файл находясь на родине:

```console
scp file username@server_ip:/path/
```

## XAMPP
Установка XAMPP:

```console
sudo chmod +x xampp-installer.run
sudo ./xampp-installer.run
```

Автозагрузка XAMPP при старте системы (из FAQ):

```console
sudo ln -s /opt/lampp/lampp /etc/init.d/lampp
sudo update-rc.d lampp start 80 2 3 4 5 . stop 30 0 1 6 .
```

Открываем доступ до phpMyAdmin. Для этого надо открыть файл `/opt/lampp/etc/extra/httpd-xampp.conf` и убрать `phpmyadmin` из строки:

```text
<LocationMatch "^/(?i:(?:xampp|security|licenses|phpmyadmin|webalizer|server-status|server-info))">
```

Убираем показ php ошибок. Открыть файл `/opt/lampp/etc/php.ini` и поменять на `display_errors=Off`.

Все сайтики кидать в папку `/opt/lampp/htdocs/`.

maven jenkins
selenium chromedriver chrome
x python

8409
