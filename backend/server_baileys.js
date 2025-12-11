import express from 'express';
import cors from 'cors';
import { connectToWhatsApp, getQRCode, getSocket, getMessages } from './whatsapp.js';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Initialize WhatsApp connection on server start
connectToWhatsApp();

// GET /generate-qr
app.get('/generate-qr', async (req, res) => {
    const qr = getQRCode();

    if (qr) {
        res.json({ qr });
    } else {
        res.json({ qr: null, message: 'Already connected or QR not ready yet' });
    }
});

// GET /messages
app.get('/messages', (req, res) => {
    const allMessages = getMessages();
    res.json({ messages: allMessages });
});

// POST /send-message
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({ error: 'Number and message are required' });
    }

    const sock = getSocket();

    if (!sock) {
        return res.status(500).json({ error: 'WhatsApp not connected' });
    }

    try {
        const jid = `${number}@s.whatsapp.net`;
        await sock.sendMessage(jid, { text: message });
        res.json({ status: 'sent' });
    } catch (error) {
        console.error('❌ Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Baileys WhatsApp Backend running on http://localhost:${PORT}`);
});
