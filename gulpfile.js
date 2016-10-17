var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var changed   = require('gulp-changed');
var imgresize = require('gulp-image-resize');
var imgmin    = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');
var watch     = require('gulp-watch');

var img_src = './srcimage/*.+(jpg|jpeg|png|gif|JPG|PNG)';
var img_dest = 'destimage';
//var img_dest = './srcimage/destimage';  //srcの下層に入れた方が都合のいい場合もある

//リサイズオプション
var resizeOptions = {
  width       : 800,
  upscale     : false,
  imageMagick : true
};

//圧縮オプション
var imageminOptions = {
  optimizationLevel: 4,
  use: [pngquant({quality: '90-100', speed: 1})]
};

// 画像リサイズ＆圧縮
gulp.task( 'image-optim', function(){
  gulp.src(img_src)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(changed( img_dest ))
    .pipe(imgresize( resizeOptions ))
    .pipe(imgmin( imageminOptions ))
    .pipe(gulp.dest( img_dest ))
});

// 監視
gulp.task('watch',['image-optim'], function() {
    watch(img_src,function() {
      gulp.start('image-optim');
    });
});

// デフォルトタスク
gulp.task('default', ['watch']);
