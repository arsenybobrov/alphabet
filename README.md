# alphabet
simple setup | pug, gulp, scss, js concat, local server and live reload

### install:
- npm install

### dev:
- gulp dev

### pug vs. html:
work in src/*.html files OR use pug templating in src/pug/*.pug. don't do both ;)

### build if working with pug:
- gulp build

### build if working inside html:
- gulp build-html

### handle vendors:
- update array in gulpfile.js, var vendors

### handle vendors if working inside html:
- update vendors import in .html file(s)

### handle vendors if working with pug:
- update vendors import in src/pug/components/siteframe.pug