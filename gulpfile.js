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
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const htmlmin = require('gulp-htmlmin');


// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
    autoprefixer()
  ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
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
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Images

const images = () => {
  return gulp.src("build/img/**/*.{jpg,png,svg}")
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

//HTMLmin

const htmlm = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
};
exports.htmlm = htmlm;

//Jsmin
const jsmin = () => {
  return pipeline(
    gulp.src('source/js/*.js'),
    uglify(),
    gulp.dest('build/js')
  );
};
exports.jsmin = jsmin;

// Build

const build = gulp.series(
  clean, copy, styles, images, sprite, webpimages, jsmin, html
);
exports.build = build;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("jsmin"));
  gulp.watch("build/*.html").on("change", sync.reload);
  gulp.watch("build/css/*.css").on("change", sync.reload);
  gulp.watch("build/js/*.js").on("change", sync.reload);
}

exports.default = gulp.series(
  build, server, watcher
);
