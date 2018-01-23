---
title: Курс "Intro to DevOps" от Udacity
ref: 160717
lang: ru
---
Люблю всякие MOOC платформы: Coursera, Udacity, Stepic. Курсов столько, что на всю жизнь хватит. Давеча быстренько прослушала короткий курс [Intro to DevOps](https://www.udacity.com/course/intro-to-devops--ud611)[[en]] от Udacity.

Курс короткий и по делу. Собрала в кучку заметки, что бы не забыть.

---

## DevOps 
*DevOps* --- это практика, в которой подразделения разработки и эксплуатации взаимодействуют на протяжении всего жизненного цикла продукта, начиная с дизайна, разработки и до поддержки.

DevOps также характеризуется тем, что оба подразделения используют схожие техники для поддержки работы системы.

CommitStrip --- [чем DevOps *не является*](http://www.commitstrip.com/en/2015/02/02/is-your-company-ready-for-devops/)[[en]]

Главные компоненты DevOps --- CAMS:

* Communication (коммуникация) --- взаимодействия по типу agile, рациональность, взаимоуважение
* Automation (автоматизация) --- деплой, тестирование, интеграция
* Measurement (измерения) --- мониторинг, полезные логи, бизнес метрики, есть ли выгода от инструментов и процессов
* Sharing (обмен) --- общее понимание целей, проблем, и преимуществ.

> Ты не можешь управлять тем, что не можешь измерить.


## Решения проблемы со средами

1. "Золотой образ"
    * больше предварительной работы --- нужно генерировать новый образ для каждого изменения
    * быстрая установки и загрузка
2. Управление конфигурациями
    * более простой процесс установки --- интеграция происходит во время установки и/или загрузки системы 
    * медленный запуск
3. Комбинация 1 и 2

## Мониторинг

Источники данных для мониторинга:

* внешние измерения, тестовые запросы
* статистики приложения (количество запросов в секунду, время задержки)
* статистики среды (профиль памяти JVM)
* статистики хоста или контейнера (средняя загрузка, ошибки чтения с дисков)

Результаты работы мониторинга:

* уведомления
* анализ производительности
* прогноз необходимых мощностей
* измерение роста
* отладочные метрики 

![Системы мониторинга](/assets/images/monitoring_systems.png)

## Дополнительные материалы
Все ссылки ведут на материалы на английском языке.

### Книги

* [The Phoenix Project](http://itrevolution.com/books/phoenix-project-devops-book/) (by Gene Kim, Kevin Behr, George Spafford) --- роман о том, как DevOps меняет бизнес к лучшему
* [Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation](http://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley-ebook/dp/B003YMNVC0) (by Jez Humble, David Farley) --- принципы и практики, которые позволяют делать быстрые и инкрементные релизы высококачественной и ценной новой функциональности для пользователей
* [Lean Enterprise: How High Performance Organizations Innovate at Scale](http://www.amazon.com/Lean-Enterprise-Performance-Organizations-Innovate/dp/1449368425) (by Jez Humble, Joanne Molesky, Barry O'Reilly) --- Lean и Agile принципы и паттерны, позволяющие вам двигаться быстрее в требуемом масштабе --- а также почему и как применять эти методологии для всей организации, а не для одного подразделения или команды
* [Building a DevOps Culture](http://smile.amazon.com/gp/product/B00CBM1WFC) (by Mandi Walls) --- бесплатная книга для Kindle --- DevOps это культура, а не инструменты

### Выступления

* [Short history of DevOps](https://www.youtube.com/watch?v=o7-IuYS0iSE) --- видео от Damon Edwards
* [Chef Style DevOps Kungfu](https://www.youtube.com/watch?v=_DEToXsgrPc) --- доклад Adam Jacob на конференции ChefConf 2015
* [Jez Humble Keynote](https://www.youtube.com/watch?v=L1w2_AY82WY) --- ChefConf 2015
* [Leading the Horses to Drink](https://vimeo.com/69079272) --- как поддержать и запустить трансформацию в DevOps от Damon Edwards

### Блоги и сайты о DevOps

* [What DevOps means to me](https://www.chef.io/blog/2010/07/16/what-devops-means-to-me/) --- объяснение компонентов, входящих в CAMS, а также мысли о том, чем является и чем не является DevOps --- от John Willis
* [dev2ops](http://dev2ops.org/) --- как меняется мир DevOps и облаков
* [the agile admin](http://theagileadmin.com/) --- блог о DevOps, agile, облачных вычислениях, автоматизации инфраструктуры, безопасности в Web (особенно AppSec), прозрачности, опенсорс, мониторинге, оптимизации производительности в Web, и т.д.
* [The DevOps checklist](http://devopschecklist.com/) --- чеклист из 48 пунктов, с помощью которых можно оценить зрелость вашего процесса поставки ПО, а также определить необходимые улучшения для будущего 
* [DevOps --- A Crash Course](http://www.mattstratton.com/) от Matt Stratton. Много ссылок на хорошие ресурсы о DevOps.

### Дополнительные материалы от Nutanix

* [The Nutanix Bible](http://stevenpoitras.com/the-nutanix-bible/) --- краткая история дата центров, виртуализации, архитектуры уровня web scale и объяснение гиперконвергентной архитектуры Nutanix
* [Hyperconverged Infrastructure Guide](http://go.nutanix.com/webscale-101-hyper-converged-infrastructure-guide.html)
* [Nutanix Education portal](https://next.nutanix.com/t5/Nutanix-Education-Blog/bg-p/Certifications)
* [Nutanix Education YouTube channel](https://www.youtube.com/channel/UCJupSMWQRKQTvkb2CfkW0Eg)
* [Nutanix NEXT community site](http://next.nutanix.com/)

### Популярные средства мониторинга

* [Nagios](https://www.nagios.org/) and [Zabbix](http://www.zabbix.com/) --- универсальные решения для мониторинга больших инфраструктурных проектов, но возможно слишком сложные и тяжелые для небольших проектов
* [Graphite](http://graphite.wikidot.com/) --- база данных и построитель графиков с открытым исходным кодом для хранения и отображения данных 
* [InfluxDB](https://influxdb.com/) --- распределенная база данных с открытым исходным кодом для временных рядов метрик, событий и аналитики
* [StatsD](https://github.com/etsy/statsd) --- простой демон для агрегации статистики от Etsy. Более подробно о философии инструмента можно прочесть в статье его создателей --- [Measure Anything, Measure Everything](https://codeascraft.com/2011/02/15/measure-anything-measure-everything/)
* [Grafana](http://grafana.org/) --- панель управления метриками и редактор графиков для Graphite и InfluxDB
* [PagerDuty](https://www.pagerduty.com/) --- платформа управления жизненным циклом разрешения инцидентов, которая интегрируется с более чем 100 других систем, что бы облегчить этот процесс для больших организаций
* [Logstash](https://www.elastic.co/products/logstash) --- система хранения и поиска логов, хорошо сочетается с [Kibana](https://www.elastic.co/products/kibana) --- ПО для построения графиков и визуализаций
