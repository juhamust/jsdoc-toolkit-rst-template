var path = require('path'),
    util = require('util'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    package = require('./package.json');

/* Configurations. Note that most of the configuration is stored in
the task context. These are mainly for repeating configuration items */
var config = {
    version: package.version,
    debug: Boolean($.util.env.debug),
    production: Boolean($.util.env.production) || (process.env.NODE_ENV === 'production')
  },
  // Global vars used across the test tasks
  ghostDriver, testServer;

/* Bump version number for package.json */
gulp.task('bump', function() {
  // Fetch whether we're bumping major, minor or patch; default to minor
  var env = $.util.env,
      type = (env.major) ? 'major' : (env.patch) ? 'patch' : 'minor';

  gulp.src(['./package.json'])
    .pipe($.bump({ type: type }))
    .pipe(gulp.dest('./'));
});

/* Serve the web site */
gulp.task('serve', $.serve({
  root: 'dist',
  port: 8080
}));

gulp.task('generate', function() {
  var options = {};

  return gulp.src('./test/myapp/*.js')
    .pipe($.exec('./node_modules/jsdoc/jsdoc --template templates/rst/ --destination ./dist/ <%= file.path %>', options))
    .pipe($.exec.reporter());
});

gulp.task('clean', function() {
  return gulp.src(['dist', 'temp'], { read: false })
    .pipe($.rimraf());
});

gulp.task('watch', ['generate'], function() {

  // Compose several watch streams, each resulting in their own pipe
  gulp.watch('templates/rst/**/*.tmpl', function() {
    return runSequence('generate', 'test');
  });

  // Watch any changes to the dist directory
  $.util.log('Initialise BrowserSync on port 8081');
  browserSync.init({
    files: 'dist/**/*',
    proxy: 'localhost:8080',
    port: 8081
  });
});


gulp.task('default', ['generate']);