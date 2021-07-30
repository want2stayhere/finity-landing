var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var pug = require('gulp-pug');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var SourceMap = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var htmlmin = require('gulp-html-minifier');
var cache = require('gulp-cache');
var gulpsync = require('gulp-sync')(gulp);
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const size = require('gulp-size');


// Compile stylus,add prefixes, minify css, reload browser and notify
gulp.task('stylus', function() {
	return gulp.src('app/stylus/*.styl') // source folder
		.pipe(SourceMap.init())
		.pipe(stylus().on('error', notify.onError({
			message: "<%= error.message %>",
			title: "Stylus Error!"
		}))) // error notification
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		})) // add prefix
		.pipe(rename('style.css'))
		.pipe(SourceMap.write('.')) //Create source map
		.pipe(gulp.dest('app/css')) //destination folder
		// .pipe(browserSync.reload({
		//   stream: true
		// })) // browser reload styles
		// .pipe(notify('Stylus compiled')); // uncomment this line for "success" notify
});

// Compile Pug and reload
gulp.task('pug', function() {
	return gulp.src('app/pug/*.pug') // source folder
		.pipe(pug({
			pretty: true
		})) //compile pug
		.pipe(gulp.dest('app')) // destination folder
		// .pipe(browserSync.reload({
		//   stream: true,
		//   once: true
		// })) // browser refresh
});

// refresh browser
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

//delete "docs" map
gulp.task('clean', function() {
	return gulp.src('docs', {
			read: false
		})
		.pipe(clean());
});



//copy images to docs/img
gulp.task('copyimages', function() {
	return gulp.src('app/img/**/*.*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('docs/img'));
});

// copy fonts to docs/fonts
gulp.task('copyfonts', function() {
	return gulp.src('app/fonts/**/*.*')
		.pipe(gulp.dest('docs/fonts'));
});

//copu html, css, js, change name and path with useref and copy to docs, all is minify
gulp.task('copyhtml', function() {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(htmlmin({
			collapseWhitespace: true,
			// preserveLineBreaks: true,
			removeComments: true
		}))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('docs'));
});

//
gulp.task('default', ['stylus', 'pug', 'browser-sync'],
	function() {
		gulp.watch('app/stylus/**/*.styl', ['stylus-watch']); //watch stylus files
		gulp.watch('app/pug/**/*.pug', ['pug-watch']); //watch pug files
	});

//tasks for relaod page after compile pug and stylus
gulp.task('pug-watch', ['pug'], function(done) {
	browserSync.reload();
	done();
});
gulp.task('stylus-watch', ['stylus'], function(done) {
	browserSync.reload();
	done();
});



//comppile stylus and pug
gulp.task('compile', gulpsync.sync(['stylus', 'pug']));


// build project in "docs map"
gulp.task('build', gulpsync.sync(['compile', 'clean', 'copyhtml', 'copyimages','copyfonts']));
