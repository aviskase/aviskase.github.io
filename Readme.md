This repository is the source code of the personnal website [aviskase.github.io](aviskase.github.io), built with *Jekyll*.

In its current stage it is mostly based on [sylvaindurand.org](https://sylvaindurand.org) blog (check it, it's awesome!).

I don't like ruby so building is done with docker:

```
docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll   -it -p 127.0.0.1:4000:4000 jekyll/jekyll
```
