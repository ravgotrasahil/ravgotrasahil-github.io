---
layout: page
---

A library is a piece of software that provides additional functionality to R, beyond what's contained in the basic installation.  R has an enormous ecosystem of libraries (number in the tens of thousands) for various data-analysis tasks.  

We'll use the mosaic library repeatedly throughout the semester.  This will walk you through the process of installing this library (and by extension, any of the other libraries you'll need).  Conveniently, libraries (also called packages) are installed from within RStudio itself.   

### Installing a library from within RStudio

Launch RStudio, and find the row of tabs for Files, Plots, Packages, etc.  You can see this on the upper-right panel in the figure below.

![](files/packages_tab.png)

Click on the Packages tab, and then on the button in the row just beneath it that says "Install".  You should see a window pop up that looks like the one below.  Type "mosaic" into the field where it says "Packages."  

![](files/install_mosaic.png)

RStudio may autocomplete the available packages that begin with the string you've typed in.  If so, select "mosaic" from the list that appears.  IMPORTANT: make sure that the box next to "Install dependencies" is checked (as it is in the picture above).  If it isn't, check it.

Click the Install button.  Now a bunch of text will get dumped to the Console window, like this:

![](files/installation_echo.png)

This indicates that the mosaic library (and several other libraries upon which it depends) are being installed.

It's possible that RStudio will give you a prompt like the following:

![](files/compilation.png)

If so, just type "n" for no, and hit Enter to continue.

Eventually you will see that text has stopped appearing in the console, and that you have a blinking cursor next to a caret mark (>).  When this happens, the mosaic package has been installed, and is now available to be loaded and used.


