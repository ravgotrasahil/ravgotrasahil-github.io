---
layout: page
---

House prices
------------

Learning goals:  
\* fit regression models with a single numerical predictor and multiple
categorical predictors  
\* correctly interpret dummy variables and interaction terms in linear
regression models

Data files:  
\* [house.csv](house.csv): sales prices of houses in Kansas City

### Aggregation paradoxes in regression

Let's start by loading the mosaic library, reading in the house-price
data set and summarizing the variables.

    library(mosaic)
    house = read.csv("house.csv", header=TRUE)

    summary(house)

    ##       home            nbhd        offers           sqft      brick   
    ##  Min.   :  1.00   nbhd01:44   Min.   :1.000   Min.   :1450   No :86  
    ##  1st Qu.: 32.75   nbhd02:45   1st Qu.:2.000   1st Qu.:1880   Yes:42  
    ##  Median : 64.50   nbhd03:39   Median :3.000   Median :2000           
    ##  Mean   : 64.50               Mean   :2.578   Mean   :2001           
    ##  3rd Qu.: 96.25               3rd Qu.:3.000   3rd Qu.:2140           
    ##  Max.   :128.00               Max.   :6.000   Max.   :2590           
    ##     bedrooms       bathrooms         price       
    ##  Min.   :2.000   Min.   :2.000   Min.   : 69100  
    ##  1st Qu.:3.000   1st Qu.:2.000   1st Qu.:111325  
    ##  Median :3.000   Median :2.000   Median :125950  
    ##  Mean   :3.023   Mean   :2.445   Mean   :130427  
    ##  3rd Qu.:3.000   3rd Qu.:3.000   3rd Qu.:148250  
    ##  Max.   :5.000   Max.   :4.000   Max.   :211200

Although there are a lot of variables in this data set, we will focus on
four: \* price: the sales price of the house.  
\* sqrt: the size of the house in square feet.  
\* nbhd: a categorical variable indicating which of three neighborhoods
the house is in.  
\* brick: a categorical variable indicating whether the house is made of
brick.

We'll begin by fitting a regression line for the price of the house in
terms of its square footage:

    plot(price~sqft, data=house, pch=19)
    lm0 = lm(price~sqft, data=house)
    abline(lm0)

![](house_files/figure-markdown_strict/unnamed-chunk-3-1.png)

    coef(lm0)

    ##  (Intercept)         sqft 
    ## -10091.12991     70.22632

According to the estimated slope of this model, each additional square
foot costs roughly \$70.

However, the following two plots might give you cause for concern about
this answer.

    bwplot(price ~ nbhd, data=house)

![](house_files/figure-markdown_strict/unnamed-chunk-4-1.png)

    bwplot(sqft ~ nbhd, data=house)

![](house_files/figure-markdown_strict/unnamed-chunk-4-2.png)

We see that the both the prices and sizes of houses differ
systematically across neighborhoods. Might the neighborhood be a
confounding variable that distorts our estimate of the size-versus-price
relationship? For example, some neighborhoods might be more desirable
because of their location, not merely because of the size of the houses
there.

Let's look at the neighborhoods individually to get a sense of whether
this is plausible. First, neighborhood 1:

    plot(price~sqft, data=subset(house, nbhd=='nbhd01'), pch=19)
    lm1 = lm(price~sqft, data=subset(house, nbhd=='nbhd01'))
    abline(lm1)

![](house_files/figure-markdown_strict/unnamed-chunk-5-1.png)

    coef(lm1)

    ## (Intercept)        sqft 
    ## 32906.42259    40.30018

Within neighborhood 1 alone, it looks like each additional square costs
about \$40. How about neighborhood 2?

    plot(price~sqft, data=subset(house, nbhd=='nbhd02'), pch=19)
    lm2 = lm(price~sqft, data=subset(house, nbhd=='nbhd02'))
    abline(lm2)

![](house_files/figure-markdown_strict/unnamed-chunk-6-1.png)

    coef(lm2)

    ## (Intercept)        sqft 
    ##  25682.1102     49.4285

Here the size premium is about \$50 per square foot. And neighborhood 3?

    plot(price~sqft, data=subset(house, nbhd=='nbhd03'), pch=19)
    lm3 = lm(price~sqft, data=subset(house, nbhd=='nbhd03'))
    abline(lm3)

![](house_files/figure-markdown_strict/unnamed-chunk-7-1.png)

    coef(lm3)

    ## (Intercept)        sqft 
    ## 56659.14762    49.32586

Also about \$50 per square foot. So let's recap:  
\* In each individual neighborhood, the price of an additional square
foot is between 40 and 50 dollars.  
\* Yet for all three neighborhoods together, the price of an additional
square foot is 70 dollars.

This is a classic example of an aggregation paradox: that is, something
which appears to hold for a group (all three neighborhoods together)
simultaneously fails to hold for the individual members of that group.
The following picture may give you some intuition for what's going on
here. We will plot the points for the individual neighborhoods in
different colors:

    # Plot the whole data set
    plot(price~sqft, data=house)
    # Color the points and add the line for nbhd 1
    points(price~sqft, data=subset(house, nbhd=='nbhd01'), pch=19, col='blue')
    abline(lm1, col='blue')
    # Color the points and add the line for nbhd 2
    points(price~sqft, data=subset(house, nbhd=='nbhd02'), pch=19, col='red')
    abline(lm2, col='red')
    # Color the points and add the line for nbhd 3
    points(price~sqft, data=subset(house, nbhd=='nbhd03'), pch=19, col='grey')
    abline(lm3, col='grey')
    # Finally, add the "global" line
    abline(lm0, lwd=4)

![](house_files/figure-markdown_strict/unnamed-chunk-8-1.png)

You can see that the lines for the individual neighborhoods are all less
steep than the overall line for the aggregrated data set. This suggests
that neighborhood is indeed a confounder for the price-versus-size
relationship.

### Dummy variables

To resolve the aggregation paradox in the house-price data set, we
applied a "split and fit" strategy:  
1) Split the data into subsets, one for each group. 2) Fit a separate
model to each subset.

With only a single grouping variable, the "split-and-fit" strategy often
works just fine. But with multiple grouping variables, it gets
cumbersome quickly. Therefore, we'll learn an alternative strategy that
will prove to be much more useful than split-and-fit: dummy variables
and interactions.

Remember that a dummy variable is a 0/1 indicator of membership in a
particular group. Here's how we introduce dummy variables in a
regression model.

    lm4 = lm(price ~ sqft + nbhd, data=house)
    coef(lm4)

    ## (Intercept)        sqft  nbhdnbhd02  nbhdnbhd03 
    ## 21241.17443    46.38592 10568.69781 41535.30643

This output says that there are three different lines for the three
different neighborhoods:  
\* Neighborhood 1 (the baseline): price = 21241 + 46.39 \* sqft  
\* Neighborhood 2: price = (21241 + 10569) + 46.39 \* sqft  
\* Neighborhood 3: price = (21241 + 41535) + 46.39 \* sqft

That is, three different lines with three different intercepts and the
same slope (46.39). The coefficient labeled "(Intercept)" is the
intercept for the baseline category (in this case, neighborhood 1). The
coefficients on the nbhd02 and nbhd03 dummy variables are the offsets.

### Interactions

If we believe that the price-versus-size relationship is different for
each neighborhood, we may want to introduce an interaction term:

    lm5 = lm(price ~ sqft + nbhd + nbhd:sqft, data=house)
    coef(lm5)

    ##     (Intercept)            sqft      nbhdnbhd02      nbhdnbhd03 
    ##    32906.422594       40.300183    -7224.312425    23752.725029 
    ## sqft:nbhdnbhd02 sqft:nbhdnbhd03 
    ##        9.128318        9.025674

Now we're allowing both the slope and intercept to differ from
neighborhood to neighborhood. The rules are: \* The coefficients on the
dummy variables get added to the baseline intercept to form each
neighborhood-specific intercept.  
\* The coefficients on the interaction terms get added to the baseline
slope to form each neighborhood-specific slope.

Thus our model above output says that:  
\* Neighborhood 1 (the baseline): price = 32906 + 40.30 \* sqft  
\* Neighborhood 2: price = (32906 - 7224) + (40.30 + 9.13) \* sqft  
\* Neighborhood 3: price = (32906 + 23753) + (40.30 + 0.02) \* sqft

### Multiple categorical predictors

Once you've got the idea of dummy variables and interactions, you can
add as many categorical variables as you want. (Word to the wise: doing
so will not necessarily be a good idea!) For example, try interpreting
the coefficients for the following model:

    lm6 = lm(price ~ sqft + nbhd + brick + brick:sqft, data=house)
    coef(lm6)

    ##   (Intercept)          sqft    nbhdnbhd02    nbhdnbhd03      brickYes 
    ##   28434.99926      41.27425    5447.01983   36547.03947  -16787.14206 
    ## sqft:brickYes 
    ##      17.85384

### Advanced plotting (optional)

You can use a lattice plot to reproduce my "split and fit" strategy from
above: that is, split the data into subsets and fit a line to each one.
Here's one way that involves defining a custom "panel function" that is
used by `xyplot`.

    # Define a custom plotting function to be applied to each panel
    plot_with_lines = function(x, y) {
             panel.xyplot(x, y)
             panel.abline(lm(y ~ x))         
    }

    # Pass this custom plotting function to xyplot
    xyplot(price ~ sqft | nbhd, data=house, panel=plot_with_lines)

![](house_files/figure-markdown_strict/unnamed-chunk-12-1.png)
