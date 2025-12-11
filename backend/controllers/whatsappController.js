import * as whatsappService from '../services/whatsappService.js';

/**
 * Generate QR code for WhatsApp connection
 * POST /whatsapp/generate-qr
 */
export const generateQR = async (req, res) => {
    try {
        const userId = req.user.user_id || req.user.id;

        console.log(`📱 [Generate QR] Request from user: ${userId}`);

        const result = await whatsappService.initializeClient(userId);

        res.json({
            data: {
                status: result.status,
                qrCode: result.qrCode,
                sessionId: result.sessionId,
                phoneNumber: result.phoneNumber
            },
            error: null
        });

    } catch (error) {
        console.error('❌ [Generate QR] Error:', error);
        res.status(500).json({
            data: null,
            error: 'Failed to generate QR code. Please try again.'
        });
    }
};

/**
 * Get WhatsApp session status
 * GET /whatsapp/status
 */
export const getStatus = async (req, res) => {
    try {
        const userId = req.user.user_id || req.user.id;

        const result = await whatsappService.getSessionStatus(userId);

        res.json({
            data: {
                status: result.status,
                qrCode: result.qrCode,
                phoneNumber: result.phoneNumber,
                connectedAt: result.connectedAt,
                lastQRGeneratedAt: result.lastQRGeneratedAt,
                message: result.message
            },
            error: null
        });

    } catch (error) {
        console.error('❌ [Get Status] Error:', error);
        res.status(500).json({
            data: null,
            error: 'Failed to get session status'
        });
    }
};

/**
 * Simulate WhatsApp connection (for testing)
 * POST /whatsapp/simulate-connect
 */
export const simulateConnect = async (req, res) => {
    try {
        const userId = req.user.user_id || req.user.id;
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({
                data: null,
                error: 'Phone number is required'
            });
        }

        console.log(`📱 [Simulate Connect] User ${userId} connecting with ${phoneNumber}`);

        const result = await whatsappService.simulateConnection(userId, phoneNumber);

        res.json({
            data: {
                status: result.status,
                phoneNumber: result.phoneNumber,
                message: 'WhatsApp connected successfully'
            },
            error: null
        });

    } catch (error) {
        console.error('❌ [Simulate Connect] Error:', error);
        res.status(500).json({
            data: null,
            error: 'Failed to simulate connection'
        });
    }
};

/**
 * Disconnect WhatsApp session
 * DELETE /whatsapp/disconnect
 */
export const disconnect = async (req, res) => {
    try {
        const userId = req.user.user_id || req.user.id;

        console.log(`🔌 [Disconnect] User ${userId} disconnecting WhatsApp`);

        const result = await whatsappService.disconnectClient(userId);

        res.json({
            data: {
                status: result.status,
                message: result.message
            },
            error: null
        });

    } catch (error) {
        console.error('❌ [Disconnect] Error:', error);
        res.status(500).json({
            data: null,
            error: 'Failed to disconnect WhatsApp session'
        });
    }
};
