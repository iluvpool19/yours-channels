var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');

function handleErrors() {
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, arguments); // eslint-disable-line
  this.emit('end'); // keeps gulp from hanging on this task
}

function buildScript(file) {
  var props = {
    entries: ['./' + file],
    debug: true,
        transform: [
      ['babelify', { presets: ['es2015'] }]
    ]
  };

  var bundler = browserify(props);

  function bundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build'));
  }
  // run it once the first time buildScript is called
  return bundle();
}

gulp.task('default', () => buildScript('./index.js', false)); 

