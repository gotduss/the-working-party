var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
const server = require('browser-sync').create();

var paths = {
	styles: {
		src: ['./src/scss/app.scss'],
		dest: './dist/'
	},
	scripts: {
		src: './src/scripts/app.js',
		dest: './dist/'
	}
}

function styles() {
	var plugins = [
		autoprefixer({browsers: ['last 2 version']}),
		cssnano()
	];
	return gulp.src(paths.styles.src)
		.pipe($.sourcemaps.init())
		.pipe( $.sass().on('error', $.sass.logError) )
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(server.stream({stream: true}))
		.pipe($.postcss(plugins))
		.pipe($.purgeSourcemaps())
		.pipe($.rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(server.stream({stream: true}));
}
exports.styles = styles;

function scripts() {
	return gulp.src([paths.scripts.src])
		.pipe($.sourcemaps.init())
		.pipe($.babel({
			presets: ['@babel/env']
		}))
		.pipe($.concat('app.js'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe($.rename('app.min.js'))
		.pipe($.uglify())
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(paths.scripts.dest));
}
exports.scripts = scripts;

function watch() {
	gulp.watch( ['./src/scss/**/*.scss'] , styles);
	gulp.watch( ['./src/scripts/**/*.js'] , scripts);
	gulp.watch( ['./dist/**/*.js', './**/*.php', './**/*.twig'] , reload);
}
exports.watch = watch;

function reload(done) {
	server.reload();
	done();
}

exports.dev = gulp.series(scripts, styles, watch);

exports.build = gulp.series(scripts, styles);