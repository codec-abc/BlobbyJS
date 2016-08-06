var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var electron = require('gulp-electron');
var run = require('gulp-run');

gulp.task('default', function(callback)
{
    runSequence('less','copyHtml','copyLib','copyResources','compileForElectron', 'copyElectronPackageFile', callback);
});

gulp.task('buildAndRun', function(callback)
{
    runSequence('default','openInElectron', callback);
});

gulp.task('web', function(callback)
{
    runSequence('less','typescriptWeb', callback);
});

gulp.task('less', function () 
{
    gulp.src('css/all.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

gulp.task('compileForElectron', function () 
{
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src().pipe(ts(tsProject));
    tsResult.pipe(gulp.dest('build/'));
});

gulp.task('compileForWeb', function () 
{
    var tsProject = ts.createProject('tsconfig.json', {module : "amd"});
    var tsResult = tsProject.src().pipe(ts(tsProject));
    tsResult.pipe(gulp.dest('build/'));
});

gulp.task('copyHtml', function () 
{
    gulp.src('html/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('copyResources', function () 
{
    gulp.src('resources/**')
    .pipe(gulp.dest('build/resources'));
});

gulp.task('copyLib', function () 
{
    gulp.src('lib/**')
    .pipe(gulp.dest('build/lib'));
});

gulp.task('copyElectronPackageFile', function () 
{
    gulp.src('electronPackage/**')
    .pipe(gulp.dest('build'));
});

gulp.task('openInElectron', function()
{
    return run('electron .').exec();
});

