---
title: Настройка L2TP/IPSec в Ubuntu 
ref: 170319
lang: ru
---
Линукс, он такой --- много чего есть, но некоторые вещи сделаны не для простого юзверя. В частности, я не любитель писать конфиг-файлы при использовании различных VPN, т.к. network-manager весьма удобен. Но не всегда с ним просто. 

Самая проблема --- это использование LT2PT/IPSec. Для этого нужно поплясать с бубном. Есть [хорошая статья](http://blog.z-proj.com/enabling-l2tp-over-ipsec-on-ubuntu-16-04/)[[en]], в которой описано, как именно нужно танцевать с `network-manager-l2tp`. Но так как статьи имеют свойство удаляться, нагло перепечатываю сюда себе, чтобы не потерялось.

---

Устанавливаем необходимое:

```
sudo apt install \  
intltool \  
libtool \  
network-manager-dev \  
libnm-util-dev \  
libnm-glib-dev \  
libnm-glib-vpn-dev \  
libnm-gtk-dev \  
libnm-dev \  
libnma-dev \  
ppp-dev \  
libdbus-glib-1-dev \  
libsecret-1-dev \  
libgtk-3-dev \  
libglib2.0-dev \  
xl2tpd \  
strongswan  
```

Тащим network-manager-l2tp:

```
git clone https://github.com/nm-l2tp/network-manager-l2tp.git  
cd network-manager-l2tp  
autoreconf -fi  
intltoolize  
```

Конфигурируем билд: 

```
./configure \
  --disable-static --prefix=/usr \
  --sysconfdir=/etc --libdir=/usr/lib/x86_64-linux-gnu \
  --libexecdir=/usr/lib/NetworkManager \
  --localstatedir=/var \
  --with-pppd-plugin-dir=/usr/lib/pppd/2.4.7
```


Дальше: 

```
make  
sudo make install 
```

Удаляем из AppArmor настройки для IPSec: 

```
sudo apparmor_parser -R /etc/apparmor.d/usr.lib.ipsec.charon  
sudo apparmor_parser -R /etc/apparmor.d/usr.lib.ipsec.stroke  
```

Заменяем x2ltpd на libpcap: 

```
sudo apt remove xl2tpd  
sudo apt install libpcap0.8-dev

wget https://github.com/xelerance/xl2tpd/archive/v1.3.6/xl2tpd-1.3.6.tar.gz  
tar xvzf xl2tpd-1.3.6.tar.gz  
cd xl2tpd-1.3.6  
make  
sudo make install  
```

Перезагружаем машину, profit.
