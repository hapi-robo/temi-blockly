/**
 * Main backend NodeJS file.
 *
 * Starts an HTTP server.
 *
 * Reference:
 *  https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website
 *
 */

// required libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// instantiate webapp
const app = express();
const port = 8080;

// setup template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/blockly', express.static(path.join(__dirname, '../blockly')));
app.use('/blocks', express.static(path.join(__dirname, '../blocks')));
app.use('/generators', express.static(path.join(__dirname, '../generators')));


/*
 * Setup routes
 */
app.get('/', function(req, res) {
  res.render('index', {
    title: ' temi Blockly',
    version: 'Proof of Concept'
  });
});


/*
 * Save route
 * @TODO Should this be PUT or POST?
 * https://www.w3schools.com/tags/ref_httpmethods.asp
 */
app.post('/save', function(req, res){
  const fs = require('fs');

  code = req.body.code;
  console.log("[Code]");
  console.log(code);
  console.log("Saving...");

  // write code to file
  // https://stackabuse.com/writing-to-files-in-node-js/
  fs.writeFile('../build/test.tbo', code, function(err){
    if (err)
      throw err;
    else
      // execute('cd ../;sh apk_generator.sh build/test.tbo test');
      // execute('cp ../test.apk public/downloads/.')
      // execute('adb connect 192.168.0.164;adb install public/downloads/test.apk');
      console.log("Build finished");
  });

  res.download('../README.md')
  // res.end('It worked!');
  // res.render('index', {
  //   test: ' Hello World',
  // });

  return;
})


/*
 * Catch 404 and forward to the error handler
 */
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/*
 * Catch errors handler and render error page
 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') == 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/*
 * Start listening on the port
 */
app.listen(port, (err) => {
  if (err) {
    return console.log(`Something bad happened ${err}`)
  }

  console.log(`Server is listening on localhost:${port}`)
});


/*
 * Execute a shell command
 * https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
 */
function execute(command) {
  const spawn = require('child_process').spawn;

  spawn(command, {
    stdio: 'inherit',
    shell: true,
    env: { DEFAULT_ANDROID_HOME: '/home/ray/Android/Sdk' }
  })
}