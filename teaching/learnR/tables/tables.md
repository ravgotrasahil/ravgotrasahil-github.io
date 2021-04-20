Tables in R
================

In this walkthrough, we’ll learn the following key concepts and R
functions:

  - Using tables to estimate relatively simple probabilities (including
    conditional and joint probabilities)  
  - Making tables with `xtabs`  
  - Modifying tables with `prop.table` and `addmargins`  
  - piping (`%>%`) as a way of chaining together computations

## The data

Before you get started, download
[aclfest.csv](http://jgscott.github.io/teaching/data/aclfest.csv), which
contains data on some bands that played at several major U.S. music
festivals (including our our ACL Festival here in Austin).

## Getting started

We’ll first load the [tidyverse library](https://www.tidyverse.org/).

``` r
library(tidyverse)
```

    ## ── Attaching packages ─────────────────────────────────────── tidyverse 1.3.0 ──

    ## ✓ ggplot2 3.3.2     ✓ purrr   0.3.4
    ## ✓ tibble  3.0.4     ✓ dplyr   1.0.2
    ## ✓ tidyr   1.1.2     ✓ stringr 1.4.0
    ## ✓ readr   1.4.0     ✓ forcats 0.5.0

    ## ── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
    ## x dplyr::filter() masks stats::filter()
    ## x dplyr::lag()    masks stats::lag()

If you see a similar set of messages to what’s shown above after the
`##` symbols, you’re good to go\!

But if you haven’t installed the `tidyverse` library, executing this
command will give you an error. To avoid the error, you’ll first need to
install `tidyverse` using the `Install` button under the Packages tab,
which is typically located in the bottom-right panel of RStudio’s
four-panel layout. Remember, an R library is like an app on your phone:
you only have to install it once, but you have to load it each time you
want to use it. On a phone, you load an app by clicking on its icon; in
R, you load a library using the `library` command.

Then use the `Import Dataset` button to read in the data you downloaded,
which you can find under the `Environment` tab in the top-right panel.
Follow the prompts to import `aclfest.csv`.

For a reminder on how to accomplish these two key steps (loading a
library, importing a data set), see the previous walkthrough on [Getting
Started in R]().

If you’re imported the data correctly, you can run the `head` function
to get the first six lines of the file. You should see the following
result:

``` r
head(aclfest)
```

    ##                          band acl bonnaroo coachella lollapalooza outsidelands
    ## 1                         ALO   0        0         0            0            1
    ## 2                     Battles   0        1         1            1            0
    ## 3                    Bon Iver   0        0         0            0            1
    ## 4              Flogging Molly   0        0         1            1            0
    ## 5 Ivan Neville's Dumpstaphunk   0        0         0            0            1
    ## 6                   Radiohead   0        0         0            1            1
    ##   year
    ## 1 2008
    ## 2 2008
    ## 3 2008
    ## 4 2008
    ## 5 2008
    ## 6 2008

Each entry is either a 1 or a 0, meaning “yes” and “no”, respectively.
So, for example, on the 6th line we see an entry of 1 for Radiohead
under the `lollapalooza` column, which means that Radiohead played at
Lollapalooza that year.

Let’s make a few simple tables with this data. This will allow us to
estimate probabilities like:

1.  How likely is a band in this sample to play Lollapalooza?  
2.  How likely is a band to play ACL Fest, given that they played
    Lollapalooza?  
3.  How like is a band to play either ACL *or* Lollapalooza?

## Simple probabilities from tables

Let’s address question 1: what is P(played Lollapalooza) for a randomly
selected band in this sample? To answer this, we’ll use R’s `xtabs`
function to tabulate (i.e. count) the data according to whether a band
played Lollapalooza (1) or not (0).

``` r
xtabs(~lollapalooza, data=aclfest)
```

    ## lollapalooza
    ##   0   1 
    ## 800 438

(You might be curious about the little tilde (`~`) symbol in front of
`lollapalooza`. Roughly speaking, `~` means “by”—as in, “cross-tabulate
BY the `lollapalooza` variable.”)

OK, back to the table. Remember that 1 means yes and 0 means no. So of
the 1238 bands (800 + 438) in this sample, 438 of them played
Lollapalooza. We can now just use R as a calculator to get this
proportion:

``` r
438/(800 + 438)
```

    ## [1] 0.3537964

### Using `prop.table`

Simple enough, right? But we can also get R to turn those counts into
proportions for us, using the `prop.table` function. In general, the
more work we can get R to do for us, the better\!

One way to do this is as follows. First we’ll make the same table as
before, except now we’ll save the result in an “object” whose name we
get to choose. We’ll just call it `t1` here, although you could call it
something more imaginative, like `my_great_lollapalooza_table`, if you
wanted to.

``` r
t1 = xtabs(~lollapalooza, data=aclfest)
```

Notice that nothing gets printed to the screen when you execute this
command. But if you ask R what `t1` is, it will show you the same table
as before:

``` r
t1
```

    ## lollapalooza
    ##   0   1 
    ## 800 438

OK, so why did we bother to store this table in something called `t1`?
Well, remember one of the core ideas in programming: chaining
computations together. That’s exactly what we’re doing here: we’ll take
this `t1` object we’ve created (the first link our chain) and pass it
into the `prop.table` function (the second link in our chain). This
function turns a table of counts (like `t1`) into a table of
proportions, like this:

``` r
prop.table(t1)
```

    ## lollapalooza
    ##         0         1 
    ## 0.6462036 0.3537964

### Using pipes

The above way of doing things—using `xtabs` creating an “intermediate”
object called `t1` and then passing `t1` into the `prop.table`
function—works just fine. Lots of people write R code this way.

But it turns out there’s a nicer way to accomplish the same task, using
a “pipe” (`%>%`). Here’s how it works:

``` r
xtabs(~lollapalooza, data=aclfest) %>%
  prop.table
```

    ## lollapalooza
    ##         0         1 
    ## 0.6462036 0.3537964

This code block says: “make a table of counts of the `lollapalooza`
variable in the `aclfest` data set, and pipe (`%>%`) the resulting table
into `prop.table` to turn the table of counts into a table of
proportions.”

The result is exactly the same as before; using the pipe is totally
optional. But using pipes tends to make your code easier to easier to
write, easier to read, and easier to modify. For a simple calculation
like this involving only two steps, the difference is minimal. But for
the more complex kinds of calculations we’ll see later in the course,
the difference can be substantial. I strongly recommend learning to
write R code using pipes.

## Joint and conditional probabilities from tables

Let turn to another question: what is P(played ACL | played
Lollapalooza)?

To answer this using the data at hand, we’ll tabulate the bands by two
variables: whether they played at ACL, and whether they played at
Lollapalooza.

``` r
xtabs(~acl + lollapalooza, data=aclfest)
```

    ##    lollapalooza
    ## acl   0   1
    ##   0 719 361
    ##   1  81  77

These numbers represent joint frequencies:

  - 719 bands played at neither ACL nor Lollapalooza.  
  - 81 bands played at ACL but not Lollapalooza.
  - 361 bands played at Lollapalooza but not ACL.  
  - 77 bands played at both ACL and Lollapalooza.

To we have to remember the rule for conditional probabilities:

\[
P(A \mid B) = \frac{{P(A,B)}}{P(B)}
\]

The
