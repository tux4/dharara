var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	jshintReporter = require('jshint-stylish'),
	watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps')
    clean = require('gulp-clean');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};

/* Configurations */
var config = {
    'styles': {
        source: './public/styles/',
        dest: './public/styles/',
    },
};

// clean
gulp.task('clean', function() {
    return gulp.src(config.styles.dest + 'site.css', {read: false})
        .pipe(clean());
});

// sass
gulp.task('sass', function() {
    return gulp.src(config.styles.source + 'site.scss')
        .pipe(sourcemaps.init())
            .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.styles.dest));
});

gulp.task('watch:sass', function() {
    gulp.watch(config.styles.source + '**/*.scss', ['sass']);
});

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));

});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});
