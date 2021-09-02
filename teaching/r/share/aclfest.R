# load the tidyverse library (https://www.tidyverse.org/)
# If you haven't installed it, do so using the
# Install button under the Packages tab, at right
library(tidyverse)

## Use the Import Dataset button under the "Environment" tab to the right
## Follow the prompts to import aclfest.csv

###
# Let's estimate a few simple probabilities from this data
###

# Q1: what is P(played Lollapalooza) for a randomly selected band?
# A: cross tabulate the data by the lollapalooza variable
# here 1 means "yes" and 0 means "no"
xtabs(~lollapalooza, data=aclfest)

# so P(lollapalooza) = 438/(800 + 438) = 0.35

# But we can also get R to turn those counts into proportions for us,
# using the prop.table function.
# First we'll save the table in an object whose name we get to choose.
t1 = xtabs(~lollapalooza, data=aclfest)

# Then we'll pass this saved table to the prop.table function
# which turns a table of counts into a table of proportions
prop.table(t1)

# Here's a more concise way to do this, using pipes (%>%).
# Pipes allow us to combine multiple operations in a single pipeline:
# that is, a sequential chain of operations, with the result of one
# operation feeding into the next one.
# think of the pipe (%>%) as meaning "and then":
xtabs(~lollapalooza, data=aclfest) %>%
  prop.table


# Q2: what is P(played ACL and played Lollapalooza)?
# A: cross tabulate the data by both festivals
xtabs(~acl + lollapalooza, data=aclfest)  

# Piping the table of counts into prop.table.
# The resulting numbers are joint probabilities.
xtabs(~acl + lollapalooza, data=aclfest) %>%
  prop.table

# so P(ACL = 1, lollapalooza = 1) is about 0.06


# Q3: what is P(played bonnaroo or played coachella)?
# Use the addition rule: P(A or B) = P(A) + P(B) - P(A,B)
# So P(bonnaroo or coachella) = P(bonnaroo) + P(coachella) - P(bonnaroo,coachella)
# First let's get the joint probability P(bonnaroo, coachella)
xtabs(~bonnaroo + coachella, data=aclfest) %>%
  prop.table

# the addmargins function sums up the rows and columns for us.
# this gives us P(bonnaroo) and P(coachella)
xtabs(~bonnaroo + coachella, data=aclfest) %>%
  prop.table %>%
  addmargins

# So we get:
# P(bonnaroo or coachella) = P(bonnaroo) + P(coachella) - P(bonnaroo,coachella)
# this is: 0.26009693 + 0.44588045 - 0.04523425 = 0.66


###
# conditional probabilities
###

# Q4: What is P(ACL = 1 | Lollapalooza = 1)?
xtabs(~acl + lollapalooza, data=aclfest)

# Looks like 361 + 77 = 438 bands played Lollapalooza
# Of these, 77 played ACL.
# So P(ACL = 1 | Loll = 1) = 77/438 = 0.18 (18%)

# We can add an optional "flag" to prop.table to get conditional probabilities.
# Here we condition on the second variable (margin=2), which is lollapalooza.
# This makes the columns sum to 1.
xtabs(~acl + lollapalooza, data=aclfest) %>%
  prop.table(margin=2)
# Conclusion: P(ACL = 1 | Loll = 1) = 0.18

# Add a step in the pipeline to round to two decimal places.
xtabs(~acl + lollapalooza, data=aclfest) %>%
  prop.table(margin=2) %>%
  round(2)


# checking independence from data
# Q5: Is playing Coachella independent of playing Outside Lands?
# Let's check whether:
# P(coachella = 1 | outsidelands = 1) = P(coachella = 1 | outsidelands = 0)

# Let's form a table of probabilities conditional on outside lands
xtabs(~coachella + outsidelands, data=aclfest) %>%
  prop.table(margin=2)
# Looks like:
# P(coachella = 1 | outsidelands = 1) = 0.14
# P(coachella = 1 | outsidelands = 0) = 0.50


# Conclusion: not independent!
# A band that plays Outside Lands is _much_ less likely to play Coachella
# than a band that _doesn't_ play Outside Lands
