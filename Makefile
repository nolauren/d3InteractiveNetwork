add:
	git add *
	git commit -m "auto update"
	git push

pub:
	git checkout gh-pages
	git rebase master
	git push origin gh-pages
	git checkout master
