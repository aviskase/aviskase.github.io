---
title: "Blog Redesign: Phase 1"
date: 2020-10-18T17:06:15-04:00
draft: false
---


[After migrating to Hugo]({{<ref 2020-10-04-from-pelican-to-hugo>}}), I decided to do a redesign to freshen up colors and introduce [Hugo Pipes](https://gohugo.io/hugo-pipes/).

*Oh boi.* First phase took the entire week. 

## Planning

For planning and progress tracking, I used [a GitHub project](https://github.com/aviskase/aviskase.github.io/projects/1). This is a basic Kanban board with two "To do" columns per phase. The first phase was about making a base dirty skeleton, whereas the second phase will add bells and whistles.

GitHub project's cards can have automated transitions between columns, for example, if you close the issue, it will go to "Done." Unfortunately, when you work from branch, issues won't be closed by commits until you merge the develop branch in to the main one. In my case the main branch is used for output hosting, so redesign branch won't be merged there, thus, I had to close issues by hand. Meh.

## R&D

From the Hugo docs I learned about [Tailwind CSS](https://tailwindcss.com/) and [PostCSS](https://postcss.org/). Tailwind CSS is kinda like Bootstrap, but without imposed styling; basically, a Lego constructor of utility classes. PostCSS is a tool for transforming CSS with various plugins like LESS/Sass-style syntaxes, autoprefixer, purger, etc. [This repo](https://github.com/diegosanchezp/blog-portfolio) and [this one](https://github.com/leonardofaria/bento) show how to integrate those tools into Hugo.

Design inspiration came when I stumbled upon [Joshua Comeau's blog](https://joshwcomeau.com/). Yeah, I've imitated *a lot* of its typography and color choices xD It also provided some tutorials, for example, [how to style ordered lists](https://joshwcomeau.com/css/styling-ordered-lists-with-css-counters/). I spent some time trying to find a similar free humanist sans-serif font, [Nunito](https://fonts.google.com/specimen/Nunito) seems close, readable, and has Cyrillic characters (just in case). As for a monospaced font, the choice was obvious: [JetBrains Mono](https://www.jetbrains.com/lp/mono/).

Tailwind CSS has [a plugin for typography](https://tailwindcss-typography.netlify.app/); I didn't use it, but copied `18rem` based margins, line-heights, and font sizes for some elements. 

For layout I used `grid` and `flexbox`. Last time I did any CSS these two weren't a common thing; you had to do a million of `div`'s with `float`'s and other weird things. I also wanted to use `grid` for minor bleeding elements [how it was described here](https://joshwcomeau.com/css/full-bleed/), but I didn't like the result: vertical margins don't collapse when you apply grid to child elements.


{{<note title="">}}
BTW, [raindrop.io](https://raindrop.io/) helped tremendously with gathering links and sources. I completely migrated there from [Pocket](http://getpocket.com/). 

It has a similar "save for later" experience, but also supports collections and comments. For example, for this project I created a collection "blog redesign" and added a comment for each link saved there to remember later why it was saved in the first place.
{{</note>}}

Additional resources:

- [SVG icons](https://iconsvg.xyz/)
- [Tool for checking color palette's accessibility](https://toolness.github.io/accessible-color-matrix/)
- [Use `em` for media queries and `rem` for everything else](https://stackoverflow.com/questions/11799236/should-i-use-px-or-rem-value-units-in-my-css/43131958#43131958)
- [`px` to `em`/`rem` converter](http://pxtoem.com/)


## Next steps

Basic sections for next work are:

- Bringing back old features: external vs. internal links, older/newer links.
- New features: dark theme, automatic generation of Open Graph image, header-level links.
- Cleaning up: splitting CSS into components, using plugin for `font-face` generation, gathering all hard-coded values into variables.
- Fixing bugs: display of `code` elements in links and headers (yup, you can spot it in this article) and others.

I also think about ditching Tailwind CSS at this point. It's great for rapid prototyping, but it quickly became a mess of styling split between inline classes and the style sheet.

And one more thing. I no longer like the selected color palette, lol. Links are too bright, block quotes are weird, the header is too cheesy. People say there are 2 hard problems in computer science: cache invalidation, naming things, and off-by-1 errors. I think "choosing colors" is the "naming" equivalent in design.