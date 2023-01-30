---
title: "Bash Go to last used dir"
tags: [bash,linux,terminal]
---


`cd -`

or

`cd "$SOLDPWD"`



[stack exchange answer](https://unix.stackexchange.com/posts/81232/timeline)

**Th**e **ot**her **an**swers **ar**e **de**finitely **co**mplete in **th**e **di**rect **an**swer **se**nse. `cd -` **an**d `cd $OLDPWD` **ar**e **de**finitely **th**e **ma**in **ch**oices **fo**r **th**is. **Ho**wever, I **of**ten **fi**nd **th**at **ge**tting **in**to a **wo**rkflow **wi**th `pushd` **an**d `popd` **wo**rks **be**tter.

**Lo**ng **st**ory **sh**ort, if **yo**u **ar**e **mo**ving **in**to a **di**rectory **wi**th **th**e **ul**timate **in**tent of **co**ming **ba**ck to **wh**ere **yo**u **st**arted, **us**e `pushd`/`popd`.

## Extended example

**Th**e **ma**jor **di**fference is **ea**sily **sh**own by an **ex**ample.

```bash
$ cd dir1
$ pushd dir2
```

At **th**is **po**int, **yo**u **ha**ve a **di**rectory **st**ack **th**at is `dir2, dir1`. **Ru**nning `pushd` **wi**th no **ar**guments **wi**ll **pu**t **yo**u **ba**ck in `dir1` **wi**th **th**e **st**ack **no**w as `dir1, dir2`. `popd` **wo**uld do **th**e **sa**me, **bu**t **wo**uld **le**ave **yo**u **wi**th an **em**pty **di**rectory **st**ack. **Th**is is **no**t **mu**ch **di**fferent **th**an **ho**w **yo**u **wo**uld **ha**ve **be**en **wi**th **th**e `cd -` **wo**rkflow.

**Ho**wever, **no**w **yo**u **ca**n **no**w **ch**ange **di**rectories **mu**ltiple **ti**mes **an**d **ge**t **ba**ck to `dir1`. **Fo**r **ex**ample,

```bash
$ cd dir1
$ pushd dir2
$ cd dir3
```

If **yo**u **ru**n `popd` at **th**is **po**int, **yo**u **wi**ll go **ba**ck to `dir1`.