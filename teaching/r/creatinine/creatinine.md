---
layout: page
---

Learning goals:  
\* create a naive prediction interval to quantify forecasting
uncertainty  
\* compute R-squared of a linear model, both "by hand" and using R's
`summary` function.

Data files:  
\* [creatinine.csv](creatinine.csv): data on age and kidney function for
157 adult males from a single clinic.

### Naive prediction intervals

First read in the creatinine data set and get a summary of the
variables.

    creatinine = read.csv('creatinine.csv', header=TRUE)
    summary(creatinine)

    ##       age          creatclear   
    ##  Min.   :18.00   Min.   : 89.3  
    ##  1st Qu.:25.00   1st Qu.:118.6  
    ##  Median :31.00   Median :128.0  
    ##  Mean   :36.39   Mean   :125.3  
    ##  3rd Qu.:43.00   3rd Qu.:133.3  
    ##  Max.   :88.00   Max.   :147.6

The two variables are  
\* age: the patient's age.  
\* creatclear: the patient's creatinine-clearance rate, measured in
ml/minute. According to the [National Institutes of
Health](http://www.nlm.nih.gov/medlineplus/ency/article/003611.htm),
"The creatinine clearance test helps provide information about how well
the kidneys are working. The test compares the creatinine level in urine
with the creatinine level in blood.... Creatinine is removed, or
cleared, from the body entirely by the kidneys. If kidney function is
abnormal, creatinine level increases in the blood because less
creatinine is released through the urine."

Let's start by looking at the relationship between creatinine clearance
rate and age.

    # Plot the data
    plot(creatclear~age, data=creatinine)
    # Fit a straight line to the data by least squares
    lm1 = lm(creatclear~age, data=creatinine)
    # Extract the coefficients and plot the line
    coef(lm1)

    ## (Intercept)         age 
    ## 147.8129158  -0.6198159

    abline(lm1)

![](creatinine_files/figure-markdown_strict/unnamed-chunk-2-1.png)

Clearly a decline in kidney function is something we can all look
forward to as we age.

According to the National Institutes of Health, the normal range of
values for creatinine clearance is 97 to 137 ml/min. We can verify that
these figures are reasonably close to the endpoints of a 95% coverage
interval for our sample of men.

    quantile(creatinine$creatclear, probs=c(0.025, 0.975))

    ##   2.5%  97.5% 
    ##  96.34 143.44

However, since the expected clearance rate changes as a function of the
patient's age, it stands to reason that the normal range of clearance
rates ought to change with the patient's age as well. We will use the
our fitted model to construct an age-dependent range of normal values.

Consider the case of a 50-year-old man. We can use the fitted line to
predict his creatinine clearance rate as follows:

    betahat = coef(lm1)
    newx = 50
    yhat = betahat[1] + betahat[2]*newx
    yhat

    ## (Intercept) 
    ##    116.8221

But the creatinine-clearance rate of the men in our sample deviated from
the line. By how much? The simplest way of quantifying this is to
compute the standard deviation of the residuals. This quantifies the
typical accuracy with which the model predicts creatinine clearance
rate.

    sigma = sd(resid(lm1))
    sigma

    ## [1] 6.888353

Let's use this information to construct a naive prediction interval for
our hypothetical 50-year-old man. We center our interval at the model's
prediction and use some multiple (say, 2) of the residual standard
deviation to determine the width of the interval.

    yhat - 2*sigma

    ## (Intercept) 
    ##    103.0454

    yhat + 2*sigma

    ## (Intercept) 
    ##    130.5988

Notice that our interval for a 50-year-old man is a good bit narrower
than the NIH's age-independent interval. That's because we've used the
patient's age in constructing a range of normal values. If instead we'd
considered the case of a 40-year-old man, the interval would have been
different. In this way, the linear model gives us a family of prediction
intervals, one for every possible value of the predictor variable.

### Visualizing the intervals and measuring their accuracy

We can visualize the whole family of intervals at once by plotting their
lower and upper bounds as a function of age. The upper-bound line and
lower-bound line will have the same slope as the fitted line, but their
intercepts will be shifted up and down accordingly.

    # Plot the data and show the straight-line fit
    plot(creatclear~age, data=creatinine)
    abline(betahat[1], betahat[2])
    # Now shift the intercept of fitted line up and down to get the interval bounds
    abline(betahat[1] + 2*sigma, betahat[2], col='red')
    abline(betahat[1] - 2*sigma, betahat[2], col='red')

![](creatinine_files/figure-markdown_strict/unnamed-chunk-7-1.png)

What if we wanted to quantify the accuracy of our family of prediction
intervals? Let's count the number of times our intervals missed (i.e.
failed to cover) the actual creatinine clearance rate of a man in our
data set. We first construct the lower and upper bounds of the
prediction interval for everyone:

    yhat_all = fitted(lm1)
    lower_bound = yhat_all - 2*sigma
    upper_bound = yhat_all + 2*sigma
    # Store the actual values along with the endpoints and centers of the intervals in a matrix
    predinterval_all = cbind(creatinine$creatclear, lower_bound, yhat_all, upper_bound)
    # Show the first 10 rows of this matrix
    head(predinterval_all, n=10)

    ##          lower_bound yhat_all upper_bound
    ## 1  117.3   114.82192 128.5986    142.3753
    ## 2  124.8   111.72284 125.4995    139.2763
    ## 3  145.8   119.16063 132.9373    146.7140
    ## 4  118.8   112.34265 126.1194    139.8961
    ## 5  103.2   101.18597 114.9627    128.7394
    ## 6  127.0   111.72284 125.4995    139.2763
    ## 7  139.5   110.48321 124.2599    138.0366
    ## 8  103.0    88.78965 102.5664    116.3431
    ## 9  115.2   110.48321 124.2599    138.0366
    ## 10 134.7   114.20210 127.9788    141.7555

Now let's count how many times someone in our data set had an actual
creatinine-clearance rate that fell outside our family of prediction
intervals. We could do this manually by checking each row of the matrix
stored in `predinterval_all`, or we can ask R to count for us:

    misses_above = sum(creatinine$creatclear > upper_bound)
    misses_below = sum(creatinine$creatclear < lower_bound)
    misses_above + misses_below

    ## [1] 8

    (misses_above + misses_below)/nrow(creatinine)

    ## [1] 0.05095541

It looks like 8 data points, or about 5% of the total, fell outside our
family of prediction intervals. Thus our intervals have an empirical
coverage (or accuracy) rate of 95%.

### The variance decomposition and R-squared

Let's compare the following three quantities:  
\* the standard deviation of the original response variable (creatinine
clearance)  
\* the standard deviation of the fitted values from our linear model  
\* the standard deviation of the residuals

    sigma_y = sd(creatinine$creatclear)
    sigma_yhat = sd(fitted(lm1))
    sigma_e = sd(resid(lm1))

A remarkable fact is that these three numbers form a Pythagorean triple.
We can verify this easily:

    sigma_y^2

    ## [1] 144.8554

    sigma_yhat^2 + sigma_e^2

    ## [1] 144.8554

Because the variance is the square of the standard deviation, we could
also have computed the same numbers using R's `var` function:

    var(creatinine$creatclear)

    ## [1] 144.8554

    var(fitted(lm1)) + var(resid(lm1))

    ## [1] 144.8554

This is not just a coincidence for this data set; it's a fundamental
fact about linear statistical models fit by ordinary least squares. In
statistics, this fact is called the "decomposition of variance," but
it's really the Pythagorean theorem in disguise.

The decomposition of variance leads to R\^2 (sometimes called the
"coefficient of determination"), which is a standard measure of the
predictive ability of a linear statistical model. It is computed as the
ratio of the variance of the fitted values to the variance of the
original data points. For a model fit by ordinary least squares, it is
always between 0 and 1:

    R2 = var(fitted(lm1)) / var(creatinine$creatclear)
    R2

    ## [1] 0.6724361

This number means that about 67% of the total variation in creatinine
clearance rate is predictable using age. We can get the same number from
R's `summary` function:

    summary(lm1)

    ## 
    ## Call:
    ## lm(formula = creatclear ~ age, data = creatinine)
    ## 
    ## Residuals:
    ##      Min       1Q   Median       3Q      Max 
    ## -18.2249  -4.6175   0.2221   4.7212  15.8221 
    ## 
    ## Coefficients:
    ##              Estimate Std. Error t value Pr(>|t|)    
    ## (Intercept) 147.81292    1.37965  107.14   <2e-16 ***
    ## age          -0.61982    0.03475  -17.84   <2e-16 ***
    ## ---
    ## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    ## 
    ## Residual standard error: 6.911 on 155 degrees of freedom
    ## Multiple R-squared:  0.6724, Adjusted R-squared:  0.6703 
    ## F-statistic: 318.2 on 1 and 155 DF,  p-value: < 2.2e-16

At the bottom of this output, you will notice the phrase
`Multiple R-squared:  0.6724`, which is exactly the number we just
computed by hand.
