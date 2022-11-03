

---
title: "Firefox Notes"
tags: [firefox]
---


# Firefox customize tabs

---

To hide the native tabs, you'll have to add a new file called `userChrome.css` and the css property `visibility: collapse`.

To do this, in Firefox click on Click on `Menu -> Help -> Troubleshooting Information` or navigate to `about:support` in the address bar.

Under the `Application Basics` section, there will be a section called `Profile Directory` with a button to `Open Directory`.

In the `Profile Directory` create a new folder called `chrome`. In the `chrome` folder create or edit the file `userChrome.css` if it already exists.

The contents of `userChrome.css` should be the following.

```css
/* hides the native tabs */
#TabsToolbar {
  visibility: collapse;
}
```

Some optional further modifications to put in `userChrome.css` are:

```css
/* hides the title bar */
#titlebar {
  visibility: collapse;
}

/* hides the sidebar */
#sidebar-header {
  visibility: collapse !important;
} 
```

A configuration that [Xilin Sun](https://medium.com/@Aenon/firefox-hide-native-tabs-and-titlebar-f0b00bdbb88b) uses is:

```css
/* hides the native tabs */
#TabsToolbar {
  visibility: collapse;
}
/* leaves space for the window buttons */
#nav-bar {
    margin-top: -8px;
    margin-right: 74px;
    margin-bottom: -4px;
}
```

Try these out and see what you think looks best.

To answer your question in the comment, you may like this option better. I tried using visibility, but it was extremely flashy and jittery with the hover.

```css
/* Option 1 */
#TabsToolbar {
    opacity: 0.0;
}

#TabsToolbar:hover {
    opacity: 1.0;
}

/* Option 2 */
#TabsToolbar {
    visibility: collapse;
}

#navigator-toolbox:hover #TabsToolbar {
    visibility: visible;
}
```


---
If you're running Windows 10, I've found the following gives the best integration:

![screenshot of windows 10 tab integration](https://i.stack.imgur.com/ME8Ae.png)

1.  Enable "Title Bar" mode by going to the hamburger menu (☰) → Customize → Check the "Title Bar" checkbox at the bottom of the screen.
2.  Apply the following [userChrome.css](https://www.userchrome.org/how-create-userchrome-css.html):

```css
#main-window[tabsintitlebar="true"]:not([extradragspace="true"]) #TabsToolbar {
    opacity: 0;
    pointer-events: none;
}

#main-window:not([tabsintitlebar="true"]) #TabsToolbar {
    visibility: collapse !important;
}
```

---

## Re-enable Custom CSS

1.  Visit `about:config`
2.  Search `toolkit.legacyUserProfileCustomizations.stylesheets`
3.  Toggle it, making the value `true`

## Create userChrome.css

1.  Visit `about:support`
2.  To the right of "Profile Directory", press the button `Open Directory`
3.  Create a new folder named `chrome`
4.  Open the `chrome` folder and create a new file named `userChrome.css`

## Set the styling in userChrome.css

Different CSS needs to be used depending on whether you have the titlebar enabled.

### With Titlebar

Titlebar visible _(Hamburger menu at top-right -> More Tools -> Customize Toolbar..)_ [![enter image description here](https://i.stack.imgur.com/Vldct.png)](https://i.stack.imgur.com/Vldct.png)

Result _(Ubuntu screenshot)_ [![enter image description here](https://i.stack.imgur.com/9ag6d.png)](https://i.stack.imgur.com/9ag6d.png)

1.  Inside the `userChrome.css` file, insert the code below to hide tabs:

```
#TabsToolbar {
  visibility: collapse;
}
```

2.  Close and reopen Firefox to see the changes.

### Without Titlebar

Titlebar not visible _(Hamburger menu at top-right -> More Tools -> Customize Toolbar..)_ [![enter image description here](https://i.stack.imgur.com/1bSRm.png)](https://i.stack.imgur.com/1bSRm.png)

Result _(Ubuntu screenshot)_ [![enter image description here](https://i.stack.imgur.com/kEyGF.png)](https://i.stack.imgur.com/kEyGF.png)

1.  Inside the `userChrome.css` file, insert the code below to hide tabs:

```
#tabbrowser-tabs {
    visibility: collapse;
}
```

2.  Close and reopen Firefox to see the changes.

---

## Alternative Styling

### Without Titlebar: Mini bar

_Result (Ubuntu)_ [![enter image description here](https://i.stack.imgur.com/iNlI5.png)](https://i.stack.imgur.com/iNlI5.png)

_Styling_

```
#tabbrowser-tabs {
    visibility: collapse;
}
#titlebar {
    max-height: 16px;
}
#TabsToolbar .titlebar-buttonbox-container {
    transform: scale(.55) translateY(-10px) translateX(38px);
}
```

### Without Titlebar: Drag Space Only (No Window Buttons)

_Result (Ubuntu)_ [![enter image description here](https://i.stack.imgur.com/eivaA.png)](https://i.stack.imgur.com/eivaA.png)

_Styling_

```
#tabbrowser-tabs {
    visibility: collapse;
}
#titlebar {
    max-height: 5px;
}
#TabsToolbar .titlebar-buttonbox-container {
    display: none;
}
```

### Without Titlebar: Inline Window Buttons (With Drag Box)

_Result (Ubuntu)_ [![enter image description here](https://i.stack.imgur.com/y8rmQ.png)](https://i.stack.imgur.com/y8rmQ.png) [![enter image description here](https://i.stack.imgur.com/6CWZ4.png)](https://i.stack.imgur.com/6CWZ4.png)

_Styling_

```
#tabbrowser-tabs {
    visibility: collapse;
}
#navigator-toolbox {
    display: flex;
    flex-flow: row wrap;
}
#titlebar {
    order: 1;
    max-width: 146px;
}
#titlebar #TabsToolbar {
    background-color: var(--toolbar-bgcolor);
    background-image: var(--toolbar-bgimage)
}
#titlebar #TabsToolbar .titlebar-spacer {
    background-color: rgba(0,0,0,0.05);
    margin: 3px;
    border-radius: 25%;
    cursor: grab;
}
#titlebar #TabsToolbar .titlebar-spacer[type="pre-tabs"] {
    display: none;
}
#nav-bar {
    order: 0;
    width: calc(100% - 146px);
}
#PersonalToolbar {
    order: 2;
}
```

For MacOS, you can also set

```css
#nav-bar {
    order: 0;
    width: 100%;
}
```

This will move the window buttons on the bookmarks tab, making the top bar look more complete.

---
This css removes tabs, but preserves menu and minimize/maximize/close buttons.

```
#tabbrowser-tabs {  visibility: collapse;}
```

Works in FF version 83

---

Having gone through most of the solutions in this thread, here is my personal recommendation if you want to achieve following:

-   Use Tree Style Tab and want to hide horizontal tabs
-   Show a window handler because you need to move a lot
-   Across macOS and Windows 10

> ![macOS](https://i.stack.imgur.com/XTwtQ.jpg)
> 
> macOS

> ![Windows 10](https://i.stack.imgur.com/1OPZg.png)
> 
> Windows 10

---

### Step 1: Enable CSS

1.  Visit `about:config` → Click `Accept the Risk and Continue`
2.  Search `toolkit.legacyUserProfileCustomizations.stylesheets`
3.  Toggle it, making the value `true`

### Step 2: Find CSS

1.  Visit `about:support` in the address bar
2.  Find table `Application Basics` → find row `Profile Folder` → click button `Show in Folder` or `Open Folder`. It usually points to
    -   `/Users/your-alias/Library/Application Support/Firefox/Profiles/your-id.Default User` for macOS
    -   _Or_ `C:\Users\your-alias\AppData\Roaming\Mozilla\Firefox\Profiles\your-id.Default User` for Windows
3.  In this Profile Folder create a new folder called `chrome` or open it if it already exsits.
4.  In the `chrome` folder create `userChrome.css` or edit it if it already exists.

### Step 3: Edit CSS

1.  Edit `userChrome.css` and please add:

```
/* To hide horizontal bars */
#main-window[tabsintitlebar="true"]:not([extradragspace="true"]) #TabsToolbar {
    opacity: 0;
    pointer-events: none;
}

#main-window:not([tabsintitlebar="true"]) #TabsToolbar {
    visibility: collapse !important;
}
```

2.  (_Optional_) If you want to have a smaller header of `Tree Style Tab` on the sidebar, please add:

```
/* For Tree Style Tab */
#sidebar-header{
  font-size: 1em !important;
  padding: 5px 2px 5px 13px !important;
}
```

### Step 4: Enable title Bar and restart

1.  Enable "Title Bar" mode
    
    -   Right click on Toolbar → select `Customize Toolbar...`
    -   _Or_ by Click the menu (☰) → `More tools` → `Customize Toolbar...`
2.  At the left bottom of the screen, check the "Title Bar" checkbox → Submit right bottom button `Done`
    
3.  Restart.

---
# Todoist

```todoist
{
"name": "My Tasks",
"filter": "today | overdue"
}
```
---

# firefox tabs
[[firefox tabs]]

https://superuser.com/questions/1424478/can-i-hide-native-tabs-at-the-top-of-firefox

```css

```

about:config

Ensure the config `toolkit.legacyUserProfileCustomizations.stylesheets` is set to `true`

https://github.com/piroor/treestyletab/issues/1525#issuecomment-344372874


https://support.mozilla.org/en-US/kb/profiles-where-firefox-stores-user-data get to directory