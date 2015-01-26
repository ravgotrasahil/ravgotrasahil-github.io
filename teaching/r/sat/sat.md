---
layout: page
---

### Boxplots, scatter plots, and lattice plots

In this walk-through, you'll learn how to visualize relationhip of a
single quantitative variable. You will also learn how to change some of
the default graphics settings in R plots.

Data files:  
\* [ut2000.csv](ut2000.csv): data on SAT scores and graduating GPA for
every student who entered the University of Texas at Austin in the fall
of 2000 and went on to graduate within 6 years.

First, in order to complete this analysis we need to load in the
`mosaic` library from within RStudio. An R library (or package) is
bundle of commands that provides additional functionality, beyond what
comes with the basic R installation. There are literally thousands of
packages available for R, ranging from the simple to the very
sophisticated. The mosaic package was written specifically for use in
statistics classrooms. We will use it along with a handful of other
packages this semester, so you’ll need to learn how to install them. The
first minute of [this
video](https://www.youtube.com/watch?v=u1r5XTqrCTQ) gives a
walk-through, but it's quite simple: under the Packages tab, there's a
button for install. Click it, type in the package name (it should
auto-complete), click install.

Once the installation is done, you'll be ready to use the library. Load
it in with the `library` command:

    library(mosaic)

    ## Loading required package: car
    ## Loading required package: dplyr
    ## 
    ## Attaching package: 'dplyr'
    ## 
    ## The following object is masked from 'package:stats':
    ## 
    ##     filter
    ## 
    ## The following objects are masked from 'package:base':
    ## 
    ##     intersect, setdiff, setequal, union
    ## 
    ## Loading required package: lattice
    ## Loading required package: ggplot2
    ## 
    ## Attaching package: 'mosaic'
    ## 
    ## The following objects are masked from 'package:dplyr':
    ## 
    ##     count, do, tally
    ## 
    ## The following object is masked from 'package:car':
    ## 
    ##     logit
    ## 
    ## The following objects are masked from 'package:stats':
    ## 
    ##     binom.test, cor, cov, D, fivenum, IQR, median, prop.test,
    ##     quantile, sd, t.test, var
    ## 
    ## The following objects are masked from 'package:base':
    ## 
    ##     max, mean, min, prod, range, sample, sum

There will be a lot of information returned to the console when you load
the library, but you only have to worry if you see an actual error, like
this:

    Error in library(mosaic) : there is no package called ‘mosaic’

This means you haven't installed the package! You'll only have to do the
installation once, but you will have to load the mosaic library (as
above) at the beginning of each new R session if you intend to use it.

Next, download the ut2000.csv file and read it in.

    ut2000 = read.csv('ut2000.csv')
    summary(ut2000)

    ##      SAT.V         SAT.Q         SAT.C                  School    
    ##  Min.   :270   Min.   :320   Min.   : 650   LIBERAL ARTS   :1847  
    ##  1st Qu.:540   1st Qu.:560   1st Qu.:1120   NATURAL SCIENCE:1125  
    ##  Median :590   Median :620   Median :1210   BUSINESS       : 832  
    ##  Mean   :595   Mean   :620   Mean   :1215   ENGINEERING    : 695  
    ##  3rd Qu.:650   3rd Qu.:680   3rd Qu.:1320   COMMUNICATIONS : 306  
    ##  Max.   :800   Max.   :800   Max.   :1600   FINE ARTS      : 156  
    ##                                             (Other)        : 230  
    ##       GPA        Status  
    ##  Min.   :1.837   G:5191  
    ##  1st Qu.:2.872           
    ##  Median :3.252           
    ##  Mean   :3.212           
    ##  3rd Qu.:3.595           
    ##  Max.   :4.000           
    ## 

School (which of the 10 different undergraduate schools at UT the
student graduated from) is a natural grouping variable here. Let's start
by computing the mean SAT math score stratified by school.

    mean(SAT.Q ~ School, data=ut2000)

    ##    ARCHITECTURE        BUSINESS  COMMUNICATIONS       EDUCATION 
    ##        684.6875        632.9207        591.6340        554.6479 
    ##     ENGINEERING       FINE ARTS    LIBERAL ARTS NATURAL SCIENCE 
    ##        675.1655        597.1795        597.5041        632.9067 
    ##         NURSING     SOCIAL WORK 
    ##        561.1905        602.1429

This gives you an idea of between-group variation. To see both the
between-group and within-group variation, you'll need a boxplot then a
boxplot of SAT math scores (SAT.Q)

    bwplot(SAT.Q ~ School, data=ut2000)

![](sat_files/figure-markdown_strict/unnamed-chunk-4-1.png)

The `bwplot` command is available because we loaded the `mosaic`
package. You'll notice the aesthetics are a little nicer than the basic
R command `boxplot`. You may also notice the names of the colleges along
the x axis running together, which you can fix by clicking "Zoom" in the
Plots tab and manually resizing the window.

Next, let's look at a scatterplot of graduating GPA versus SAT math
scores for all students.

    plot(GPA ~ SAT.Q, data=ut2000)

![](sat_files/figure-markdown_strict/unnamed-chunk-5-1.png)

If we want to see this relationship separately for each of the 10
colleges, we need what's called a lattice plot. The `xyplot` command
produces one:

    xyplot(GPA ~ SAT.Q | School, data=ut2000)

![](sat_files/figure-markdown_strict/unnamed-chunk-6-1.png)

The vertical bar (|) should be read as "conditional upon" or "stratified
by."
