Title: Enabling L2TP/IPSec in Ubuntu 


Linux is like that: you can do anything, but sometimes it's not easy for a common user. As for me, I hate writing config files for VPN, because network-manager is awesome. But sometimes it's not easy to make it work. 

The biggest problem for me is LT2PT/IPSec. There is [an excellent article](http://blog.z-proj.com/enabling-l2tp-over-ipsec-on-ubuntu-16-04/) on how to enable it using `network-manager-l2tp`. But as on-line articles have a tendency to be removed, I want to save these instructions here.

---

Install the prerequisites:

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

Get network-manager-l2tp:

```
git clone https://github.com/nm-l2tp/network-manager-l2tp.git  
cd network-manager-l2tp  
autoreconf -fi  
intltoolize  
```

Configure the build: 

```
./configure \
  --disable-static --prefix=/usr \
  --sysconfdir=/etc --libdir=/usr/lib/x86_64-linux-gnu \
  --libexecdir=/usr/lib/NetworkManager \
  --localstatedir=/var \
  --with-pppd-plugin-dir=/usr/lib/pppd/2.4.7
```


Next: 

```
make  
sudo make install 
```

Remove AppArmor settings for IPSec: 

```
sudo apparmor_parser -R /etc/apparmor.d/usr.lib.ipsec.charon  
sudo apparmor_parser -R /etc/apparmor.d/usr.lib.ipsec.stroke  
```

Replace x2ltpd with libpcap: 

```
sudo apt remove xl2tpd  
sudo apt install libpcap0.8-dev

wget https://github.com/xelerance/xl2tpd/archive/v1.3.6/xl2tpd-1.3.6.tar.gz  
tar xvzf xl2tpd-1.3.6.tar.gz  
cd xl2tpd-1.3.6  
make  
sudo make install  
```

Restart your machine, profit.
