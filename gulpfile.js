const gulp = require('gulp');
const postcss = require('gulp-postcss');
const less = require('gulp-less');
const autoprefixer = require('autoprefixer');
// const cssnano = require('gulp-cssnano');

const lessDir = 'docs/examples/comparison-widget';
const targetCSSDir = 'docs/examples/comparison-widget';

gulp.task('css', () => {
  // const configNano = {
  //   autoprefixer: { browsers: 'last 2 versions' },
  //   discardComments: { removeAll: true },
  //   safe: true
  // };

  return gulp.src(lessDir + '/*.less')
    .pipe(less({
      style: 'compressed',
    }))
    .pipe(postcss([autoprefixer()]))
    // .pipe(cssnano(configNano))
    .pipe(gulp.dest(targetCSSDir))
});

gulp.task('watch', () => {
  gulp.watch(lessDir + '/*.less', ['css']);
});

gulp.task('default', ['css']);
