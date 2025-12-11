# Baileys WhatsApp Backend

## Installation

### Prerequisites
1. **Install Git for Windows** (Required for @whiskeysockets/baileys)
   - Download: https://git-scm.com/download/win
   - During installation, select "Git from the command line and also from 3rd-party software"
   - Restart terminal after installation

### Install Dependencies
```bash
cd backend
npm install @whiskeysockets/baileys qrcode --legacy-peer-deps
```

## Running the Server

```bash
node server_baileys.js
```

Server will start on: `http://localhost:5001`

## API Endpoints

### 1. Generate QR Code
```
GET http://localhost:5001/generate-qr
```

**Response:**
```json
{
  "qr": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

### 2. Get All Messages
```
GET http://localhost:5001/messages
```

**Response:**
```json
{
  "messages": [
    {
      "from": "919876543210@s.whatsapp.net",
      "message": "Hello",
      "timestamp": "2025-12-11T11:30:00.000Z"
    }
  ]
}
```

### 3. Send Message
```
POST http://localhost:5001/send-message
Content-Type: application/json

{
  "number": "919876543210",
  "message": "Hello from Baileys!"
}
```

**Response:**
```json
{
  "status": "sent"
}
```

## How It Works

1. **Server starts** → Baileys connects to WhatsApp
2. **QR Code generated** → Call `/generate-qr` to get Base64 QR
3. **Scan QR** → Use WhatsApp mobile app
4. **Connection established** → Session saved in `auth_info/` folder
5. **Auto-reconnect** → If disconnected, automatically reconnects
6. **Incoming messages** → Stored in memory array
7. **Send messages** → Use `/send-message` endpoint

## Folder Structure

```
backend/
├── auth_info/           # WhatsApp session files (auto-created)
├── whatsapp.js          # Baileys client logic
├── server_baileys.js    # Express server
├── package.json
└── README_BAILEYS.md    # This file
```

## Notes

- Session files are stored in `auth_info/` directory
- QR code expires after ~60 seconds, regenerate if needed
- Once connected, session persists across restarts
- Messages are stored in memory (add database integration later)
