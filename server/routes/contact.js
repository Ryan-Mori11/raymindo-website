import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactFilePath = path.join(__dirname, '../data/contact_messages.json');

function saveMessage(messageObj) {
  try {
    let messages = [];
    if (fs.existsSync(contactFilePath)) {
      const raw = fs.readFileSync(contactFilePath, 'utf8');
      messages = JSON.parse(raw);
    }
    messages.unshift(messageObj);
    fs.writeFileSync(contactFilePath, JSON.stringify(messages, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to save message:', err);
    return false;
  }
}

// POST /api/contact - Submit inquiry
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Nama, email, dan pesan wajib diisi.'
    });
  }

  const newMessage = {
    id: `MSG-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    subject: (subject || 'Pertanyaan Layanan Freight').trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  saveMessage(newMessage);

  res.status(201).json({
    success: true,
    message: 'Terima kasih! Pesan dan pertanyaan Anda telah kami terima. Tim PT Raymindo Interbenua Line akan segera menghubungi Anda.',
    data: {
      id: newMessage.id,
      name: newMessage.name,
      createdAt: newMessage.createdAt
    }
  });
});

export default router;
