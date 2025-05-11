.PHONY: install clean build serve

bundle-install:
	bundle install

jekyll-clean: bundle-install
	bundle exec jekyll clean

jekyll-build: jekyll-clean
	bundle exec jekyll build

build: jekyll-build

serve:
	bundle exec jekyll serve