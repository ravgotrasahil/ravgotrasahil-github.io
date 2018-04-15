---
layout: page
title: Software
permalink: /software/
---

[My GitHub page](https://github.com/jgscott) has the most up-to-date repository of software projects.  

Below you'll find details on software packages that my students and I have built.

[sdp](https://github.com/tansey/sdp): deep nonparametric estimation of discrete conditional distributions via smoothed dyadic partitioning.  In a nutshell, this is a superior alternative to the use of Gaussian mixture models as the final output layer of a deep neural network for the purpose of conditional density estimation.  By [Wesley Tansey](https://github.com/tansey).   

[gfl](https://github.com/tansey/gfl): a fast and flexible algorithm for solving the graph-fused lasso on an arbitrary graph with arbitrary smooth convex loss (negative log likelihood.  By [Wesley Tansey](https://github.com/tansey).   

[smoothfdr](https://github.com/tansey/smoothfdr). Exploits spatial structure in multiple-testing problems that have test statistics observed on a spatial lattice or arbitrary graph.  By [Wesley Tansey](https://github.com/tansey).  

[FDRreg](https://github.com/jgscott/FDRreg). Tools for false-discovery rate problems, including false-discovery rate regression (whereby covariates can influence
local FDR). [An old version is on CRAN](http://cran.r-project.org/web/packages/FDRreg/index.html), but you're better off with the latest version of the package from GitHub available using the `install_github` command through the `devtools` package.  See the Read Me for details.

[helloPG](https://github.com/jgscott/helloPG).  An R package skeleton for incorporating the Polya-Gamma distribution into your own code or package.  Not a package per se, and thus not on CRAN.  This uses the PG simulation routines originally written by Jesse for BayesLogit (see below).

[BayesLogit:][1] Bayesian modeling of discrete outcomes via
logistic and negative-binomial regression using Polya-Gamma data
augmentation. All the hard work by [Jesse Windle. ][2]  

[ BayesBridge:][3] Bayesian bridge regression. All the hard work by [Jesse Windle](https://github.com/jwindle).  
  

   [1]: http://cran.r-project.org/web/packages/BayesLogit/index.html
   [2]: http://users.ices.utexas.edu/~jwindle/
   [3]: http://cran.r-project.org/web/packages/BayesBridge/index.html
  
