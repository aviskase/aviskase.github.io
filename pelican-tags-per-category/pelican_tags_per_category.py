import os
from collections import defaultdict
from operator import attrgetter

from pelican import signals
from pelican.urlwrappers import URLWrapper


class CategorizedTag(URLWrapper):
    def __init__(self, name, category, settings):
        super().__init__(name, settings)
        self.category = category
        self.save_path = os.path.join(self.category.slug, self.slug)
        self.full_url = f'{self.category.slug}/{self.slug}'

    def as_dict(self):
        d = self.__dict__
        d['save_path'] = self.save_path
        d['full_url'] = self.full_url
        d['category'] = self.category
        return d

    def __hash__(self):
        return hash(self.full_url)

    def _key(self):
        return self.full_url


def create_categorized_tags(generator, metadata):
    if 'CATEGORIES_WITH_TAGS_SAVE_AS' not in generator.settings:
        generator.settings['CATEGORIES_WITH_TAGS_SAVE_AS'] = os.path.join('meta', 'index.html')
    if 'CATEGORIES_WITH_TAGS_URL' not in generator.settings:
        generator.settings['CATEGORIES_WITH_TAGS_URL'] = 'meta'
    category = metadata.get('category')
    categorized_tags = [CategorizedTag(tag.name, category, generator.settings) for tag in metadata.get('tags', [])]
    metadata['categorized_tags'] = categorized_tags


def generate_categorized_tags(generator):
    for category, articles in generator.categories:
        category.tags = {
            tag
            for article in articles
            for tag in article.categorized_tags
        }
    categorized_tags = defaultdict(list)
    for article in generator.articles:
        for tag in article.categorized_tags:
            categorized_tags[tag].append(article)
    generator.categorized_tags = list(categorized_tags.items())


def write_categorized_tags(generator, writer):
    tag_template = generator.get_template('categorized_tag')
    for tag, articles in generator.categorized_tags:
        articles.sort(key=attrgetter('date'), reverse=True)
        dates = [article for article in generator.dates if article in articles]
        writer.write_file(
            tag.save_as, tag_template, generator.context, relative_urls=generator.settings['RELATIVE_URLS'],
            tag=tag, articles=articles, dates=dates,
            template_name='categorized_tag', page_name=tag.page_name,
            all_articles=generator.articles
        )


def write_meta_page(generator, writer):
    page_template = generator.get_template('categories_with_tags')
    writer.write_file(
        generator.settings['CATEGORIES_WITH_TAGS_SAVE_AS'], page_template, generator.context,
        categories=generator.categories, url=generator.settings['CATEGORIES_WITH_TAGS_URL'],
        relative_urls=generator.settings['RELATIVE_URLS'],
        template_name='categories_with_tags', page_name=generator.settings['CATEGORIES_WITH_TAGS_URL'],
    )


def register():
    signals.article_generator_context.connect(create_categorized_tags)
    signals.article_generator_finalized.connect(generate_categorized_tags)
    signals.article_writer_finalized.connect(write_categorized_tags)
    signals.article_writer_finalized.connect(write_meta_page)
