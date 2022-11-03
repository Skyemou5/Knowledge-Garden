---
title: "Check if Env Var Exists"
tags: [bash,linux,snippets]
---


```bash
if [[ -z "${DEPLOY_ENV}" ]]; then
  MY_SCRIPT_VARIABLE="Some default value because DEPLOY_ENV is undefined"
else
  MY_SCRIPT_VARIABLE="${DEPLOY_ENV}"
fi

# or using a short-hand version

[[ -z "${DEPLOY_ENV}" ]] && MyVar='default' || MyVar="${DEPLOY_ENV}"

# or even shorter use

MyVar="${DEPLOY_ENV:-default_value}"
```