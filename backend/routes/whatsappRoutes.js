import express from 'express';
import authenticateToken from '../middleware/auth.js';
import * as whatsappController from '../controllers/whatsappController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Generate QR code for WhatsApp connection
router.post('/generate-qr', whatsappController.generateQR);

// Get current session status
router.get('/status', whatsappController.getStatus);

// Simulate WhatsApp connection (for testing without actual WhatsApp)
router.post('/simulate-connect', whatsappController.simulateConnect);

// Disconnect WhatsApp session
router.delete('/disconnect', whatsappController.disconnect);

export default router;
