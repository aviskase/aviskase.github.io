---
title: "From Pelican to Hugo"
date: 2020-10-04T21:15:54-04:00
draft: false
---

[As I mentioned in one of the last articles]({{<ref 2020-08-30-remembering-javascript-and-typescript>}}) I was planning to migrate this blog from [Pelican](https://github.com/getpelican/pelican) to other static site generator.

## Why and Where

Reasons:

- Pelican got a new major version 4, which required some migration work on my side either way.
- When I'm fixing spelling and style I prefer checking on rendered local site and not raw markdown. But live reload became too slow and frustrating (every change took approximately 1-3 minutes). 
- I just love to switch gears occasionally. This blog was originally built with [Jekyll](https://jekyllrb.com/) (until mid-2019).

So, I opened [StaticGen](https://www.staticgen.com/) to check what was trendy. My final choice was between [Gatsby](https://www.gatsbyjs.com/) and [Hugo](https://gohugo.io/).

| Gatsby | Hugo |
| -- | -- |
| JS-based, good for enforcing much-needed JS deep dive | Go-based, simply cool. |
| Very flexible, tons of plugins, data pulling via GraphQL | Somewhat flexible. Still not sure about plugins. |
| Praised for fast loading, especially if you have JS | Fast building. Extremely fast building. |
| Often used for API dev portals | |

As you have guessed by the title, I went with Hugo because:

- I don't need JS on the site itself
- I'm more interested in fast builds than loading
- I heard that Go is the dumbest language in the world, might as well experience some of it xD

## Migration Shenanigans

Pelican and Hugo have a very different template format. Rewriting took most of the time, but as you can see, there are no visual changes. I also had to write Atom feed template almost from scratch and test it to make sure that `id`'s are the same and the whole feed won't be completely regenerated (like it happened the last migration.)

But Hugo templates are way more flexible than Pelican's. What I had to do with plugins was achieved with core features. I also fell in love with [shortcodes](https://gohugo.io/content-management/shortcodes/) and [markdown render hooks](https://gohugo.io/getting-started/configuration-markup/#markdown-render-hooks) which allow further customizations. For example, I used to have a Pelican plugin that detects links to external resources and adds a special `external` CSS class to them. Now the whole plugin is replaced with one link render hook that I can easily customized as I want later:

```go-html-template
<a href="{{ .Destination | safeURL }}"{{ if strings.HasPrefix .Destination "http" }} class="external"{{ end }}>{{ .Text | safeHTML }}</a>
```

Second problem was the markdown sources. They had special Pelican front matter format, not compatible with any supported by Hugo (YAML, TOML, JSON, Org). Yikes. Same for `!!! note` admonition syntax, `kbd` auto-detection (all replaced by shortcode), and internal links. I don't have too much content, so most of the work was done via `grep` and manually replacing stuff.

Third problem was images. The simple solution would be to set them all to `static` folder, but it's not a recommended approach because you wouldn't be able to use image processing features. Thus, you should go with `assets` or [page bundles](https://gohugo.io/content-management/page-bundles/). I prefer bundles because they create a clear distinction where each image belongs to. 


## Changes to the Site

While I was trying to preserve as much as I could, there are some _intentional_ changes:

- No more tagging and categories. I never used them; when I needed to find anything, I just used search. Perhaps it will also force me to make titles more explicit. 
- No Google tag (aka analytics). While it had been respecting all possible "Do Not Track" settings, I ditched it completely. At first, it was fun to watch graphs, incoming sources, and play with smart goals, but after a while I stopped caring. Search console is more than enough.
- No Disqus comments. Not much value in them anyway (maybe I should actually use Twitter? LOL.)

## Results

I'm quite happy with the migration. It is blazing fast as advertised: GitHub action build went from 2-3 minutes down to 30 seconds. Local live reload is faster than it takes to turn my head to the browser tab.

There is only one problem left. I used `img` shortcode [to generate responsive images](https://laurakalbag.com/processing-responsive-images-with-hugo/), but for some reason on my site browsers select too low resolution. I tried to understand why yet couldn't: I had less trouble hacking my way through GnuCash reporting in Scheme (which I don't know) than trying to fix the damn CSS. Current style sheet was borrowed from some theme and reworked over time, but it probably doesn't follow modern best practices. Hugo documentation introduced me to [Tailwind CSS](https://tailwindcss.com/) and [PostCSS](https://postcss.org/); and while I hate CSS, the time for redesign has come. 