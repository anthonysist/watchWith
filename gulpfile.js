/**
 * Created by Anthony on 4/11/2015.
 */

var gulp = require('gulp'),

//for jade compilation
jade = require('gulp-jade')

//for server
var spawn = require('child_process').spawn,
node;

//Bower components
bower = require('gulp-bower');

//sass
var sass = require('gulp-sass');

gulp.task('jadeCompile', function() {
    var YOUR_LOCALS = {};
    gulp.src('./lib/views/*.jade')
        .pipe(jade({
            pretty: true,
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./deploy'))
});

//run any bower tasks
gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('/lib'));
})

gulp.task('server', function() {
    if (node) node.kill()
    node = spawn('node', ['app.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
})

gulp.task('sass', function () {
    gulp.src('./lib/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./deploy/css'));
});



gulp.task('default', function() {
    gulp.start('jadeCompile', 'server', 'bower');
    //have gulp watch for changes to the app.js file here, restart server if it does
    gulp.watch('./app.js', ['server']);

    // Watch jade files
    gulp.watch('./lib/views/*.jade', ['jadeCompile']);

    // Watch sass files
    gulp.watch('./lib/styles/*.scss', ['sass']);

})


// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
});


