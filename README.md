# alphabet
simple setup | pug, gulp, scss, js concat, local server and live reload

### install:
```npm install```

### handle vendors:
update array in ```gulpfile.js```, var vendors

### pug vs. html:
work in ```src/*.html``` files OR use pug templating in ```src/pug/*.pug```. don't do both ;)

# pug
add pug mixins into ```src/pug/components/siteframe.pug```

### handle vendors:
update vendors import in ```src/pug/components/siteframe.pug```

### dev:
```gulp dev```

# html
### handle vendors:
update vendors import in ```*.html``` file(s)

### dev:
```gulp dev-html```

# build:
```gulp build```

# deploy:
deploy the generated ```dist``` directory

# license:
MIT. Copyright (c) 2018 Arseny Bobrov