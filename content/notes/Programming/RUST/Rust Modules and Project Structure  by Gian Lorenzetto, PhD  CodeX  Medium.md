---
tags: [rust development webclipper article]
title: "rust modules and project structure"
---


![](https://miro.medium.com/max/1400/0*canxw_IfsJZStetm)

Photo by [Alain Pham](https://unsplash.com/@alain_pham?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

## Exploring the structure of a Rust project, crates, modules, visibility and what the heck is a prelude!?

In **th**e [first post](https://gian-lorenzetto.medium.com/rust-a-beginner-cheat-sheet-8fd7b0ce49de) of **th**is **se**ries I **di**scussed **ge**tting **Ru**st **in**stalled **an**d **cr**eating **ne**w **pr**ojects **us**ing **th**e _**ca**rgo_ **cl**i **to**ol. In **th**is **po**st I **wa**nt to **ge**t **in**to a **bi**t **mo**re **de**tail **ab**out **th**e **st**ructure of a **Ru**st **pr**oject, **an**d **di**g **in**to **th**e **co**ncept of **cr**ates, **mo**dules **an**d **pr**eludes.

If **yo**u **ha**ven’t, [go get Rust installed](https://gian-lorenzetto.medium.com/rust-a-beginner-cheat-sheet-8fd7b0ce49de) **an**d **ma**ke **su**re **yo**u **ca**n **cr**eate a **ne**w **pr**oject —

`$ cargo new hello_rust`

As a **re**minder, **th**is **wi**ll **cr**eate a **ne**w _**bi**nary **ap**plication_, so **yo**u **ca**n **ru**n **th**is at a **te**rminal **wi**th —

`$ cargo run`

**Yo**u **sh**ould **se**e **ca**rgo **fi**rst **co**mpile **an**d **th**en **ru**n **yo**ur **ap**plication, **wi**th **th**e **fo**llowing **wr**itten to **th**e **co**nsole —

```
$ cargo run“Hello, World!”
```

**Gr**eat! In **th**e **re**st of **th**is **ar**ticle, I’m **go**ing to **di**scuss —

-   The default Rust project structure
-   The _**ma**in.rs_ file
-   Rust _**mo**dules_ (based on files)
-   Rust modules and _**vi**sibility_
-   Rust modules (based on folders)
-   What’s a _**Pr**elude_?

**Fi**rst up, **le**t’s **un**pack **wh**at **yo**u’ve **go**t in **th**e **de**fault **pr**oject.

## The Default Rust Project

**Th**e **de**fault **Ru**st **co**nsole **ap**plication is **pr**etty **ba**sic, **bu**t **th**e **fo**lder **st**ructure is _**in**tentional_ **an**d **sh**ould **no**t be **ch**anged —

```
hello_rust  - src    - main.rs  - .gitignore  - Cargo.toml
```

**No**te **yo**u **ca**n **us**e **th**e `cargo check` **co**mmand to **va**lidate **yo**ur **fo**lder **st**ructure **an**d _**Ca**rgo.**to**ml_ **fi**le at **an**y **ti**me. If **yo**u do **ma**ke a **mi**stake (in **th**is **ca**se I **re**named `src` to `src1`), **Ca**rgo **wi**ll **he**lpfully **te**ll **yo**u **wh**at **yo**u **ne**ed to do —

```
error: failed to parse manifest at `/Users/gian/_working/scratch/hello_rust/Cargo.toml`Caused by: no targets specified in the manifest either src/lib.rs, src/main.rs, a [lib] section, or [[bin]] section must be present
```

In **ou**r **ca**se we **mu**st **ha**ve a `src/main.rs`, **si**nce we **cr**eated a _**bi**nary_ _**ap**plication_. If we **ha**d **cr**eated a **ne**w **li**brary (**pa**ssing `--lib` to **th**e `cargo new` **co**mmand), **th**en **ca**rgo **wo**uld **ha**ve **cr**eated **th**e `src/lib.rs` **fo**r us **in**stead.

**Th**e _**Ca**rgo.**lo**ck_ **fi**le is an **au**tomatically **ge**nerated **fi**le **an**d **sh**ould **no**t be **ed**ited. **Si**nce **Ca**rgo **in**itialises a **Gi**t **re**po **fo**r **yo**u by **de**fault, it **al**so **in**cludes a ._**gi**tignore_, **wi**th **on**e **en**try —

```
/target
```

**Th**e `target` **fo**lder is **au**tomatically **cr**eated on `cargo build` **an**d **co**ntains **th**e **bu**ild _**ar**tefacts_, in a _**de**bug_ or _**re**lease_ **fo**lder (**de**pending on **th**e **bu**ild **co**nfiguration, **re**call **th**at **th**e **de**fault is _**de**bug_).

If **yo**u’re **cr**oss-**co**mpiling to **an**other **pl**atform, **th**en **yo**u **wi**ll **se**e an **ad**ditional **le**vel **sp**ecifying **th**e **ta**rget **pl**atform, **th**en **th**e **bu**ild **co**nfiguration.

**La**stly, **th**ere is **th**e **ma**in.rs **fi**le, **wh**ich is **th**e **en**try **po**int **fo**r **ou**r **ap**plication. **Le**t’s **ta**ke a **cl**ose **lo**ok at it’s **co**ntents.

## The _**ma**in.rs_ file

**Th**e **de**fault _**ma**in.rs_ **fi**le is **qu**ite **st**raight **fo**rward —

```rust
fn main() {  println!("Hello, world!");}
```

We **ha**ve **th**e `main()` **fu**nction, **th**e **ma**in **en**try **po**int **fo**r **ou**r **ap**plication, **wh**ich **ju**st **pr**ints “**He**lo, **Wo**rld!” to **st**andard **ou**tput.

**Yo**u **ma**y **ha**ve **no**ted **th**e `!` in `println!` — **th**is **in**dicates **th**at **th**e `println` **fu**nction is a **Ru**st **ma**cro (an **ad**vanced **Ru**st **sy**ntax **fe**ature) **th**at **yo**u **ca**n **sa**fely **ig**nore **fo**r **th**e **mo**st **pa**rt, **ot**her **th**an to **re**member **th**at it’s **no**t a **re**gular **fu**nction.

**Wh**ile **yo**u **co**uld **no**w **ha**ppily **wr**ite **al**l **yo**ur **Ru**st **co**de in **th**e _**ma**in.rs_ **fi**le, **th**at’s **ge**nerally **no**t **id**eal ;) **Th**at’s **wh**ere **mo**dules **co**me in!

## Modules

**Le**t’s **st**art **of**f by **ad**ding a **st**ruct to **th**e _**ma**in.rs_. We’ll **pr**ogressively **mo**ve **th**is **co**de **fu**rther **fr**om **th**e **ma**in **fi**le, **bu**t **fo**r **no**w **ju**st **ch**ange **yo**ur _**ma**in.rs_ to **lo**ok **li**ke —

```rust
struct MyStruct {}fn main() {  let _ms = MyStruct {};    <-- Note the '_'}
```

**Th**is is **ab**out as **si**mple a **pr**ogram as **yo**u **co**uld **po**ssible **wr**ite, **bu**t it **wi**ll do **ni**cely to **il**lustrate **Ru**st’s **mo**dules. **No**te **th**e `_` **pr**efixing **th**e **va**riable **na**me — **Ru**st **do**esn't **li**ke **un**used **va**riables (**ri**ghtly so!) **bu**t by **us**ing **th**e `_` **pr**efix we’re **te**lling **th**e **co**mpiler **th**is **wa**s **in**tentional **an**d it **wi**ll **pr**event **th**e **co**mpiler **em**itting a **wa**rning. **Th**is is _**no**t_ a **go**od **ex**ample of **wh**en to **us**e **th**is **fe**ature (“**ig**nored” **pa**ttern **ma**tch), **bu**t it **do**es **ha**ve **le**gitimate **us**es in **ot**her **ca**ses.

**No**w, **le**t’s **sa**y **ou**r **co**de is **ge**tting **ou**t of **ha**nd **an**d we **wa**nt to **mo**ve **ou**r **ve**ry **co**mplex **st**ructure **ou**t **in**to **an**other **fi**le. We **wa**nt **ou**r **co**de to be _**lo**osely **co**upled_ **an**d _**hi**ghly **co**hesive_ of **co**urse! So **le**t’s do **th**at **an**d **cr**eate a **ne**w **fi**le **ca**lled _my\_**st**ruct.rs_ —

```rust
hello_rust  - src    - main.rs    - my_struct.rs
```

**No**te **th**at we _**mu**st_ **ad**d **th**e **fi**le **be**low **th**e `src/` **fo**lder **fo**r **th**e **co**mpiler to **fi**nd it. **Wh**ile **th**e **na**me of **fi**le **do**esn’t **re**ally **ma**tter, it’s **id**iomatic **Ru**st to **us**e _**sn**ake\_**ca**se_ so **th**at’s **wh**at we’ll do **he**re.

**Mo**ve **th**e **st**ruct **de**claration **fr**om _**ma**in.rs_ **an**d **pl**ace it **in**to _my\_**st**ruct.rs —_

```
// Contents of my_struct.rsstruct MyStruct {}
```

**Tr**y **bu**ilding **th**e **pr**oject —

`$ cargo build`

If **yo**u **re**moved **th**e **st**ructure **de**claration **fr**om _**ma**in.rs_ **yo**u **wi**ll **se**e an **er**ror **li**ke **th**is —

```
Compiling hello_rust v0.1.0 (/scratch/hello_rust)error[E0422]: cannot find struct, variant or union type `MyStruct` in this scope → src/main.rs:2:15  |2 | let _ms = MyStruct {};  |           ^^^^^^^^ not found in this scopeerror: aborting due to previous errorFor more information about this error, try `rustc — explain E0422`. error: could not compile `hello_rust`
```

**Ru**st is **te**lling us **th**at it **ca**n no **lo**nger **fi**nd **th**e **de**finition of **ou**r **st**ruct. **Th**is is **wh**ere _**mo**dules_ **co**me in — **un**like **so**me **ot**her **la**nguages, **yo**u **mu**st _**ex**plicitly **in**clude **co**de_ **in**to **yo**ur **ap**plication. **Ru**st **wi**ll **no**t **si**mply **fi**nd **th**e **fi**le **an**d **co**mpile / **in**clude it **fo**r **yo**u.

In **or**der to **in**clude **th**e **st**ructure **de**claration we **ne**ed to **up**date **ou**r _**ma**in.rs_ to **ad**d a _**mo**dule_ **re**ference, **li**ke so—

```
mod my_struct;fn main() {  let _ms = MyStruct {};}
```

In **Ru**st, **al**l **fi**les **an**d **fo**lders **ar**e _**mo**dules_. In **or**der to **us**e **th**e **co**de in a **mo**dule, **yo**u **ne**ed to **fi**rst _**im**port_ it **wi**th **th**e `mod` **sy**ntax. **Es**sentially **th**is is **in**serting **th**e **co**de **fr**om **th**e **mo**dule at **th**e **po**int **wh**ere **th**e `mod my_struct;` **st**atement is **fo**und. **Mo**re on **fo**lder **mo**dules in a **bi**t.

**Tr**y **bu**ilding **ag**ain. **Wa**it, **wh**at’s **th**is!? It **st**ill **do**esn’t **wo**rk … **hm**m. **Le**t’s **ta**ke a **lo**ok at **th**e **er**ror **me**ssage —

```
Compiling hello_rust v0.1.0 (/scratch/hello_rust)error[E0422]: cannot find struct, variant or union type `MyStruct` in this scope → src/main.rs:4:15  |4 | let _ms = MyStruct {};  |           ^^^^^^^^ not found in this scope  |help: consider importing this struct  |1 | use crate::my_struct::MyStruct;  |
```

**Al**though **th**e **er**ror is **th**e **sa**me, **th**ere is **no**w a **he**lpful **hi**nt **ab**out **ad**ding —

`use crate::my_struct::MyStruct;`

**Le**t’s **gi**ve **th**at a **sh**ot — **ch**ange _**ma**in.rs_ to **lo**ok **li**ke **th**is (**bu**t _**do**n’t_ **bu**ild **ye**t! **Sp**oiler, we **ha**ve **an**other **is**sue I’ll **ge**t to **sh**ortly)—

```
mod my_struct;use crate::my_struct::MyStruct;fn main() {  let _ms = MyStruct {};}
```

**Th**ere’s a **li**ttle **bi**t to **un**pack **he**re. **Wh**en **yo**u **im**port a **mo**dule **wi**th **th**e `mod` **st**atement, **Ru**st _**au**tomatically_ **cr**eates a **mo**dule **na**mespace **fo**r it (to **av**oid **co**nflicts) **an**d **th**us we **ca**nnot **ac**cess **ou**r **st**ruct **ty**pe **di**rectly. **Th**e **mo**dule **na**mespace is **au**tomatically **ta**ken **fr**om **th**e **fi**le **na**me (**si**nce **th**e **mo**dule is a **fi**le in **th**is **ca**se), **he**nce **th**e `**my_struct**::MyStruct;` **pa**rt of **th**e `use` **st**atement — it **co**mes **fi**rectly **fr**om **th**e **fi**le **na**me _my\_**st**ruct.rs_ (**wi**thout **th**e **fi**le **ex**tension).

**Th**e **re**ason **fo**r **th**e `crate::` **pa**rt of **th**e `use` **st**atement is **th**at _**al**l_ **Ru**st **pr**ojects **ar**e **cr**ates. As **yo**u **ha**ve **no**w **se**en, **Ru**st **pr**ojects **ca**n be **co**mposed of **mu**ltiple **fi**les (**wh**ich **ar**e _**mo**dules_), **th**at **ca**n be **ne**sted **wi**thin **fo**lders (**wh**ich **ar**e _**al**so **mo**dules_). In **or**der to **ac**cess **th**e **ro**ot of **th**at **mo**dule **tr**ee, **yo**u **ca**n **al**ways **us**e **th**e `crate::` **pr**efix.

So **lo**oking at **ou**r _**ma**in.rs_ **ag**ain, we **ha**ve —

```
mod my_struct;                  <-- Import the module code, placing                                    it into the 'my_struct'                                    namespaceuse crate::my_struct::MyStruct; <-- Map the fully qualified (from                                     the crate root) struct                                     declaration to just 'MyStruct'fn main() {  let _ms = MyStruct {};        <-- Yay, we found it! .. or did we?}
```

If it **se**ems **co**nfusing (**an**d I **mu**st **sa**y I **fo**und **th**is a **li**ttle **co**nfusing **co**ming **fr**om C#) **ju**st **re**member **th**is —

-   You _**mu**st_ use `mod` to include a module (file or folder) into your application.
-   The `use` keyword is a convenience to map a fully qualified type name to just it’s type name (you can even rename types, but that’s for another post).

## Modules — Visibility

If **yo**u **we**re **im**patient (go on, **ad**mit it!) **th**en **yo**u **wo**uld **ha**ve **tr**ied to **bu**ild **th**e **pr**evious **in**carnation of _**ma**in.rs_ **an**d **go**t **an**other **er**ror —

```
Compiling hello_rust v0.1.0 (/scratch/hello_rust)error[E0603]: struct `MyStruct` is private → src/main.rs:2:23  |2 | use crate::my_struct::MyStruct;  |                       ^^^^^^^^ private struct  |
```

**Th**is is **te**lling us **th**at **al**though we’ve **fo**und **th**e **st**ruct **de**claration, **th**e **vi**sibility of **th**e **mo**dule is **pr**ivate **an**d **th**us we **ca**n’t **ac**cess it **he**re.

**Vi**sibility in **Ru**st is a **li**ttle **di**fferent to **la**nguages **li**ke C#, **bu**t it **pa**ys to **re**member a **co**uple of **ru**les —

-   Everything _**in**side_ a module (ie, a file or subfolder within the `/src` folder) can access _**an**ything **el**se_ within that module.
-   Everything _**ou**tside_ a module can _**on**ly_ access public members of that module.

**Th**is **ma**y **lo**ok **st**range at **fi**rst, **bu**t it **ha**s **so**me **ve**ry **ap**pealing **si**de **ef**fects — **pr**ivate **fu**nctions **wi**thin a **mo**dule **ar**e **st**ill **ac**cessible **fo**r **te**sts **wi**thin **th**at **mo**dule (**id**iomatic **Ru**st **ke**eps **un**it **te**sts **wi**thin **th**e **mo**dule). **Se**cond, **ev**ery **mo**dule is **fo**rced to **de**clare a **pu**blic **in**terface, **de**fining **wh**at **me**mbers **ar**e **ac**cessible **ou**tside **th**e **mo**dule.

To **ma**ke a **me**mber of a **mo**dule **pu**blic, we **mu**st **ad**d **th**e `pub` **ke**yword. **Le**t’s **re**visit **ou**r _my\_**st**ruct.rs_ **fi**le **ag**ain **an**d **re**place **th**e **co**ntents **wi**th —

```
pub struct MyStruct {}         <-- Add the 'pub' keyword
```

**An**d **th**at’s it! **Yo**u **ca**n **no**w **su**ccessfully **bu**ild **ou**r **ma**rvellously **co**mplicated **ap**plication :) **No**te **th**at **yo**u **ca**n **pl**ace `pub` on **mo**st **de**clarations, **in**cluding **st**ructs, **st**ruct **fi**elds, **fu**nctions (**as**sociated **an**d **ot**herwise), **co**nstants **et**c.

## Modules — Folders

**No**w **le**t’s **sa**y **th**at **ou**r `MyStruct` **st**ructure is **ge**tting **ou**t of **ha**nd **an**d we **wa**nt to **sp**lit it **in**to **mu**ltiple **fi**les. We **wa**nt to **co**llect **th**ese up **in**to a **fo**lder to **ke**ep **th**ings **ni**ce **an**d **ti**dy of **co**urse.

As **al**luded to **ab**ove, **Ru**st **tr**eats **fi**les **an**d **fo**lders in **th**e **sa**me **wa**y (as **mo**dules) **wi**th **on**e **ke**y **di**fference.

**Le**t’s **st**art by **cr**eating a **fo**lder **ca**lled `foo/` **be**cause we’ve **re**alised **ou**r `MyStruct` is **re**ally **pa**rt of **th**e **fo**o **fe**ature of **ou**r **ap**p. **Ne**xt **mo**ve **th**e **fi**le _my\_**st**ruct.rs_ **in**to `/src/foo`. Ie, **th**e **ne**w **fo**lder **st**ructure **sh**ould **lo**ok **li**ke —

```
- src/  - main.rs  - foo/    - my_struct.rs
```

**No**w **ed**it _**ma**in.rs_ to **in**clude **ou**r **ne**w **mo**dule `foo` **re**placing `my_struct` —

```
mod foo;                   <-- Change the module to match the folderuse crate::foo::MyStruct;  <-- Update the namespace to 'foo'fn main() {  let _ms = MyStruct {};}
```

We **ca**n **bu**ild **th**is **no**w (`cargo build`), **bu**t we **wi**ll **ge**t an **er**ror. As **al**ways, **Ru**st’s **er**ror **me**ssages **ar**e **in**structive —

```
Compiling hello_rust v0.1.0 (/scratch/hello_rust)error[E0583]: file not found for module `foo` → src/main.rs:1:1  |1 | mod foo;  | ^^^^^^^^  |  = help: to create the module `foo`, create file “src/foo.rs” or “src/foo/mod.rs”
```

**Wh**en **tr**ying to **im**port a **mo**dule **de**fined as a **fo**lder, we **us**e **th**e **fo**lder **na**me (as we **di**d **fo**r **th**e **fi**le **ba**sed **mo**dule **pr**eviously) **bu**t **Ru**st **ex**pects a **fi**le **na**med _**mo**d.rs_ **ex**ists **wi**thin **th**e **fo**lder.

In **th**is **ca**se we **ca**n **si**mply **re**name **ou**r _my\_**st**ruct.rs_ to _**mo**d.rs_ **an**d **vo**ila! **Ou**r **ap**plication is **bu**ilding **ag**ain.

**Fo**r **co**mpleteness **le**t’s **ad**d a **fi**le to **th**e `foo/` **fo**lder **wi**th **an**other **st**ruct **de**finition (**im**aginatively **na**med **An**other) —

```
// Contents of src/foo/another.rspub struct Another {}   <-- We're going to expose this as public                            from the 'foo' module so that we can                            use it in main.rs
```

We **im**port **ou**r **ne**w **mo**dule **in**to **th**e _**mo**d.rs_ **fi**le —

```
// Contents of src/foo/mod.rspub mod another;        <-- Add the module import for 'another'                            Note the use of 'pub' to expose the                             module 'another' as public from the                             module 'foo'pub struct MyStruct {}
```

**An**d **fi**nally **tr**y **us**ing **ou**r **ne**w **An**other **st**ruct in **ma**in.rs

```
mod foo;use crate::foo::MyStruct;use crate::foo::another::Another; <-- Note that 'another' is a                                      module within 'foo'fn main() {  let _ms = MyStruct {};  let _a = Another {};            <-- Using prefix '_' as before}
```

If **th**is **lo**oks a **li**ttle **cu**mbersome, **th**at’s **be**cause it is. **Th**ere is **ho**wever, a **be**tter **wa**y.

## Preludes

**Le**t’s **re**visit **ou**r _**mo**d.rs_ **fi**le **wi**thin **th**e `foo/` **fo**lder. **Ch**ange **th**e **co**ntents to **th**e **fo**llowing —

```
mod another;              <-- Remove the 'pub' modifierpub use another::Another; <-- Add a use'ing to map Another directly                              into 'foo' and make it publicpub struct MyStruct {}
```

**He**re we no **lo**nger **wa**nt **th**e **mo**dule **an**other to be **pu**blic, so we **re**move **th**e `pub` **ke**yword. **Th**en, **th**e `use` **st**atement **wi**ll **ma**p **th**e **fu**lly **qu**alified **ty**pe of `Another` **in**to **th**e _**fo**o_ **na**mespace (**be**cause we **ar**e in **th**e **fo**o **mo**dule).

**La**st, **le**t’s **up**date **ou**r **ma**in.rs —

```
mod foo;use crate::foo::{MyStruct,Another};fn main() {  let _ms = MyStruct {};  let _a = Another {};}
```

**Mu**ch **be**tter! **No**te **th**at **si**nce we’ve **ma**pped **th**e **ty**pe **na**me of `Another` **in**to **th**e _**fo**o_ **mo**dule, we **ca**n **ma**ke **us**e of **th**e **ex**tended `use` **sy**ntax to **im**port **mu**ltiple **na**mes at **on**ce.

**Th**e **ke**y **ta**keaway **he**re is **th**at **yo**u **sh**ould **re**ally **th**ink of **th**e _**mo**d.rs_ **fi**le as **de**fining **th**e **in**terface to **yo**ur **mo**dule. **Al**though it **ma**y **se**em a **li**ttle **da**unting at **fi**rst, it **gi**ves **yo**u a **lo**t of **co**ntrol **ov**er **ex**actly **wh**at is **ex**posed **pu**blicly, **wh**ile **st**ill **al**lowing **fu**ll **ac**cess **wi**thin **th**e **mo**dule (**fo**r **th**ings **li**ke **te**sting).

Ok, **th**at’s **gr**eat … so **wh**at **th**e **he**ck is a _**pr**elude_ I **he**ar **yo**u **as**k! **We**ll, a **pr**elude is **ju**st a **pa**ttern **fo**r **ma**king **av**ailable **al**l **ty**pes **yo**u **wa**nt to be **pu**blic, in an **id**iomatic **wa**y. **No**t **al**l **cr**ates **de**fine a **pr**elude (**al**though **ma**ny do) **an**d **yo**u **do**n’t **al**ways **ne**ed **on**e, **bu**t **le**t’s go **ah**ead **an**d **de**fine **on**e **fo**r **ou**r **li**ttle _**he**llo\_**ru**st_ **pr**oject **an**yway.

**Ba**ck to **ou**r _**ma**in.rs_ we go —

```
mod foo;mod prelude {                             <-- Create module inline  pub use crate::foo::{MyStruct,Another}; <-- Note the 'pub' here!}use crate::prelude::*;                    <-- Make the types exposed                                              in the prelude                                              availablefn main() {  let _ms = MyStruct {};  let _a = Another {};}
```

We **de**fine **th**e **pr**elude as **ju**st **an**other **mo**dule (**us**ing `mod`), **on**ly **th**is **ti**me we **ar**e **sp**ecifying **th**e **mo**dule **di**rectly, **in**stead of **le**tting **Ru**st **lo**ok **fo**r **th**e **co**rresponding **fi**le or **fo**lder.

**No**w we **ca**n **al**so **us**e **th**e `prelude` **mo**dule **ju**st **li**ke **an**y **ot**her, **fo**r **ex**ample in **th**e _**mo**d.rs_ **fi**le—

```
mod another;pub use another::Another;use crate::prelude::*;pub struct MyStruct {}
```

In **th**is **co**ntrived **ca**se, **th**e **pr**elude **is**n’t **ne**cessary at **al**l. **Bu**t **yo**u **ca**n **se**e **th**at if **yo**u **ha**d **de**clared **mu**ltiple **cr**ates, **st**andard **li**brary **ty**pes, **co**nstants **an**d **ot**her **mo**dules **wi**thin **th**e **pr**elude, **th**en **yo**u **ca**n **ac**cess **th**em **im**mediately, **wi**th **ju**st **th**e **si**ngle `use` **st**atement.

It **al**so **hi**ghlights a **co**uple of **ot**her **in**teresting **pa**rts of **mo**dule **us**e —

-   You can import all public names from a module with a wildcard `::*`
-   You can access the root of the module tree (ie, the main module in this case) using `crate::` and you can do this from anywhere in your application.

## Summary

**Th**e **mo**dule **sy**stem in **Ru**st **wa**s **de**finitely **on**e of **th**e **mo**re **pu**zzling **as**pects of **th**e **la**nguage. **Co**ming **fr**om a C++/C# **ba**ckground, **co**mbined **wi**th **th**e **mo**dule **vi**sibility **ru**les (**an**d **pr**eludes), it **wa**s **do**wnright **co**nfusing! **Bu**t **on**ce **yo**u **wr**ap **yo**ur **he**ad **ar**ound **wh**at a **mo**dule is (**fi**le, **fo**lder) **an**d **ho**w **yo**u **im**port **th**em (`mod`) **an**d **th**en **ma**p **na**mes **in**to **di**fferent **mo**dules (`use`) it **be**gins to **ma**ke **se**nse.

It’s **al**so **im**portant to **ke**ep in **mi**nd **th**at **Ru**st **pr**oject **st**ructure is **ve**ry **sp**ecific (**ap**plication vs **li**brary = _**ma**in.rs_ vs _**li**b.rs_), **re**quiring **ce**rtain **fi**les to **ex**ist in **di**fferent **co**ntexts (_**mo**d.rs_).

**Ho**pe **th**is **wa**s **he**lpful (it **wa**s **fo**r me **wr**iting it!).

**Ne**xt up, [structs, associated functions and methods](https://gian-lorenzetto.medium.com/rust-structs-functions-and-methods-d60fd597d956).

---
# Todoist

```todoist
{
"name": "My Tasks",
"filter": "today | overdue"
}
```
---

# ADHD

https://www.youtube.com/watch?v=rbkCXKGs5Yk

same guy who did all the obsidian tuts