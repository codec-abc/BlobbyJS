var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var run = require('gulp-run');
var webserver = require('gulp-webserver');

gulp.task('build', function(callback)
{
    runSequence('less','copyHtml','copyLib','copyResources','compile', 'copyElectronPackageFile', callback);
});

gulp.task('runElectron', function(callback)
{
    runSequence('build','openInElectron', callback);
});

gulp.task('runWeb', function(callback)
{
    runSequence('build','runWebServer', callback);
});

gulp.task('less', function () 
{
    return gulp.src('css/all.less').pipe(less()).pipe(gulp.dest('build/css'));
});

gulp.task('compile', function () 
{
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src().pipe(ts(tsProject));
    return tsResult.pipe(gulp.dest('build/'));
});

gulp.task('copyHtml', function () 
{
    return gulp.src('html/*.html').pipe(gulp.dest('build/'));;
});

gulp.task('copyResources', function () 
{
    return gulp.src('resources/**').pipe(gulp.dest('build/resources'));
});

gulp.task('copyLib', function (callback) 
{
    return gulp.src('lib/**').pipe(gulp.dest('build/lib'));
});

gulp.task('copyElectronPackageFile', function (callback) 
{
    return gulp.src('electronPackage/**').pipe(gulp.dest('build'));
});

gulp.task('openInElectron', function()
{
    return run('electron .').exec();
});

gulp.task('runWebServer', function()
{
    gulp.src('./build')
    .pipe(webserver(
    {
      directoryListing: 
      {
          enable: true,
          path: './build/index.html'
      },
      open: true
    }));
});

