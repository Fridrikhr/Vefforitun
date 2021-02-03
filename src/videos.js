import { readFile } from 'fs/promises';
import express from 'express';
export const router = express.Router();

//Þessi föll, getContent, index og videos færa uppl úr json yfir í ejs filana, þannig hægt sé að vinna með þá þar
async function getContent(req, res){
let data = '';
try {
  data = await readFile('./videos.json');
  return await JSON.parse(data);

} catch (e) {
  console.error('error', e);
  return res.status(500).send('Villa');
}
/*nota fs og parsa yfir í json,
  returnar data fyrir index,
  Gerir sama og content að ofan
*/
};


async function index(req, res){
  //setja öll video í data í videos

  const data = await getContent();
  const {videos,categories} = data;


  await res.render('index', {title: 'Forsíða!', videos, categories});
};


async function videos(req, res){
  const { id } = req.params;
  const data = await getContent();

  const video = data.videos.find((video) => video.id === parseInt(id));

  res.render('videos', {title: 'Videos!', video});

};


//for each inn í template, senda videos og categories

router.get('/', (req, res) => {
  //allt í render verður aðgengilegt í template
  index(req, res);
  //res.render('videos', {title: 'Videos!'});

});

router.get('/:id', (req, res) => {
  videos(req, res);
})





