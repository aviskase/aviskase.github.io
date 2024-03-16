---
date: "2024-03-16T14:35:00"
draft: false
title: "Goodbye, `og:image`"
---

When you see a link on almost all social platforms or messengers, you usually see a card preview with a title, an almost invisible summary, and an image. These cards are generated based on twitter and Open Graph HTML tags that look something like this:

``` html
<meta property="og:url" content="<url>">
<meta property="og:title" content="<title>">
<meta property="og:description" content="<description>">
<meta property="og:image" content="<link>">

<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="<url>">
<meta name="twitter:title" content="<title>">
<meta name="twitter:description" content="<description>">
<meta name="twitter:image" content="<link>">
```

See those image properties? Per specifications they are **required**. The minimum size is 200×200 pixels; the recommended size is 1200×630 pixels.

The goal is to have a nice link preview. Fine. If the article already has a relevant image, why not? The problem is, not all articles have them, so people improvise:

- Find some semi-relevant stock image.
- Ask somebody to create one. That's for fancy websites.
- Generate image using Midjourney or whatever "AI" you prefer.
- Generate image using article title (I used to do that).

First three are eye candy solutions. Last one is basically duplicating already displayed information.

So, we are trying to conform to some arbitrary standards imposed by social media platforms. These images are there to drive engagement. To be attention grabs. And no one likes to read nowadays, right? Thus, one could argue that continuing this practice is in the best interest of content creators. However, if this is the goal...

Boobs. Just make an image with the boobs. You can even add some article-relevant background. If you're creating the image solely because "Facebook says so", why limit yourself to half-measures? Drive your SEO by ░C░O░N░T░E░N░T░ ░I░N░ ░B░I░O░.

------------------------------------------------------------------------

Anyway, yeah, no Open Graph images here anymore.
