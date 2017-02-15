simple_anova = function(lm0) {
	
	# basic anova
	a0 = anova(lm0)
	tv = sum(a0$'Sum Sq')
	
	# The constant-only model
	null_model = c(1, 0, 0, NA, NA)
	a1 = rbind(null_model, a0)
	rownames(a1)[1] = 'Intercept'
	
	# degrees of freedom
	n = sum(a1$Df)
	res_df = sum(a1$Df) - cumsum(a1$Df)
	
	# residual sum of squares: unpredictable variation
	uv = tv - cumsum(a1$'Sum Sq')
	res_se = sqrt(uv/res_df)
	res_se[length(res_se)] = NA
	
	r2 = a1$'Sum Sq'
	r2 = cumsum(r2)/sum(r2)
	a1$'R2' = c(head(r2, -1), NA)
	a1$'R2_improve' = c(NA, diff(head(r2, -1)), NA)
	
	a1$sd = res_se
	a1$'sd_improve' = c(NA, -diff(res_se))
	a1 = a1[, -c(2,3,4)]
	a1 = a1[,c(1,3:6, 2)]
	colnames(a1)[6] = 'pval'
	
	a1
}

coef_table = function(lm0, level = 0.95) { 
	s0 = summary(lm0)
	out2 = cbind(s0$coefficients[,1:2], confint(lm0, level=level))
	out2
}

# calculate sd of each col
sd_cols = function(D) {
	apply(D, 2, sd)
}

