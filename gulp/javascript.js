var gulp = require('gulp');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var obfuscate = require('gulp-obfuscate');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');

module.exports = {
    buildScripts: buildScripts,
    buildPlugins: buildPlugins,
    watch: watch
};

function buildPlugins(){
  gulp.src(['!src/public/bower_components/jquery/sizzle/**/*.js',
            '!src/public/bower_components/jquery/**/*.js',
            'src/public/bower_components/**/*.min.js',
            'src/public/js/*.plugin.min.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
        .pipe(concat('plugins.min.js'))
    .pipe(sourcemaps.write())

    .pipe(gulp.dest('src/public/js/build'))
}

function buildScripts(){
  gulp.src(['!src/public/js/*.min.js','src/public/js/*.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('src/public/js/build'))
    .pipe(livereload())
}

function watch(){
  gulp.watch('src/public/js/*.js', buildScripts);
}


