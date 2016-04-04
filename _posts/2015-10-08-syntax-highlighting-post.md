---
layout: post
title: "Syntax Highlighting Post"
date: 2015-10-08 16:47:00 +0200
excerpt: I've been dabbling with React for a few months now and using it in several small open source projects to better understand the technology. React's focus on reusablility, along with the ability to install and require components via npm, provides an elegant way to rapidly build application UI in an efficient and consistent way. It's also a great way to handle server-side rendering and provides high cohesion between markup and display logic.
categories: code
---
##Set up Webpack

Webpack is a module bundler similar to Browserify, but can also replace front-end build systems like Grunt and Gulp.

First off, you’ll need a webpack.config.js file. The webpack command line interface will use this config file.

{% highlight js %}
// webpack.config.js
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')

module.exports = {
  entry: './entry.js',

  output: {
    filename: 'bundle.js',
    path: __dirname,
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
  ]
}
{% endhighlight %}

To do so let' s open up `src/src_file.cr`. 

{% highlight css %}
/* css/base.css */
@import 'basscss';

:root {
  --font-family: 'Avenir Next', 'Hevletica Neue', sans-serif;
}
{% endhighlight %}

If you’re hosting the static site on gh-pages, you’ll need a way to handle the base url when using React Router’s Link component. I don’t know of a good way to do this yet and would love to hear suggestions on how to improve that.

<figure class="code">
    <script src="https://gist.github.com/arunoda/8558920a9972fa41afa1.js"></script>
    <figcaption>embed github gist</figcaption>
</figure>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam deserunt dignissimos doloremque, ea, exercitationem, facere harum itaque laborum modi nisi possimus quas quibusdam ratione recusandae similique temporibus unde ut voluptatibus?