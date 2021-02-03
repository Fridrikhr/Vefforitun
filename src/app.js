import express from 'express';
import { router } from './videos.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { videoAge } from './age.js';
const app = express();
const port = 3000;
const host ='127.0.0.1';

app.use(express.static('./public'));

app.use('/', router);


app.set('views', './views');
app.set('view engine', 'ejs');
app.locals.videoAge = videoAge;

//Error handling
function notFoundHandler(req, res, next) {
  res.status(404).send('404 Not Found');
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('Villa!');
}

app.use(notFoundHandler);
app.use(errorHandler);

const path = dirname(fileURLToPath(import.meta.url));

app.listen(port, () => console.log('Server @ http://${host}:${port}/'));
