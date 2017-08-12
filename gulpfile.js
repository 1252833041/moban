var gulp = require('gulp'),
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect');
    const webpack = require('webpack-stream');
    const requireNoCache = require('require-reload')(require);
    const $ = require('gulp-load-plugins')();
    const browserSync = require('browser-sync');
    const reload = browserSync.reload;


gulp.task('gulpLess',function () {
   gulp.src('./less/*.less')
       .pipe(less())
       .pipe(gulp.dest('./css'))
    });

  gulp.task('scripts', ['webpack'], function () {
    gulp.src('./src/index.js')
      .pipe(gulp.dest('./build'))
      .on('end', reload);
  });

gulp.task('webpack', function() {
  let webpackConfig = requireNoCache('./webpack.config.js');
  return gulp.src([`./js/*.js`])
    .pipe($.plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./bulidjs'))
    .on('end', reload);

});

gulp.task('webserver',function(){
   connect.server({
      livereload:true,
        //ip:'192.168.31.110',
      port:8080
   })
});



gulp.task('watch',function(){
    gulp.watch('./less/*.less',['gulpLess']) ;
    gulp.watch('./js/*.js',['scripts']) ;
})
  gulp.task('default',['webserver','watch']);
