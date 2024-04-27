const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require(jsonwebtoken);
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect('mongodb+srv://greatstackdev:NU9T1bvit1Lvoc2M@cluster0.d77y0zg.mongodb.net/e-commerce');