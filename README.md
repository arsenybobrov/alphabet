# alphabet
simple setup | pug, gulp, scss, js concat, local server and live reload

### install:
```npm install```

### pug vs. html:
work in src/*.html files OR use pug templating in src/pug/*.pug. don't do both ;)
delete src/__dummy.html if working with pug.

add pug mixins into src/pug/components/siteframe.pug

### dev if working inside html:
```gulp dev-html```

### build if working with pug:
```gulp dev```

### build if working with pug:
```gulp build```

### build if working inside html:
```gulp build-html```

### deploy:
deploy the generated dist directory

### handle vendors:
update array in gulpfile.js, var vendors

### handle vendors if working inside html:
update vendors import in .html file(s)

### handle vendors if working with pug:
- update vendors import in src/pug/components/siteframe.pug

# license:
MIT. Copyright (c) 2018 Arseny Bobrov