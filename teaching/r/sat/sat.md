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
student graduated from) is a natural grouping variable here. To see both
the between-group and within-group variation, let's examine a boxplot of
SAT math scores (SAT.Q) versus school.

    bwplot(SAT.Q ~ School, data=ut2000)

![](sat_files/figure-markdown_strict/unnamed-chunk-3-1.png)

The `bwplot` command is available because we loaded the `mosaic`
package. You'll notice the aesthetics are a little nicer than the basic
R command `boxplot`. You may also notice the names of the colleges along
the x axis running together, which you can fix by clicking "Zoom" in the
Plots tab and manually resizing the window.

Let's first focus the between-group variation. We can quantify this by
seeing how the group means differ from one another.

    mean(SAT.Q ~ School, data=ut2000)

    ##    ARCHITECTURE        BUSINESS  COMMUNICATIONS       EDUCATION 
    ##        684.6875        632.9207        591.6340        554.6479 
    ##     ENGINEERING       FINE ARTS    LIBERAL ARTS NATURAL SCIENCE 
    ##        675.1655        597.1795        597.5041        632.9067 
    ##         NURSING     SOCIAL WORK 
    ##        561.1905        602.1429

This function you the group means "straight up." A slightly different
way of presenting the same information is given by the lm (linear model)
function:

    lm1 = lm(SAT.Q ~ School, data=ut2000)
    coef(lm1)

    ##           (Intercept)        SchoolBUSINESS  SchoolCOMMUNICATIONS 
    ##            684.687500            -51.766827            -93.053513 
    ##       SchoolEDUCATION     SchoolENGINEERING       SchoolFINE ARTS 
    ##           -130.039613             -9.522032            -87.508013 
    ##    SchoolLIBERAL ARTS SchoolNATURAL SCIENCE         SchoolNURSING 
    ##            -87.183439            -51.780833           -123.497024 
    ##     SchoolSOCIAL WORK 
    ##            -82.544643

The first line says to use ordinary least squares to a linear model for
SAT.Q using School as a grouping variable. The second line then extracts
the coefficients of the linear model. These coefficients express the
groupwise means in baseline-offset form: - the coefficient for
Architecture is just the group mean for Architecture, which serves as
the baseline  
- all the other coefficients are the offsets: that is, the amount by
which the corresponding group mean differs from the baseline.

If we wanted to quote numbers that describe the within-group and
between-group variation, a natural way to do so is to compute the
standard deviation of the fitted values and residuals from the model.

    my_fitted_values = fitted(lm1)
    my_residuals = resid(lm1)
    sd(my_fitted_values)

    ## [1] 29.75042

    sd(my_residuals)

    ## [1] 77.57288

Next, let's look at a scatterplot of graduating GPA versus SAT math
scores for all students.

    plot(GPA ~ SAT.Q, data=ut2000)

![](sat_files/figure-markdown_strict/unnamed-chunk-7-1.png)

We can compute a simple correlation using cor:

    cor(GPA ~ SAT.Q, data=ut2000)

    ## [1] 0.3164184

Finally, if we want to see this bivariate relationship plotted
separately for each of the 10 colleges, we need what's called a lattice
plot. The `xyplot` command produces one:

    xyplot(GPA ~ SAT.Q | School, data=ut2000)

![](sat_files/figure-markdown_strict/unnamed-chunk-9-1.png)

The vertical bar (|) should be read as "conditional upon" or "stratified
by."
