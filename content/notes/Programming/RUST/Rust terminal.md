---
tags: [rust terminal applications linux unix]
title: "Rust Terminal Apps"
---

# Rust Terminal Apps

https://github.com/fdehau/tui-rs
https://github.com/crossterm-rs/crossterm

https://www.joshmcguigan.com/blog/build-your-own-shell-rust/

https://www.reddit.com/r/rust/comments/7hog3u/how_do_i_tell_cargo_to_run_some_other_file_not/

https://www.reddit.com/r/rust/comments/4nrldm/opengl_in_rust/

sdl2 = { git = "https://github.com/Rust-SDL2/rust-sdl2.git" }

https://nercury.github.io/rust/opengl/tutorial/2018/02/08/opengl-in-rust-from-scratch-01-window.html

```
  run pkg_config fail: "`\"pkg-config\" \"--libs\" \"--cflags\" \"openssl\"` did not exit successfully: exit status: 1\nerror: could not find system library 'openssl' required by the 'openssl-sys' crate\n\n--- stderr\nPackage openssl was not found in the pkg-config search path.\nPerhaps you should add the directory containing `openssl.pc'\nto the PKG_CONFIG_PATH environment variable\nNo package 'openssl' found\n"

  --- stderr
  thread 'main' panicked at '

  Could not find directory of OpenSSL installation, and this `-sys` crate cannot
  proceed without this knowledge. If OpenSSL is installed and this crate had
  trouble finding it,  you can set the `OPENSSL_DIR` environment variable for the
  compilation process.

  Make sure you also have the development packages of openssl installed.
  For example, `libssl-dev` on Ubuntu or `openssl-devel` on Fedora.

  If you're in a situation where you think the directory *should* be found
  automatically, please open a bug at https://github.com/sfackler/rust-openssl
  and include information about your system as well as this message.

  $HOST = x86_64-unknown-linux-gnu
  $TARGET = x86_64-unknown-linux-gnu
  openssl-sys = 0.9.72

  ', /home/ben/.cargo/registry/src/github.com-1ecc6299db9ec823/openssl-sys-0.9.72/build/find_normal.rs:180:5
  note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
warning: build failed, waiting for other jobs to finish...
error: failed to compile `cargo-edit v0.8.0`, intermediate artifacts can be found at `/tmp/cargo-install0ToPw4`

Caused by:
  build failed

```


---

# Errors

https://dev.to/amberisvibin/solving-rustc-cannot-find-lxcb-shape-oe9
 lxbc error

 libxcb-shape0-dev  libxcb-xfixes0-dev

 cmake latest version needs to be installed

 lib