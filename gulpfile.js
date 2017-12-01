var gulp = require('gulp');
var webserver = require('gulp-webserver');
gulp.task('server', function () {
    gulp.src('.')
        .pipe(webserver({
            port: '8888',
            host: 'localhost',
            livereload: true,
            fallback: 'index.html',
            open: true,
        }))
})
gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            port: '8080',
            host: 'localhost',
            middleware: function (req, res, next) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                });
                if (req.url === '/test') {

                    res.end(require('fs').readFileSync('js/data.json'));
                }
            }
        }))
})
gulp.task('default', ['server', 'webserver']);