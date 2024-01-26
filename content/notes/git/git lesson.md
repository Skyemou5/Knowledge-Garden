---
title: Git Lesson for Teams
tags:
  - git
  - pipelines
  - coding
---

# Lesson

Start with these lessons:

[Learn Git - Tutorials, Workflows and Commands | Atlassian](https://www.atlassian.com/git)




---

Fixing f***** up main branch and needing to undo the whole project

[[notes/git/more git notes|more git notes]]


---
# git cheatsheet

> a short, non-comprehensive guide to common and useful git commands

## Basics - core workflow for saving local changes and storing them remotely

### top-level / status

> an overview with info, recommendations, etc.

`git status`

### staging

> stage / prepare files for committing

`git add {some_file(s)}`

to add files by name

or

`git add .`

to add all files (recursively) in a directory

### committing

> committing / saving files to (local) repo

`git commit -m "{some_message}"`

provide a short, clear commit message, wrapped in quotes

### pushing

> sending (committed) changes from local repo to remote repo

#### first time

first-time, you must set the upstream branch connection:

`git push -u {remote_name} {branch_to_push}`

for instance:

`git push -u origin main`

then, afterward you can just:

`git push`

### pulling

> applying changes from remote repo to local repo

first:

`git fetch` (to retrieve changes)

then:

`git pull`

### switching branches

> change current branch

`git switch {some_other_branch}`

switch to some other local branch

`git switch origin/{some_other_branch}`

assuming remote is named 'origin', switch to some other *remote* branch

### manipulate branches

`git branch`

> list (local) branches

`git branch --remote`

> list (remote) branches

`git checkout -b {new_branch_name}`

> create a new branch; it will need to be [upstreamed](#first-time) before it can be pushed to remote

`git branch -d {branch_name}` or `git branch -D {branch_name}`

> `-D` will *forcefully* delete the branch

### git merge

`git merge {other_branch}`

> merge (another) branch into current branch

## "Fix / Change" meta - managing issues with ease

### "Hard" fixes

#### (hard) reset

> putting things back exactly as they were at the last commit
>
> <mark>be advised</mark> - anything done since last commit will be gone *irretrievably*!

`git reset --hard`

#### cleaning

> removing untrack files from the working tree

if new unwanted files remain after a reset, or (generally) remain, they can be removed with:

`git clean -f`

as with a reset, this is *not* reversible! perhaps check what will occur first with:

`git clean -n`

#### force pushing

> *forcing* the remote branch of the repo to be identical to the local branch

if you're sure you want to do this, it's:

`git push -f`

#### force pulling

> *forcing* the local branch of the repo to be identical to the remote branch

if you're sure you want to do this, it's:

`git reset --hard origin/{branch_name}`

for instance:

`git reset --hard origin/main`

### "Soft" fixes: fixes with finesse

#### Merge conflict resolution:

> when changes conflict with each other, how to tell git which ones to keep

git will let you know if there are merge conflicts; resolving them is not hard, but it is involved. See [here](https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)

#### (interactive) rebase 

> changing and / or simplifying the commit history

`git rebase -i {commit}`

or

`git rebase -i {commit_shorthand}`

for instance:

`git rebase -i HEAD~2` or `git rebase -i HEAD^^`

> rebase the last two (or any other number of) commits

from here, you'll be presented with menu, read through it, choose with to do with each commit by writing the write word next to it, then save the text file and quit. The rebase will be performed

## 'Messy' meta - allowing and managing messiness

### stashing

Sometimes we make changes we want to discard, but *keep* for later, in case we want to look at them again, incorporate them later, etc.

*git stash* allows us to 'stash' these local changes away without losing them, despite them not being committed

---

`git stash`

> stash local changes, return working tree to how it was at last commit

`git stash list`

> see all the stash entries that could be (re)-applied

`git stash apply stash@{N}`

> apply (restore) what's in stash entry `N`, where `N` is a number

### reverting

like stashing, but for things *we've already committed*:

`git revert {some_commit}`

> revert a commit; this will create *another* commit that undoes *that* commit, but keeps it in our history; we'll still be able to look at that code later if we wish, but it we not be in our codebase state

## Analysis - comparing changes

### diffing

`git diff`

> if you have uncommitted and unstaged changes, show the difference between them at the last time you committed

`git diff --staged`

> same as above, but for *staged* files

`git diff {some_commit} {some_other_commit}`

> compare two commits (note that one or either can also be *branches*, since a branch is a commit)
>
> note also that neither needs to be local or remote; flexibility is afforded here

### git-delta - better diffing

allows for cleaner, clearer, more colorful output when you run `git diff *` commands. Check it's [repo](https://github.com/dandavison/delta) for more info

## Collaboration

workflow is:

- each collaborator makes their own (local) branch of `main`, then writes their changes and pushes to remote
- collaborator makes a 'pull request', asking that the owner of the repository (i.e. 'group leader') will 'pull' this changes / incorporate them into the `main` branch
- the repo owner inspects and (approves) the pull request; collaborator code is incorporate into `main` branch

> note that making and accepting a pull request are done differently per-platform; for github, see:

https://docs.github.com/en/pull-requests

particularly:

- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request