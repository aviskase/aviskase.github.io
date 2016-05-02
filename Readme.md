#aviskase.github.io [![Build Status](https://travis-ci.org/aviskase/aviskase.github.io.svg?branch=master)](https://travis-ci.org/aviskase/aviskase.github.io)

This repository is the source code of the personal website [aviskase.github.io](http://aviskase.github.io/), built with *Jekyll*.

Currently it is mostly based on [sylvaindurand.org](https://sylvaindurand.org) blog (check it, it's awesome!).

I don't like ruby so building is done with docker:

```console
docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll -it -p 127.0.0.1:4000:4000 jekyll/jekyll
```

And to build with drafts:
```console
docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll -it -p 127.0.0.1:4000:4000 jekyll/jekyll jekyll serve --drafts
```
