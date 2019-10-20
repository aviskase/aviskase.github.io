# -*- coding: utf-8 -*-

import os
import shutil
import sys
from datetime import datetime, timedelta
from pathlib import Path

from invoke import task
from invoke.util import cd
from pelican.server import ComplexHTTPRequestHandler, RootedHTTPServer
from pelican.settings import DEFAULT_CONFIG, get_settings_from_file
from pelican.utils import slugify

SETTINGS_FILE_BASE = 'pelicanconf.py'
SETTINGS = {}
SETTINGS.update(DEFAULT_CONFIG)
LOCAL_SETTINGS = get_settings_from_file(SETTINGS_FILE_BASE)
SETTINGS.update(LOCAL_SETTINGS)

CONFIG = {
    'settings_base': SETTINGS_FILE_BASE,
    'settings_publish': 'publishconf.py',
    # Output path. Can be absolute or relative to tasks.py. Default: 'output'
    'deploy_path': SETTINGS['OUTPUT_PATH'],
    # Github Pages configuration
    'github_pages_branch': 'master',
    'commit_message': "'Publish site on {}'".format(datetime.today().date().isoformat()),
    # Port for `serve`
    'port': 8000,
}

@task
def clean(c):
    """Remove generated files"""
    if os.path.isdir(CONFIG['deploy_path']):
        shutil.rmtree(CONFIG['deploy_path'])
        os.makedirs(CONFIG['deploy_path'])

@task
def build(c):
    """Build local version of site"""
    c.run('pelican -s {settings_base}'.format(**CONFIG))

@task
def rebuild(c):
    """`build` with the delete switch"""
    c.run('pelican -d -s {settings_base}'.format(**CONFIG))

@task
def regenerate(c):
    """Automatically regenerate site upon file modification"""
    c.run('pelican -r -s {settings_base}'.format(**CONFIG))

@task
def serve(c):
    """Serve site at http://localhost:$PORT/ (default port is 8000)"""

    class AddressReuseTCPServer(RootedHTTPServer):
        allow_reuse_address = True

    server = AddressReuseTCPServer(
        CONFIG['deploy_path'],
        ('', CONFIG['port']),
        ComplexHTTPRequestHandler)

    sys.stderr.write('Serving on port {port} ...\n'.format(**CONFIG))
    server.serve_forever()

@task
def reserve(c):
    """`build`, then `serve`"""
    build(c)
    serve(c)

@task
def preview(c):
    """Build production version of site"""
    c.run('pelican -s {settings_publish}'.format(**CONFIG))

@task
def livereload(c):
    """Automatically reload browser tab upon file modification."""
    from livereload import Server
    build(c)
    server = Server()
    # Watch the base settings file
    server.watch(CONFIG['settings_base'], lambda: build(c))
    # Watch content source files
    content_file_extensions = ['.md', '.rst']
    for extension in content_file_extensions:
        content_blob = '{0}/**/**/*{1}'.format(SETTINGS['PATH'], extension)
        server.watch(content_blob, lambda: build(c))
    # Watch the theme's templates and static assets
    theme_path = SETTINGS['THEME']
    server.watch('{}/templates/*.html'.format(theme_path), lambda: build(c))
    static_file_extensions = ['.css', '.js']
    for extension in static_file_extensions:
        static_file = '{0}/static/*{1}'.format(theme_path, extension)
        server.watch(static_file, lambda: build(c))
    # Serve output path on configured port
    server.serve(port=CONFIG['port'], root=CONFIG['deploy_path'])


@task
def publish(c):
    """Publish to production"""
    c.run('pelican -s {settings_publish} --fatal=warnings'.format(**CONFIG))

@task
def gh_pages(c):
    """Publish to GitHub Pages"""
    preview(c)
    c.run('ghp-import -b {github_pages_branch} '
          '-m {commit_message} '
          '{deploy_path} -p'.format(**CONFIG))


@task
def new_post(c, post_name):
    post_time = datetime.today().isoformat()
    slug = slugify(
        post_name,
        regex_subs=SETTINGS.get('SLUG_REGEX_SUBSTITUTIONS', [])
    )
    file_path = f'content/articles/drafts/{slug}.md'
    template = (
        f'Title: {post_name}\n'
        f'Date: {post_time}\n'
        'Tags: xxx\n'
        'Category: XXX\n'
        'Status: draft\n\n'
    )
    with open(file_path, mode='w') as f:
        f.write(template)


@task
def publish_post(c, draft_path):
    post_time = datetime.today() + timedelta(minutes=30)
    draft_path = Path(draft_path)
    new_post_path = (
        Path('content/articles/') /
        f'{post_time.year}' /
        f'{post_time.date().isoformat()}-{draft_path.name}'
    )
    c.run(f'sed -i \'s/Date:.*/Date: {post_time.isoformat()}/\' {draft_path}')
    c.run(f'mv {str(draft_path)} {str(new_post_path)}')