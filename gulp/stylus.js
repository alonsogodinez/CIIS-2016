var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');

module.exports = {
    compile : compile,
    cssBuild: build,
    watchStylus : watchStylus,
    watchCss : watchCss
};

function compile (){

    gulp.src('src/stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('src/public/css'))

}

function build(){
  gulp.src('src/public/css/*.css')
  .pipe(plumber())
  .pipe(minifyCSS())
  .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest('src/public/css/build'))
  .pipe(livereload());

}

function watchStylus () {
    gulp.watch('src/stylus/*.styl',compile);
}

function watchCss(){
  gulp.watch(['src/public/css/*.css', '!src/public/css/build/*.css'],build)
}

