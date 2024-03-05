---
title: "Hugo Notes"
tags: [hugo,web-dev]
---


# HUGO 

https://marco.kamner.eu/notes/technology/obsidian/publish-obsidian-to-personal-site/ 

https://www.youtube.com/watch?v=c7vpcqA6SEQ decent hugo guide

these need to be in .bashrc
```
export PATH=$PATH:/usr/local/go/bin
export GOPATH=/home/skye/go
export PATH=$GOPATH/bin:$PATH

```
- linux 
static site generator
might need to download the latest deb from the repo for latest version

needs brew to install

https://discourse.gohugo.io/t/quartz-urls-spaces-hyphens-relative-path-problem-replace-not-working-on-index/35268/21
quarts discussion

use this 
https://stackoverflow.com/questions/33353618/can-i-use-homebrew-on-ubuntu/56982151

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"

export brew=/home/linuxbrew/.linuxbrew/bin

test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)

test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)

test -r ~/.profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile     // for ubuntu and debian
```

https://www.howtogeek.com/683199/how-to-use-the-hugo-static-site-generator-on-linux/
- actually use the above, no need for brew use apt

https://github.com/khalednassar/obyde - obsidian to hugo

https://www.ernestchiang.com/en/posts/2021/my-hugo-workflow/

https://www.youtube.com/watch?v=A6xpOpKBZ2k guide for hugo with markdown

---

