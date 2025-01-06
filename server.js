const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const appSchema = new mongoose.Schema({
  name: String,
  icon: String,
  description: String,
  url: String,
  status: String,
  notifications: [{
    notification: String,
    time: Date,
    text: String
  }],
  method: String,
  uptime: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

appSchema.pre('save', function(next) {
  if (!this.uptime) {
    this.createdAt = Date.now();
  }
  next();
});

const App = mongoose.model('App', appSchema);

app.get('/api/apps', async (req, res) => {
  try {
    const apps = await App.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/apps', async (req, res) => {
  const app = new App(req.body);
  try {
    const newApp = await app.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/notification/app=:name', async (req, res) => {
  const { name } = req.params;
  const { notification, time, text } = req.body;

  if (!notification || !time || !text) {
    return res.status(400).json({ message: 'Invalid notification data' });
  }

  try {
    const app = await App.findOne({ name });
    if (app) {
      app.notifications.push({ notification, time, text });
      await app.save();
      return res.status(200).json({ message: 'Notification added' });
    } else {
      return res.status(404).json({ message: 'App not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.delete('/api/apps/:name/notifications/:id', async (req, res) => {
  const { name, id } = req.params;

  try {
    const app = await App.findOne({ name });
    if (app) {
      app.notifications.id(id).remove();
      await app.save();
      return res.status(200).json({ message: 'Notification removed' });
    } else {
      return res.status(404).json({ message: 'App not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});