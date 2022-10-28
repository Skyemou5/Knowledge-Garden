---
tags: [webclipper rust programming article]
title: "Rust project structure step by step"
---

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#introduction)Introduction

**Th**e **re**cent, **ho**pefully **te**mporal, **de**ath of **Ac**tix-**we**b **fo**rced me to **re**check **so**me **co**de of a **pe**t **pr**oject of **mi**ne **th**at **wa**s **no**t **cl**eanly **de**coupled, **so**me of my **Di**esel **wa**s **mi**xed **wi**th my **Ac**tix, so I **wi**ll **sh**are **th**e **pr**ocess **an**d **st**ages of **de**composition in **Ru**st.

**Th**is is **th**oroughly **ex**plained in **Th**e **Bo**ok, **bu**t I'll **tr**y to **ma**ke it **mo**re **co**ncise **an**d **si**mple, I'll **sk**ip **ma**ny **de**tails in **fa**vor of **cl**arity **an**d of **co**urse **th**e **co**de **it**self is **no**t **us**eful, **it**s **on**ly **pu**rpose is to **sh**ow as **si**mple as I **co**uld, **th**e **pr**ocess **st**ep by **st**ep. I **ho**pe is **he**lpful.

**I also uploaded a repo in github ([https://github.com/robertorojasr/rust-split-example](https://github.com/robertorojasr/rust-split-example)), if you clone it, each commit is another step in the process. And unlike this example, it runs (doesn't do much but runs)**

**Th**is **ev**olution **sh**ould **lo**ok **li**ke **th**is:

1.  Single file with everything on it.
2.  Move part of your code to a different module. (this step is missing in the repo, I forgot, sue me), please don't sue me.
3.  Move the module to a different file.
4.  Turn the module in a single file into a folder acting as a module with multiple files as sub-modules.
5.  Split your crate in a library and an executable that lives in the same directory tree.
6.  Move the executable and library to different crates (workspaces) with their own directory tree.

**Wh**en **ou**r **pr**oject **ge**ts **bi**gger **an**d **mo**re **co**mplex **th**is **st**rategies **wi**ll **he**lp to **ke**ep **th**e **ov**erall **st**ructure of **yo**ur **co**de **ma**nageable, **cl**ear **an**d **de**coupled.

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#0-starting-point)0\. Starting point

So **yo**u **ma**ke **yo**u "**He**llo **Wo**rld" **an**d **ev**erything is **co**ol, **yo**u **re**place **th**at **pr**intln **an**d **st**art **co**ding, **so**on **yo**u **no**tice **yo**ur **lo**vely **ma**in.rs is **ge**tting **bi**gger, **fi**lled **wi**th **st**ructs, **fu**nctions **an**d **tr**aits, **so**me of **th**em **ar**e **li**nk to **ea**ch **ot**her **bu**t **so**me **ar**e **no**t, **li**ke **Ne**o **wa**tching **th**e **Ma**trix **yo**u **st**art to **se**e **so**me **ma**cro-**st**ructure **an**d **yo**u **te**ll to **yo**urself, "**my**self, is **ti**me to **ti**de **th**is **me**ss", of **co**urse **yo**u **co**uld **de**sign **al**l **be**fore **yo**u **st**art, (**yo**u **sh**ould **ac**tually), **bu**t **yo**u **wa**nt **av**oid **ov**erengineering **an**d as **th**is **po**st **sh**ows (at **le**ast **ho**pes to) is **no**t **ne**cessary to **ta**ke **th**e **bi**g **gu**ns **fr**om **th**e **st**art.

**Le**ts **sa**y **th**is is **yo**ur **cu**rrent **ma**sterpiece, **im**pressive, I **kn**ow, I **di**d it **al**l by **my**self.  

```rust
// src/main.rs

struct A {
    a: i32,
}

struct B {
    b: i32,
}

fn main() {
    let first = A { a: 42, };
}

```

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#1-a-module)1\. A module

So **ho**w do **yo**u **st**art?, **th**e **fi**rst **th**ing **wo**uld be **ma**ke **mo**dules to **en**capsulate **so**me **co**de  

```rust
// src/main.rs

mod something {
    struct A {
        a: i32,
    }

    struct B {
        b: i32,
    }
}

fn main() {
    let first = A { a: 42, };
}

```

**bu**t **no**w **th**ere is a **pr**oblem, **ev**en **th**o _A_ is **de**fined in **th**e **sa**me **fi**le, is no **lo**nger in **th**e **sa**me **mo**dule, so _**ma**in()_ **ha**ve no **id**ea _**so**mething_ is in **th**ere, so we **ha**ve to **im**port _**so**mething_  

```rust
// src/main.rs 

mod something {
    struct A {
        a: i32,
    }

    struct B {
        b: i32,
    }
}

use crate::something::*; // <- this is new

fn main() {
    let first = A { a: 42, };
}

```

**No**w _**ma**in()_ **kn**ows **th**at _**so**mething_ is **he**re **an**d **th**at it **ca**n **us**e **ev**erything **pu**blic in **th**ere, **bu**t **wa**it, **th**ere is **no**thing **pu**blic in **th**ere, so we **ha**ve to **ma**ke **pu**blic **wh**atever we **wa**nt to **ma**ke **vi**sible to _**ma**in()_.  

```rust
// src/main.rs 

mod something {
    pub struct A { // <- this is new
        pub a: i32, // <- this is new
    }

    pub struct B {
        pub b: i32, // <- this is new
    }
}

use crate::something::*;

fn main() {
    let first = A { a: 42, };
}

```

**No**w _**ma**in()_ **ca**n **se**e **ev**erything **in**side, of **co**urse **yo**u **do**n't **ha**ve to **ma**ke **al**l **pu**blic, **ju**st **wh**at **yo**u **ne**ed, **an**d **sp**are me **th**e **OO**P **ar**gument **th**at **yo**u **sh**ouldn't **ex**pose **da**ta, is **ju**st an **ex**ample **he**re, **an**d **OO**P is **no**t **al**l **th**ere is **BT**W (a **bi**t of **sa**ss **he**re).

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#2-a-module-in-other-file)2\. A module in other file

**Bu**t **th**at **do**esn't **so**lve **th**e **fa**ct **th**at **yo**ur **ID**E **ge**ts **la**ggy **wi**th **yo**ur **st**ill **hu**ge **fi**le, in **fa**ct **yo**u **ju**st **ad**ded **mo**re **st**uff!, to **so**lve **th**is **yo**u **sh**ould **st**art **us**ing **Vi**m... I **jo**king... (Am I?)

So **no**w **yo**u **wa**nt to **mo**ve **th**at **mo**dule **ou**tside, to **ot**her **fi**le, to **li**ve **fr**ee **an**d **al**one.

So **yo**u **ke**ep **th**e **de**finition **an**d **th**e **im**port in **main.rs**  

```rust
// src/main.rs

mod something;
// the content of the module was here

use crate::something::*;

fn main() {
    let first = A { a: 42, };
}

```

**an**d **pu**t **th**e **mo**dule **co**ntent in **yo**ur **fr**eshly **ma**de **ne**w **fi**le in **th**e **sa**me **fo**lder as **main.rs**  

```rust
// src/something.rs 

pub struct A {
    pub a: i32,
}

pub struct B {
    pub b: i32,
}

```

**Wh**en **yo**u **ad**ded **th**e **mo**dule **so**mething in **main.rs**  

```rust
// src/main.rs

mod something;

// the rest of it
```

**Ru**st **au**tomagically **lo**oks **fo**r it **in**side **th**e **fi**le, if **do**esn't **fi**nd it, **lo**oks **fo**r a **fi**le **wi**th **th**e **mo**dule **na**me in **th**e **sa**me **fo**lder (in **th**is **ca**se **sr**c/) **an**d if **st**ill **do**esn't **fi**nd it **lo**oks **fo**r a **fo**lder **wi**th **th**e **mo**dule **na**me **an**d a **fi**le **mod.rs** **in**side, **th**ere it **lo**oks **fo**r **th**e **co**de.

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#3-a-module-in-a-folder-with-many-submodules)3\. A module in a folder with many submodules

As **me**ntioned in **th**e **la**st **pa**ragraph, we **ca**n **sp**lit **ev**en **mo**re **ou**r **mo**dule,  
**al**l we **ha**ve to do is **ma**ke a **fo**lder **something** so we **ge**t:  

```
src/
 |_ main.rs
 |_ something.rs
 |_ something/

```

**No**w, we **co**uld **ju**st **re**name **something.rs** as **mod.rs** **an**d **mo**ve it **in**side **something/** **bu**t **wh**at's **th**e **po**int in **th**at, we **wa**nt to **sp**lit **th**ings!, so we **ar**e **go**nna **gi**ve _A_ **an**d _B_, (**pl**ease **do**n't **na**me **yo**ur **st**uff **li**ke **th**at **ou**tside **ex**amples **li**ke **th**is) **th**eir **ow**n **mo**dules. So we'll **ha**ve **th**is **tr**ee  

```rust
src/
 |_ main.rs
 |_ something/
     |_ mod.rs
     |_ a.rs
     |_ b.rs

```

**Bu**t **wh**at **ha**ppen **wi**th **something.rs**, **we**ll my **fr**iend, **yo**u **sp**lit it, _A_ **go**es to **a.rs** **an**d **yo**u **ca**n **gu**ess **wh**ere _B_ **we**nt.

**No**w _A_ **an**d _B_ **ar**e in **th**eir **ow**n **mo**dules so we **mo**dify **th**e **im**ports **ac**cordingly  

```rust
// src/main.rs

use crate::something::a::*; // <- this is new
use crate::something::b::*; // <- this is new

fn main() {
    let first = A { a: 42, };
}

```

**Bu**t **mod.rs** **ha**s **no**w **th**e **re**sponsibility to **ca**ll **th**eir **ch**ildren, as I **to**ld **be**fore, **wh**en **Ru**st **ch**eck **fo**r **something.rs** **an**d **do**esn't **fi**nd it **wi**ll **ch**eck **fo**r **th**e **fo**lder **something** **an**d **th**en **in**side **lo**ok **fo**r a **fi**le **na**med **mod.rs**.  

```rust
// src/something/mod.rs

pub mod a;
pub mod b;

```

**Yo**u **ma**y **no**tice **th**at **th**is is **th**e **sa**me **th**ing we **di**d **wi**th **ma**in at **fi**rst. **Yo**u **ca**n **ke**ep **ne**sting **mo**dules as **lo**ng as **yo**u **li**ke, **ju**st **li**ke **th**at.  

```rust
// src/something/a.rs

pub struct A {
    pub a: i32,
}

```

```rust
// src/something/b.rs

pub struct B {
    pub b: i32,
}

```

**Fi**ne **an**d **da**ndy, **bu**t **no**w **wh**at? **wh**at if my **pr**oject is a **hu**ge **be**ast, **wh**at if I **co**uld **re**use **so**me of **th**e **co**de, **le**t's **sa**y. **Yo**u **ha**d a **ni**ce **we**bapp **wi**th **Di**esel **OR**M **an**d **Ac**tix-**we**b on **to**p, **wh**at is **so**me **da**y, **le**t **sa**y **Ac**tix **cr**eator **le**aves **an**d it's **fu**ture is **un**certain, **wh**at **th**en **hu**h?, **wh**at **th**en?!

...

**We**ll, **yo**u **co**uld **se**e **yo**ur **we**bapp as a **li**brary **th**at **de**als **wi**th **th**e DB, **le**ts **sa**y **wi**th **Di**esel **an**d a **se**parate **co**nsumer in an **ex**ecutable **wi**th **Ac**tix-**we**b or **ot**her **fr**amework **th**at is **no**t **ap**parently **de**ad, **bu**t **ma**ybe **co**mes **ba**ck ...

**Yo**u **co**uld **al**so **ma**ke a **CL**I UI **fo**r **ex**ample **th**at **wi**ll **us**e **th**e **sa**me DB **re**lated **co**debase. **Le**ts do it!

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#4-rust-library-with-an-executable-file)4\. Rust library with an executable file

As **yo**u **ma**y **ha**ve **re**ad **an**d **sk**ip to **mo**re **fu**n **st**uff, **Ru**st **re**cognize 2 **ki**nds of **cr**ates (**th**e **of**ficial **na**me of **wh**at I've **be**en **ca**lling **pr**oject, **ju**st **be**cause I'm a **re**bel) **li**braries **an**d **ex**ecutables, **yo**u **pr**obably **kn**ow **th**e **di**fference **bu**t **fo**r **co**mpletion **le**t **pu**t it **si**mple, an **ex**ecutable is **so**mething **yo**u **us**e **di**rectly **an**d a **li**brary is **so**mething **th**at is **us**ed by an **ex**ecutable.

**Wh**at we **wa**nt in **th**is **ca**se is to **pu**t **ou**r _**ma**in()_ in **an**other **fi**le as an **ex**ecutable **an**d **le**ave **al**l of **ou**r **st**ructs in a **li**brary **fo**r **fu**ture **re**use in **ot**her **ex**ecutables.

**Ru**st **tr**ies **re**ally **ha**rd to **ma**ke **th**ings **ea**sy (**be**cause it **fe**els **gu**ilty **fo**r **al**l **th**e **su**ffering **wi**th **bu**rrows **an**d **li**fetimes) so to **ma**ke a **cr**ate a **li**b **yo**u **ju**st **re**name **th**e **fi**le **main.rs** to **lib.rs**, **vo**ilá, **no**w is a **li**brary, **bu**t **le**ts **ma**ke **so**mething **us**eful **wi**th it, to do **th**at, we'll **ma**ke a **ne**w **fo**lder **bin/** **an**d we **wi**ll **co**py **ou**r **ex**isting **main.rs**, (**no**w **re**named **lib.rs**) on it **wi**th **so**me **fa**ncy **an**d **de**scriptive **na**me, **le**aving **yo**u **wi**th **th**is **ne**w **tr**ee:  

```rust
src/
 |_ lib.rs // <- just a renamed main.rs
 |_ bin/ // <- this folder is new
 |_  |_ framework_that_broke_my_heart.rs // <- a copy of our ex-main.rs
 |_ something/
     |_ mod.rs
     |_ a.rs
     |_ b.rs   

```

so, **ev**erything **in**side **something/** **wi**ll be **un**touched **no**w, **fi**rst we'll **wo**rk in **framework\_that\_broke\_my\_heart.rs**. **Th**e **fi**rst **th**ing **wi**ll **no**tice is **th**at **ev**erything **in**side **bin/** is in a **bu**bble **un**iverse, **ev**en **th**o is **in**side **ou**r **cr**ate is **no**t **pa**rt of it **an**ymore, **th**ink it **li**ke us **an**d **so**ciety (**no**t **yo**u, **we**ll **ad**justed **pr**ogrammers..**ug**h), so we **ha**ve to **ca**ll **ou**r **ne**wly **cr**eated **li**brary (**yo**u **kn**ow, **wh**en we **re**named **main.rs** to **lib.rs**) **ju**st as we **wh**ere **ca**lling **an**y **li**brary.  

```rust
// src/bin/framework_that_broke_my_heart.rs

extern crate this_example; // oh right, I never named
// this crate, is the name you give in Cargo.toml
// under [package] in tha *name* field
// (don't use dashes on it)

use crate::something::a::*;
use crate::something::b::*;

fn main() {
    let first = A { a: 42, };
}

```

**an**d in **lib.rs** ex-**ma**in.rs  

```rust
// src/lib.rs

pub mod something; // <- this is all, is like telling Rust
// copy/paste everything inside `something` inside a `mod` here

```

**Ev**erything **in**side **so**mething is **un**touched.

We **ar**e **cl**ose to **th**e **fi**nish **li**ne, by **no**w **yo**u **ma**y **ha**ve **wo**ndered **ab**out **th**e **si**tuation of **th**at **po**or **fe**llow **wh**ose **he**art **wa**s **br**oken by **th**e **ea**rly **de**mise of **hi**s **fa**vorite **fr**amework, **an**d **te**lling **yo**urself, **ho**w **th**e F\* **di**d he **pu**t **al**l **hi**s **Ac**tix-**we**b **co**de **in**side a **ti**ny **li**ttle **fi**le, **th**at **fi**le **mu**st be **hu**ge, a **hu**ge **me**ss, **bu**t **th**e **wh**ole **id**ea **wa**s to **sp**lit **th**ings **an**d he **ju**st **ma**de **ev**erything **wo**rse!, **we**ll my **fe**llow, **th**is is **wh**en **th**e **ne**xt **po**int **co**mes.

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#5-workspaces)5\. Workspaces

**Th**is **tu**rns **yo**u **cr**ate in **sm**aller **cr**ates **in**side a **bi**g **cr**ate-**is**h **um**brella, **yo**u **co**uld **ju**st **sp**lit **yo**ur **co**de in 2 **cr**ates by **no**w, **af**ter **al**l, we **cl**aimed **th**at **th**e **ex**ecutable in **th**e **la**ter **st**ep **wa**s **al**ready **no**t **pa**rt of **th**e **or**iginal **cr**ate **an**d **th**at's **ri**ght. **Sp**liting **en**tirely **th**e **co**de in 2 **se**parate **cr**ates is a **va**lid **ch**oice, **bu**t **ma**ny of **th**e **de**pendencies **ar**e **co**mmon to **bo**th: **th**e **ex**ecutable **an**d **th**e **li**brary; **an**d it **wo**uld be **an**noying to **re**build 2 **ti**mes, **te**st 2 **ti**mes, **et**c. If **bo**th **th**e **li**brary(es) **an**d **ex**ecutable(s) **ar**e **re**lated to **ea**ch **ot**her, **yo**u **ma**y **wa**nt to **tr**eat **th**em as 1 **th**ing **fo**r **bu**ilding/**te**sting/**ru**nning **pu**rposes, **yo**u **ma**y **al**so **ke**ep **th**em **bo**th in **th**e **sa**me **re**po.

**Th**is **on**e is **go**nna **ge**t a **bi**t **mo**re **co**mplicated **bu**t **no**t **mu**ch.

We **ar**e **go**nna **ma**ke 2 **cr**ates **in**side **ou**r **or**iginal **on**e **an**d **gl**ue **th**em **to**gether.

So we **ha**d **th**is **be**auty:  

```rust
./
 |_Cargo.toml
 |_Cargo.lock
 |_target/
 | |_ ... // we don't care about this, is made in the building process
 |
 |_src/
   |_ lib.rs
   |_ bin/
   |_  |_ framework_that_broke_my_heart.rs
   |_ something/
       |_ mod.rs
       |_ a.rs
       |_ b.rs   

```

**Si**tting in ./ **ju**st **ne**xt to **th**e "**Ca**rgos" we **ju**st **ma**ke **tw**o **ne**w **cr**ates.  

```rust
$ cargo init --lib db_stuff
$ cargo init ftbmh // framework_that_broke_my_heart, too long,
// too lazy, again, this is an example, name your thing with
// common sense, don't be // funny in a real project, the fun
// will last about 10min, the pain much // more than that.

```

**Th**e **ar**gument --**li**b **th**e **on**ly **th**ink it **do**es, is **in**stead to **ma**ke a **main.rs** **ma**kes a **lib.rs**, by **de**fault **ma**kes a **ex**ecutable.

So we **wi**ll **ge**t:  

```rust
./
 |_Cargo.toml
 |_Cargo.lock
 |_target/
 | |_ ...
 |
 |_src/
 |  |_ lib.rs
 |  |_ bin/
 |  |_  |_ framework_that_broke_my_heart.rs
 |  |_ something/
 |      |_ mod.rs
 |      |_ a.rs
 |      |_ b.rs
 |
 | // ^ that's the old part
 |
 |_db_stuff/    // this whole folder is new
 |   |_Cargo.toml
 |   |_src/
 |      |_ lib.rs // <- that's all the --lib does
 |_ftbmh/      // this whole folder is new
     |_Cargo.toml
     |_src/
        |_ main.rs

```

**No**w, **fr**om **th**e **or**iginal **Cargo.toml** we **wi**ll **mo**ve **th**e **pa**rts as **ne**cessary to **th**e **ne**w **Cargo.toml**, **fo**r **ex**ample **th**e **de**pendencies to **wh**oever **ne**eds **th**em.

**Wh**en **yo**u **ar**e **do**ne **wi**th **th**at, **ju**st **cl**ean **yo**u **go**od **ol**d **Cargo.toml** **an**d **ju**st **pu**t **th**is:  

```rust
[workspace]
members = ["db_stuff", "ftbmh"]
```

**Th**at's it, **no**w **th**e **or**iginal **Cargo.toml** **do**esn't **ha**ve a \[**pa**ckage\] or \[**de**pendencies\] **se**ction; **th**e **or**iginal **cr**ate is **no**w a **sh**ell.

**Wh**en **yo**u **ma**de **th**e 2 **cr**ates **in**side (_dn\_**st**uff_ **an**d _**ft**bmh_) **ca**rgo **sa**w **th**at **yo**u **wh**ere **in**side an **ex**isting **cr**ate **wi**th **it**s **ow**n **gi**t **re**po so **di**dn't **ma**de **on**e **fo**r **th**em, **yo**ur **ol**d **re**po is **st**ill **go**od **an**d **he**althy.

**No**w **re**member **th**at **yo**u **sp**lited **yo**ur **co**de **an**d **pr**obably **on**e **pa**rt **de**pends on **ot**hers, in **th**is **ca**se _**ft**bmh_ **de**pends on _db\_**st**uff_ so we **ha**ve to **ad**d **th**at **de**pendency in **th**e _**ft**bmh_ **Cargo.toml** **fi**le  

```rust
// ftbmh/Cargo.tom

[package]
// your stuff

[dependencies]
// your dependencies
db_stuff = { path = "../db_stuff" } // as you may know the `..`
// in the path refers to the mother folder of the current one

```

**ftbmh/main.rs** **al**ready **wa**s **ou**tside **th**e **or**iginal **cr**ate as **yo**u **ma**y **re**member **fr**om **th**e **la**st **st**ep, so it's **al**l **do**ne **th**ere **an**d **th**e **cr**ate db\_**st**uff **wa**s **us**ed as an **ex**ternal **cr**ate **al**ready so **ev**erything is **th**e **sa**me **th**ere **to**o.

## [](https://dev.to/ghost/rust-project-structure-example-step-by-step-3ee#conclusion)Conclusion

We **ar**e **do**ne. **Wh**at **st**arted as a **si**mple **si**ngle **fi**le **pr**oject is **no**w a **co**mplex **cr**ate **wi**th 2 **wo**rkspaces, of **co**urse **th**ose **co**uld be 3 or 100, **ju**st **ri**nse **an**d **re**peat **an**d **th**e **sa**me **fo**r **mo**dules **th**at **ar**e **th**e **na**mespaces of **Ru**st.

As **yo**u **ca**n **se**e, if **yo**ur **co**de is **pr**operly **de**coupled, **th**e **wh**ole **pr**ocess is **ve**ry **un**obtrusive, of **co**urse is **go**od to **ha**ve **th**e **de**sign **pl**anned **fr**om **th**e **st**art, **bu**t **so**metimes **pr**ojects **gr**ow **mo**re **th**an we **th**ought, **th**ey **ge**t **mo**re **co**mplex **an**d is **go**od to **ha**ve **wa**ys to **ea**sily **ad**apt it **wi**thout **ma**king a **me**ss, is **al**so **go**od **be**cause **yo**u **do**n't **ne**ed to **ov**er **en**gineer **yo**ur **so**lution **af**raid of a **fu**ture **op**erations **li**ke **th**e **on**e **ex**posed **he**re. **Yo**u **ca**n **gr**ow **yo**ur **co**de **or**ganically.

I **ho**pe **th**is **he**lp **so**meone, **th**ere is **no**thing **ne**w **he**re, **bu**t I **fo**und **th**at it **wa**s **to**o **di**sperse in **th**e **do**cumentation **an**d **bo**oks. **Th**ere is a **lo**t **mo**re of it, I **di**dn't **ta**lk **mu**ch **ab**out **th**e **pu**blic/**pr**ivate **an**d **wh**at is **vi**sible **fo**r **wh**om by **de**fault, **th**at is **ve**ry **we**ll **ex**plained in **bo**th **The Book** **an**d **th**e **am**azing **O'Reilly "Programming Rust"**, I **ju**st **tr**ied to **ma**ke a **sc**affold to **ma**ke **ea**sy **ha**nging **th**e **de**tails **la**ter.

**An**y **co**rrections **an**d **su**ggestion, **fe**el **fr**ee to **le**t me **kn**ow **sp**ecially if **so**mething is **we**irdly **wr**itten, **En**glish is **no**t my **na**tive **la**nguage, **th**is is my **be**st **fo**r **no**w.