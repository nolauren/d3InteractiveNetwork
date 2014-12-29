d3InteractiveNetwork
====================

This is a set of code snippets to generative an interactive
network from R and publish it on github pages. The graph 
code is from the [signs at 40](http://signsat40.signsjournal.org/cocitation/)
project. For the current working version on this repository
see [the project github pages](http://nolauren.github.io/d3InteractiveNetwork).

In order to use this locally, you can clone the repository
and run the included example R script. It can be modified
to accommodate new data sources.
```sh
git clone https://github.com/nolauren/d3InteractiveNetwork
Rscript example.R
open index.html
```
Some browsers will refuse to load data running on localhost;
on a mac Chrome causes some difficulty by safari seems to 
work fine.

Alternatively, you can create a fork of the project and clone
that instead. Then, after running the R code the following
two commands:
```sh
make add
make pub
```
Will push the content to github pages, making your work shareable
across the web at *username*.github.io/d3Interactive; it may take
up to 30 minutes after the first time you run this to be available,
though afterward update usually get pushed in a matter of seconds.
