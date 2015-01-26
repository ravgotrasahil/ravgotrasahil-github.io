---
layout: page
---

This is a "hello world" walk-through intended as a gentle introduction to R.

Data files:  
* [heights.csv](heights.csv): data on students' heights versus their parents' heights.  

Let's start with the simplest thing of all that you can do with R: use it as a calculator.  Open up a session of R and type these commands directly into the console.

    2 + 2
    3*7
    2^3
    log10(100)


Next, let's look at some data.   Read in the heights.csv data set using the Import Dataset button in RStudio.  In the version of RStudio I'm using (0.98.1091), this is under the Environment tab.  By default, R should name the imported data frame in the variable ``heights''.  This data set has three variables:  
* SHGT: student height in inches  
* MHGT: mother's height in inches  
* FHGT: father's height in inches  

R has many functions for computing basic summary statistics.  Meet three of the most basic by copying the following code to your console.

    # Get a summary of each variable in the data set
    summary(heights)
    
    # Compute the mean and standard deviation of the SHGT variable
	mean(heights$SHGT)
	sd(heights$SHGT)

You should see the following output:

	> summary(heights)
	      SHGT            MHGT            FHGT      
	 Min.   :60.00   Min.   :54.00   Min.   :63.00  
	 1st Qu.:67.00   1st Qu.:62.00   1st Qu.:68.00  
	 Median :70.00   Median :64.00   Median :70.00  
	 Mean   :69.56   Mean   :64.05   Mean   :69.73  
	 3rd Qu.:72.00   3rd Qu.:65.50   3rd Qu.:72.00  
	 Max.   :78.00   Max.   :71.00   Max.   :78.00  
	> 
	> # Compute the mean and standard deviation of the SHGT variable
	> mean(heights$SHGT)
	[1] 69.56311
	> sd(heights$SHGT)
	[1] 3.881631


Notice two things:  
1) Anything followed by a pound sign (#) is a comment and is ignored by R.  
2) When we say "heights$SHGT" we are asking R to access the SHGT variable inside the heights data frame.  This is the basic way we access variables in R.

Another basic operation in R is to store the results of computations in new variables, whose names we get to choose.  Try these commands:

	mu = mean(heights$SHGT)
	sigma = sd(heights$SHGT)

In computer-science parlance, this is called "declaring variables."  We're telling R to store the mean of the student height variable in a new variable called "mu" and to store the standard deviation in a new variable called "sigma".  When you execute these commands you won't see any output in the console.  But now these variables are available to be used in subsequent computations.  We can just refer to them by name:

	> mu - 2*sigma
	[1] 61.79985
	> mu + 2*sigma
	[1] 77.32637

An important thing to remember is that R is case sensitive.  If you use the wrong case, you'll get an error:

	> Mu + 2*sigma
	Error: object 'Mu' not found
	> mu + 2*Sigma
	Error: object 'Sigma' not found


All R commands have extensive documentation.  You can get help about anything using the question mark:

	?mean
	?sd

