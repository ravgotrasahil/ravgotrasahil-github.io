---
layout: default
title: Home
---

<style>
img {
    float: left;
    margin: 0px 20px 15px 0px;
}
</style>

<div class="home">

    <div class="content">
      <article >

### About me
![Image](/files/scott_james_IMG_6450_cropped.png)
Hi, I'm James Scott.  I am a statistician and data scientist at the University of Texas at Austin.  My research interests are
mainly in modern computational methods and in Bayesian inference.
I’ve done recent work on data-augmentation schemes for Bayesian
computation; scalable algorithms; multiple testing and
high-dimensional screening problems; prior choice in hierarchical
models; and Bayesian methods in machine learning.  See my
<a href="/papers.html">Papers</a> and <a href="/software.html">Software</a> pages for more
detail.  

My recent collaborative projects have involved applications in health
care, security, and neuroscience.  I’ve also done work in linguistics,
political science, infectious disease, astronomy, and molecular
biology.  
 
[CV](files/jamesscottcv.pdf), [GitHub](https://github.com/jgscott),
[Google Scholar](http://scholar.google.com/citations?user=Ww_1EOMAAAAJ)

### Affiliations
Department of Information, Risk, and Operations Management (McCombs
School of Business)  
Department of Statistics and Data Sciences (College of Natural
Sciences)  


### Contact information
James G. Scott   
Assistant Professor of Statistics   
University of Texas at Austin  
2110 Speedway, B6500  
Austin, Texas 78712  
(512) 471-5905  
james.scott@mccombs.utexas.edu  
Office: CBA 6.478   


### Education
Ph.D in Statistics, Duke University (2009)  
M.A.St in Mathematics, University of Cambridge (2005)  
B.S in Mathematics, University of Texas (2004)  

  </section>

</article>
    </div>


    
  <div class="posts">


    {% for post in paginator.posts %}
    <div class="post-teaser">
    
      <header>
        <h1>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        </h1>
        
        <p class="meta">{{ post.date | date: "%B %-d, %Y" }}</p>
      </header>

      <div class="excerpt">
        {{ post.excerpt }}

        <a class="button" href="{{ post.url | prepend: site.baseurl }}">{{ site.theme.str_continue_reading }}</a>
      </div>
      
    </div>
    {% endfor %}
  </div>

  {% if paginator.total_pages > 1 %}
  <div class="pagination">
  
    {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}" class="button" >
      <i class="fa fa-chevron-left"></i> 
      {{ site.theme.str_prev }}
    </a>
    
    {% else %}
    <span class="button disabled" class="button" >
      <i class="fa fa-chevron-left"></i> 
      {{ site.theme.str_prev }}
    </span>
    {% endif %}

    {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}" class="button" >
      {{ site.theme.str_next }} 
      <i class="fa fa-chevron-right"></i>
    </a>
    
    {% else %}
    <span class="button disabled" >
      {{ site.theme.str_next }} 
      <i class="fa fa-chevron-right"></i>
    </span>
    {% endif %}
  </div>
  {% endif %}
</div>
