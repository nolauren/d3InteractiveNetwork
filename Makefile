pub:
	git checkout gh-pages
	git add *
	git commit -m "auto publish github pages"
	git push origin gh-pages
	git checkout master
