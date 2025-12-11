import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import QRCode from 'qrcode';

let sock = null;
let qrCodeData = null;
const messages = [];

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            qrCodeData = await QRCode.toDataURL(qr);
            console.log('✅ QR Code generated');
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('❌ Connection closed. Reconnecting:', shouldReconnect);

            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp connection opened');
            qrCodeData = null;
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.key.fromMe && m.type === 'notify') {
            console.log('📩 New message:', JSON.stringify(msg, null, 2));
            messages.push({
                from: msg.key.remoteJid,
                message: msg.message?.conversation || msg.message?.extendedTextMessage?.text || 'Media/Other',
                timestamp: new Date()
            });
        }
    });
}

function getQRCode() {
    return qrCodeData;
}

function getSocket() {
    return sock;
}

function getMessages() {
    return messages;
}

export { connectToWhatsApp, getQRCode, getSocket, getMessages };
