---
title: "Add Entry for Default Terminals"
tags: [linux, terminal, bash]
---


https://askubuntu.com/questions/1245337/how-to-change-the-terminal-to-alacritty-in-open-in-terminal-context-mneu

https://itsfoss.com/change-default-terminal-ubuntu/

add entry
```bash
sudo update-alternatives --install /usr/bin/x-terminal-emulator x-terminal-emulator /usr/local/bin/alacritty 50
```

view entries
```bash
sudo update-alternatives --config x-terminal-emulator
```

remove entry
```bash
sudo update-alternatives --remove "x-terminal-emulator" "/usr/local/bin/alacritty"
```
