import gulp from "gulp";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import terser from "gulp-terser";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import less from "gulp-less";
import rename from "gulp-rename";
import browser from "browser-sync";

const styles = () => {
  return gulp
    .src("src/less/app.less", { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

const html = () => {
  return gulp.src("src/*.html").pipe(gulp.dest("build"));
};

const scripts = () => {
  return gulp
    .src("src/js/*.js")
    .pipe(terser())
    .pipe(gulp.dest("build/js"))
    .pipe(browser.stream());
};

const copyFonts = (done) => {
  gulp
    .src(["src/fonts/*.{woff2,woff,otf}"], {
      base: "src",
    })
    .pipe(gulp.dest("build"));
  done();
};

const copyImages = () => {
  return gulp
    .src("src/images/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/images"));
};

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const reload = (done) => {
  browser.reload();
  done();
};

const watcher = () => {
  gulp.watch("src/less/**/*.less", gulp.series(styles, reload));
  gulp.watch("src/*.html", gulp.series(html, reload));
  gulp.watch("src/js/*.js", gulp.series(scripts, reload));
};

export default gulp.series(
  copyFonts,
  copyImages,
  gulp.parallel(styles, html, scripts),
  gulp.series(server, watcher)
);
