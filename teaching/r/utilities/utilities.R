library(mosaic)

# Read in utilities data in utilities.csv
utilities = read.csv('utilities.csv', header=TRUE)

# Plot the data, fit a linear model
plot(gasbill ~ temp, data=utilities)

# Fit the linear model and plot the fitted values and line
lm1=lm(gasbill ~ temp, data=utilities)
points(fitted(lm1)~temp, data=utilities, col='red', pch=19)
abline(lm1)

# Do we still see "X-ness in Y?"
plot(resid(lm1) ~ temp, data=utilities)

# Fit a quadratic model
lm2=lm(gasbill ~ temp + I(temp^2), data=utilities)

# replot the data and added the fitted values
plot(gasbill ~ temp, data=utilities)
points(fitted(lm2)~temp, data=utilities, col='blue', pch=19)

# If you want, draw a nice smooth curve
beta = coef(lm2)
curve(beta[1] + beta[2]*x + beta[3]*x^2, col='blue', add=TRUE)
