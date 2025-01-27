const qr = require("qr-image");

export default function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).send("Text query parameter is required");
  }

  try {
    const qrCode = qr.imageSync(text, { type: "png" });
    res.setHeader("Content-Type", "image/png");
    res.status(200).send(qrCode);
  } catch (error) {
    res.status(500).send("Error generating QR Code");
  }
}
