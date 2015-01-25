---
layout: page
---

This is the very first R script I show in my intro classes.

Data files:
* [heights.csv](heights.csv): data on students' heights versus their parents' heights.

### Basics

You can use R as a graphing calculator.  Open up a session of R and type these commands directly into the console.

```
2 + 2
3*7
2^3
log10(100)
```

Now read in the heights.csv data set using the Import Dataset button in RStudio.  In the version of RStudio I'm using (0.98.1091), this is under the Environment tab.  By default, R should name the imported data frame in the variable ``heights''.

R has many functions for computing basic summary statistics.  Meet three of the most basic by copying the following code to your console.

```
# Get a summary of each variable in the data set
summary(heights)

# Compute the mean and standard deviation of the SHGT variable
mean(heights$SHGT)
sd(heights$SHGT)
```

Notice two things:
1) Anything followed by a pound sign (#) is a comment and is ignored by R.  
2) When we say ``heights$SHGT'' we are asking R to access the SHGT variable inside the heights data frame.  This is the basic way we access variables.
