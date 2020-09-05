const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const webp = require('gulp-webp');
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const del = require("del");


// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
    autoprefixer()
  ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//html

const html = () => {
  return gulp.src(["source/*.html"], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);


// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
  imagemin.optipng({
        optimizationLevel: 3
      }),
  imagemin.mozjpeg({
        progressive: true
      }),
  imagemin.svgo()
  ]))
    .pipe(gulp.dest("build/img"));
}
exports.images = images;

// Webp

const webpimages = () => {
  return gulp.src('build/img/*.{jpg,png}')
    .pipe(webp())
    .pipe(gulp.dest('build/img'));
}

exports.webpimages = webpimages;

// SVGsprite

const sprite = () => {
  return gulp.src("build/img/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

//Copy

const copy = () => {
  return gulp.src([
  "source/fonts/**/*.{woff,woff2}",
  "source/img/**",
  "source/js/**",
  "source/*.ico"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
}
exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};
exports.clean = clean;
