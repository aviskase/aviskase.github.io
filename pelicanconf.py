#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import pymdownx.emoji

AUTHOR = 'Yuliya Bagriy'
SITENAME = 'aviskase'
SITEURL = ''
EMAIL = 'aviskase@gmail.com'
PATH = 'content'

TIMEZONE = 'America/Montreal'

DEFAULT_LANG = 'en'


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None



# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

PLUGINS = ['neighbors', 'readtime', 'pelican_gist']

READTIME_WPM = 180

ARTICLE_PATHS = ['articles']
STATIC_PATHS = ['images', 'pdf']
PAGE_PATHS = ['pages']
ARTICLE_URL = 'articles/{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'articles/{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'
PAGE_URL = 'pages/{slug}/'
PAGE_SAVE_AS = 'pages/{slug}/index.html'
CATEGORY_URL = ''
CATEGORY_SAVE_AS = ''
TAG_URL = ''
TAG_SAVE_AS = ''

USE_FOLDER_AS_CATEGORY = False
DISPLAY_CATEGORIES_ON_MENU = False
THEME='theme'


MARKDOWN = {
    'extension_configs': {
        # https://pythonhosted.org/Markdown/extensions/index.html#officially-supported-extensions
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.meta': {},
        'markdown.extensions.sane_lists': {},
        'markdown.extensions.smarty': {},
        # 'markdown.extensions.nl2br': {},
        # 'markdown.extensions.toc': {'permalink': True},
        # https://facelessuser.github.io/pymdown-extensions/
        'pymdownx.extra': {},
        'pymdownx.emoji': {
            "options": {
                "classes": "emoji",
                "attributes": {
                    "align": "absmiddle",
                    "height": "20px",
                    "width": "20px"
                }
            }
        },
        'pymdownx.caret': {'superscript': True},
        'pymdownx.tilde': {},
        'pymdownx.magiclink': {},
        'pymdownx.smartsymbols': {},
    },
    'output_format': 'html5',
    'lazy_ol': False,
}
TYPOGRIFY = True

