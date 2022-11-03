---
title: "Bash Rename Files"
tags: [bash,unix,linux,snippets]
---

# bash rename
 
 ```bash
 rename s/(^0\d)/Something$1/ *.txt
 ```

[10:07 PM]
the parentheses mean 'find this pattern and store it' (edited)
[10:08 PM]
then, replace it with 'Something', and retrieve the stored value again with $1
NEW
[10:09 PM]
for adding something to the beginning of files, it's obviously overkill. but over time the usefulness becomes more apparent. find files based on a really complex regular expression and then rename them in some very specific way, etc...
[10:10 PM]
i'm still a RegEx novice, but i use them quite a bit for odd things here and there, and they're great. they're the foundation of pattern matching in Linux and knowing them means being able to do tons of things with a terminal that other people would need a messy GUI app for
[10:11 PM]
oh and for rename you can pass the -n flag i believe to see what it will do without doing it. a dry run

small correction to the above - to be parsed correctly, the perl expression should be in quotes
[10:17 PM]

```
rename  's/(^0\d)/Something$1/' *.txt 
```
