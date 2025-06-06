const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Modelo Travel
const Travel = mongoose.model('Travel', {
  traveltitle: String,
  travelanotation: String,
  photos: [String],
  photo: String, // fallback legado
  latitude: Number,
  longitude: Number,
  data: Date,
});

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Rota GET para listar todas as viagens
app.get('/travel', async (req, res) => {
  try {
    const travels = await Travel.find();
    res.json(travels);
  } catch (err) {
    console.error('Erro ao buscar viagens:', err);
    res.status(500).json({ error: 'Erro ao buscar viagens' });
  }
});

// Rota POST para criar nova viagem com fotos
app.post('/travel', upload.array('photos'), async (req, res) => {
  try {
    const { traveltitle, travelanotation, latitude, longitude, data } = req.body;
    const photos = req.files ? req.files.map(file => file.path) : [];

    const travel = new Travel({
      traveltitle,
      travelanotation,
      photos,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      data: new Date(data),
    });

    await travel.save();
    res.json(travel);
  } catch (error) {
    console.error('Erro ao salvar viagem:', error);
    res.status(500).json({ error: 'Erro ao salvar viagem' });
  }
});


// Rota GET para retornar todas as fotos com localização
app.get('/photos', async (req, res) => {
  try {
    const travels = await Travel.find({}, 'traveltitle photos photo latitude longitude _id');

    const photos = [];

    travels.forEach(travel => {
      if (Array.isArray(travel.photos) && travel.photos.length > 0) {
        travel.photos.forEach(photoPath => {
          const normalizedPath = photoPath.replace(/\\/g, '/');
          photos.push({
            travelId: travel._id, // <-- ID da viagem
            location: travel.traveltitle || 'Sem título',
            photoUrl: `http://192.168.1.3:3000/${normalizedPath}`,
            latitude: travel.latitude,
            longitude: travel.longitude,
          });
        });
      } else if (travel.photo) {
        const normalizedPath = travel.photo.replace(/\\/g, '/');
        photos.push({
          travelId: travel._id, // <-- ID da viagem
          location: travel.traveltitle || 'Sem título',
          photoUrl: `http://192.168.1.3:3000/${normalizedPath}`,
          latitude: travel.latitude,
          longitude: travel.longitude,
        });
      }
    });

    res.json(photos);
  } catch (err) {
    console.error('Erro ao buscar fotos:', err);
    res.status(500).json({ error: 'Erro ao buscar fotos' });
  }
});

// Inicia o servidor
app.listen(3000, () => console.log('✅ Backend ouvindo na porta 3000'));
