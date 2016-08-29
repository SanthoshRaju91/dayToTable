/**
* gulpFile.js
* Gulp task runners for minimizing, concatenating, JS lint, SASS compiler, generating CSS and JS files for production build
* Also, for development we have a browser-sync watcher to aid the development process.
*/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
//var autoprefixer = require('gulp-autoprefixer');
var open = require('gulp-open');
var os = require('os');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var minifyJS = require('gulp-uglify');
var livereload = require('gulp-livereload');
var preprocessor = require('gulp-preprocess')
var del = require('del');
var rename = require('gulp-rename');
//var csslint = require('gulp-csslint');
var webpack = require('gulp-webpack');

var APP_PATH = {
  js: './js/boot.js',
  template: './templates/**/*.html',
  html: './*.html',
  jsWatchFile: './app/**/*.js'
}

var BUILD_PATH_SRC = {
  js: './**/*.js',
  css: './styles/*.css',
  templates: './templates/**/*.html',
  html: './index.html',
  assets: './img/**/*.*'
};

var BUILD_PATH_DEST = {
  js: './dist',
  css: './dist',
  templates: './templates/',
  html: './dist',
  assets: './dist/assets'
};

var VENDOR_PATH = {
  src: {
    css: './vendor/**/*.css',
    js: './vendor/**/*.js'
  },
  dest: {
    css: './dist/vendor',
    js: './dist/vendor'
  }
};


/*
* @task: vendor:js/
* gulp task to process vendor js files for production dist folder
*/
gulp.task('vendor:js', function() {
  return gulp.src(VENDOR_PATH.src.js)
    .pipe(concat('vendor.js'))
    .pipe(minifyJS())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest(VENDOR_PATH.dest.js));
});

/*
* @task: vendor:css
* gulp task to process vendor css file for production dist folder
*/
gulp.task('vendor:css', function() {
    return gulp.src(VENDOR_PATH.src.css)
      .pipe(concat('vendor.css'))
      .pipe(rename('vendor.min.css'))
      .pipe(gulp.dest(VENDOR_PATH.dest.css));
});

/*
* @task: build:js
* gulp task to process dev js files and minify for production.
*/
gulp.task('build:js', function() {
  return gulp.src(BUILD_PATH_SRC.js)
    .pipe(minifyJS())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest(BUILD_PATH_DEST.js));
});

/*
* @task: build:css
* gulp task to process dev css files and minify for production
*/
gulp.task('build:css', function() {
  return gulp.src(BUILD_PATH_SRC.css)
  .pipe(minifyCSS())
  .pipe(rename('app.min.css'))
  .pipe(gulp.dest(BUILD_PATH_DEST.css));
});

/*
* @task: build:template
* gulp task to process angular route templates for production.
*/
gulp.task('build:template', function() {
  return gulp.src(BUILD_PATH_SRC.templates)
    .pipe(gulp.dest(BUILD_PATH_DEST.templates));
});

/*
* @task: build:html
* gulp task for process index.html file for production
*/
gulp.task('build:html', function() {
  return gulp.src(BUILD_PATH_SRC.html)
    .pipe(preprocessor({context: {NODE_ENV: 'production', DEBUG: true}}))
    .pipe(BUILD_PATH_DEST.html);
});

/*
* @task: build:assets
* gulp task for process all the application assets from dev to prodction dist folder
*/
gulp.task('build:assets', function() {
  return gulp.src(BUILD_PATH_SRC.assets)
    .pipe(BUILD_PATH_DEST.assets);
});


gulp.task('js', function() {
  return gulp.src(APP_PATH.js)
    .pipe(webpack())
    .pipe(rename('app.bundle.js'))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('template', function() {
  return gulp.src(APP_PATH.template)
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src(APP_PATH.html)
    .pipe(livereload());
});

gulp.task('watch', function() {
  require('./server.js');
  livereload.listen();
  gulp.watch(APP_PATH.jsWatchFile, ['js']);
  gulp.watch(APP_PATH.template, ['template']);
  gulp.watch(APP_PATH.html, ['html']);
});

/*
  configuring the default app browser for dev:open task
*/
const platform = os.platform();
var browser = platform === 'linux' ? 'google-chrome': (platform === 'darwin' ? 'google chrome': (platform === 'win32' ? 'chrome' : 'firefox'));


/*
  @task dev:open
  dev open task for opening the application in the default browser automatically
*/
gulp.task('open', function() {
  var options = {
    uri: 'http://localhost:9000',
    app: browser
  };
  gulp.src('./index.html')
    .pipe(open(options));
});

/*
* Gulp prodction build task to minify JS, CSS and preprocessing index.html file to process only the production scripts and stylesheets
*/
gulp.task('build', ['build:js', 'build:css', 'build:templates', 'build:html', 'build:assets']);

gulp.task('default', ['watch', 'open']);
