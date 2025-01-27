const express = require("express");
const qr = require("qr-image");
const path = require("path");

const app = express();
const port = 3000;

// Serve the public folder
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to generate QR code
app.get("/generate-qr", (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).send("Text query parameter is required");
  }

  try {
    const qrCode = qr.image(text, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    qrCode.pipe(res);
  } catch (error) {
    res.status(500).send("Error generating QR Code");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
