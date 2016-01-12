---
layout: page
---

This page will walk you through the installation of R, RStudio, and the mosaic library.  
* R is the workhorse that actually does the computations.  You won't ever need to launch the R program directly, but it has to be installed on your computer.  
* RStudio is a nice graphical front-end to R.  This is the program you will interact with directly.  
* A library is a piece of software that provides additional functionality to R, beyond what's contained in the basic installation.  R has an enormous ecosystem of libraries (number in the tens of thousands) for various data-analysis tasks.  

### Installing R

Go to the [R project website](https://www.r-project.org).  On the left-hand side, you'll see a link for CRAN under the "Download" heading.  Click it.

The website will now offer you a choice of "mirrors", like this.

![](files/CRAN_USA.png)

These are just different servers that host the same downloads, to reduce the demand on any one server.  It really doesn't matter which one you pick; I just scrolled down to the USA section and picked the one in Dallas, since I'm in Texas.

Once you've chosen a mirror, you'll see a page like this:

![](files/CRAN_mirror.png)

Click on the appropriate Download link for your computer's operator system.  I'm on a Mac, so I clicked the "Download for (Mac) OS X" link.

Now you should be on the download page itself.  Click the link for the first file in the list, which for me is "R-3.2.3.pkg":

![](files/R_install.png)

The 3.2.3 bit is the version number; if the number on your screen is a little different, it just means you're getting a slightly later version than me.  This is not a problem.

Once you've downloaded this file, open it to run the R installer.  Follow the instructions on screen.  You're done!  The R program should now live wherever programs normally live on your hard drive (e.g. in the "Applications" folder on your hard drive).


### Installing RStudio

Go to the [RStudio download page](http://www.rstudio.com/products/rstudio/download/), which looks like this.

![](files/RStudio_download_page.png)

Under the list entitled "Installers for Supported Platforms", click on the link for your computer's platform.  Again, I'm on a Mac, so I chose the second on the page you see above.

Once you've downloaded this file, open it to run the RStudio installer. On a Mac, installation is as simple as dragging the RStudio icon onto the icon for your Applications folder in the little window that pops up.

![](files/click_and_drag.png)

That's it; you should now have a copy of RStudio on your computer in your Applications folder (on a Mac), or the analogous location on a Windows machine.

Find the RStudio program and open it.  You should see a window that looks something like this, perhaps with minor differences in the layout of the panels.  

![](files/success.png)

You're done!


### Installing a library

We'll use the mosaic library repeatedly throughout the semester.  This will walk you through the process of installing the library (and by extension, any of the other libraries you'll need).  Conveniently, libraries (also called packages) are installed from within RStudio itself. 

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


