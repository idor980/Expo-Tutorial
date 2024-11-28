const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3007;

// Serve uploaded files as static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/', // Folder to store uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5 MB
});

// Create an endpoint to upload images
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Log uploaded file details
  console.log('Uploaded File Details:', req.file);

  const { originalname, mimetype, size, path: savedPath } = req.file;

  // Send back the file URL
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.status(200).json({
    message: 'Image uploaded successfully!',
    fileDetails: {
      originalName: originalname,
      mimeType: mimetype,
      size: size,
      savedPath: savedPath,
      fileUrl: fileUrl,
    },
  });
});

// Test API
app.get('/', (req, res) => {
  res.send('Local API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
