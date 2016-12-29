var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload')

module.exports = {
    compile : compile,
    watch : watch
};

function compile (){

    gulp.src('src/stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('src/public/css'))
    .pipe(livereload());

}

function watch () {
    livereload.listen();
    gulp.watch('src/stylus/*.styl', compile);
}
