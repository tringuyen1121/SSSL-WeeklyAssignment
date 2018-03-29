const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const jsonFile = require('jsonfile');
const exif = require('exif');
const sharp = require('sharp');

const app = express();
const upload = multer({ dest: 'uploads/' });
const exifImage = exif.ExifImage;

const SERVER_URL = "http://localhost:4000/";

app.use(cors());
moment.locale('fi');

app.use(express.static('public'));

// Setup db connection
mongoose.connect('mongodb://localhost:27017/week2').then(() => {
  console.log('Connect to database successfully.');
  app.listen(4000);
}, err => {
  console.log('Connect to db failed: ' + err);
});

// -- Setup schema
const Schema = mongoose.Schema;
const imageSchema = new Schema({
  id: Number,
  time: Date,
  category: String,
  title: String,
  details: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  thumbnail: String,
  image: String,
  original: String
});

// Setup Model
const Image = mongoose.model('Image', imageSchema);

app.get('/', (req, res) => {
  res.send('Server up!');
});

// add new image
app.post('/new', upload.single('file'), function (req, res, next) {
  req.body.time = moment();
  req.body.original = 'original/' + req.file.filename;
  req.body.coordinates = JSON.parse(req.body.coordinates);
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(res.file));
  next();
});

// get all images
app.get('/images/', (req, res) => {
  const modImages = [];
  Image.find().then(images => {
    images.forEach(image => {
      image.image = SERVER_URL + image.image;
      image.thumbnail = SERVER_URL + image.thumbnail;

      modImages.push(image);
    });
    res.send(modImages);
  });
});

// get coordinates from EXIF
app.use((req, res, next) => {
  try {
    new ExifImage({ image: req.file.path }, function (error, exifData) {
      if (error) {
        console.log('Error: ' + error.message);
        next();
      } else {
        console.log(JSON.stringify(exifData.gps));
        req.body.coordinates = {
          lat: gpsToDecimal(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef),
          lng: gpsToDecimal(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef),
        };
        next();
      }
    });
  } catch (error) {
    console.log('Error: ' + error.message);
    next();
  }
});

// make small thumbnail
app.use((req, res, next) => {
  const thumbPath = 'thumb/' + req.file.filename + ".png";

  sharp(req.file.path).
    resize(320, 300).
    toFile("public/" + thumbPath, (err, info) => {
      if (err) console.log(err);
      if (info) console.log(info);
      req.body.thumbnail = thumbPath;
      console.log(JSON.stringify(req.body));
      next();
    });
});

// make medium thumbnail
app.use((req, res, next) => {
  const medPath = 'img/' + req.file.filename + ".png";

  sharp(req.file.path).
    resize(770, 720).
    toFile("public/" + medPath, (err, info) => {
      if (err) console.log(err);
      if (info) console.log(info);
      req.body.image = medPath;
      console.log(JSON.stringify(req.body));
      next();
    });
});

// save to data.json
app.use((req, res, next) => {
  const file = 'data.json';
  console.log(`Save data to file ${file}...`)

  let json = null;
  jsonFile.readFile(file, (err, obj) => {
    if (obj === undefined) {
      json = [];
    } else {
      json = obj;
    }
    json.push(req.body);
    jsonFile.writeFile(file, json, (err) => {
      if (err) console.error(err);
      else console.log("Save data to json file successfully!")
      next()
    });
  });
});

// save data to db
app.use((req, res, next) => {
  console.log("Save data to db...")
  Image.create(req.body).then(post => {
    console.log(post.id)
  })
});

// helper functions
// convert GPS coordinates to GoogleMaps format
const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
    parseFloat(gpsData[2] / 3600);
  return (hem == 'S' || hem == 'W') ? d *= -1 : d;
};
