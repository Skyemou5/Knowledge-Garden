---
tags: [rust programming]
title: "Integer Literals in Rust"
---

### Integer literals

| name          | value      |
| ------------- | ---------- |
| Decimal       | 10000      |
| Hex           | 0xdeadbeef |
| Octal         | 0o77543211 |
| Binary        | 0b1111011  |
| Byte(u8 only) | b'A'       |

> Term u8 and byte are used interchangably in rust




| name          | value       |
| ------------- | ----------- |
| Decimal       | 1_000_000   |
| Hex           | 0xdead_beef |
| Octal         | 0o7754_3211 |
| Binary        | 0b1111_011  |
| Byte(u8 only) | b'A'        |

> Underscores are ignored and can be used for readability