import { pool } from '../config/db.js';

// In-memory store for active WhatsApp clients
// In production with whatsapp-web.js, this would store actual Client instances
const activeClients = new Map();

/**
 * Generate a mock QR code for demonstration
 * In production, this would use whatsapp-web.js to generate real QR codes
 */
function generateMockQRCode() {
    // Generate a random session ID
    const sessionId = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create a mock QR code data string (in production, this would be from WhatsApp)
    const qrData = `whatsapp://qr/${sessionId}/${Date.now()}`;

    // In production, you would use the qrcode package to convert this to base64:
    // const QRCode = require('qrcode');
    // const qrBase64 = await QRCode.toDataURL(qrData);

    // For now, return a mock base64 QR code (a simple SVG-based QR pattern)
    const mockQRBase64 = createMockQRCodeBase64(sessionId);

    return {
        qrCode: mockQRBase64,
        sessionId: sessionId
    };
}

/**
 * Create a mock QR code as base64 encoded SVG
 * This simulates what a real QR code would look like
 */
function createMockQRCodeBase64(sessionId) {
    // Create a simple grid pattern to simulate QR code
    const size = 256;
    const gridSize = 16;
    const cellSize = size / gridSize;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    svg += `<rect width="${size}" height="${size}" fill="white"/>`;

    // Create random pattern based on sessionId
    const seed = sessionId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let random = seed;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            // Simple pseudo-random based on position and seed
            random = (random * 1103515245 + 12345) & 0x7fffffff;
            if (random % 2 === 0) {
                svg += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
            }
        }
    }

    // Add corner markers (typical QR code feature)
    const markerSize = cellSize * 3;
    svg += `<rect x="0" y="0" width="${markerSize}" height="${markerSize}" fill="none" stroke="black" stroke-width="2"/>`;
    svg += `<rect x="${size - markerSize}" y="0" width="${markerSize}" height="${markerSize}" fill="none" stroke="black" stroke-width="2"/>`;
    svg += `<rect x="0" y="${size - markerSize}" width="${markerSize}" height="${markerSize}" fill="none" stroke="black" stroke-width="2"/>`;

    svg += '</svg>';

    // Convert to base64
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Initialize WhatsApp client for a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} QR code and session info
 */
export async function initializeClient(userId) {
    try {
        console.log(`📱 Initializing WhatsApp client for user: ${userId}`);

        // Check if session already exists
        const existingSession = await pool.query(
            'SELECT * FROM whatsapp_sessions WHERE user_id = $1',
            [userId]
        );

        // If already connected, return existing session
        if (existingSession.rows.length > 0 && existingSession.rows[0].status === 'connected') {
            console.log(`✅ User ${userId} already has an active WhatsApp session`);
            return {
                status: 'connected',
                phoneNumber: existingSession.rows[0].phone_number,
                qrCode: null
            };
        }

        // Generate new QR code
        const { qrCode, sessionId } = generateMockQRCode();

        // Store or update session in database
        if (existingSession.rows.length > 0) {
            await pool.query(
                `UPDATE whatsapp_sessions 
                 SET status = 'qr_ready', 
                     qr_code = $1, 
                     last_qr_generated_at = NOW(),
                     updated_at = NOW()
                 WHERE user_id = $2`,
                [qrCode, userId]
            );
        } else {
            await pool.query(
                `INSERT INTO whatsapp_sessions 
                 (user_id, status, qr_code, last_qr_generated_at, session_data)
                 VALUES ($1, 'qr_ready', $2, NOW(), $3)`,
                [userId, qrCode, JSON.stringify({ sessionId })]
            );
        }

        // Store client info in memory
        activeClients.set(userId, {
            sessionId,
            status: 'qr_ready',
            createdAt: new Date()
        });

        console.log(`✅ QR code generated for user ${userId}, session: ${sessionId}`);

        return {
            status: 'qr_ready',
            qrCode: qrCode,
            sessionId: sessionId
        };

    } catch (error) {
        console.error(`❌ Error initializing WhatsApp client for user ${userId}:`, error);
        throw error;
    }
}

/**
 * Get current session status for a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Session status and details
 */
export async function getSessionStatus(userId) {
    try {
        const result = await pool.query(
            'SELECT * FROM whatsapp_sessions WHERE user_id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return {
                status: 'not_initialized',
                message: 'No WhatsApp session found. Please generate a QR code first.'
            };
        }

        const session = result.rows[0];

        // Check if QR code is expired (older than 60 seconds)
        if (session.status === 'qr_ready' && session.last_qr_generated_at) {
            const qrAge = Date.now() - new Date(session.last_qr_generated_at).getTime();
            if (qrAge > 60000) {
                // QR expired, generate new one
                console.log(`⏰ QR code expired for user ${userId}, generating new one`);
                return await initializeClient(userId);
            }
        }

        return {
            status: session.status,
            qrCode: session.qr_code,
            phoneNumber: session.phone_number,
            connectedAt: session.connected_at,
            lastQRGeneratedAt: session.last_qr_generated_at
        };

    } catch (error) {
        console.error(`❌ Error getting session status for user ${userId}:`, error);
        throw error;
    }
}

/**
 * Simulate WhatsApp connection (for testing)
 * In production, this would be triggered by actual WhatsApp authentication
 * @param {string} userId - User ID
 * @param {string} phoneNumber - WhatsApp phone number
 */
export async function simulateConnection(userId, phoneNumber) {
    try {
        await pool.query(
            `UPDATE whatsapp_sessions 
             SET status = 'connected',
                 phone_number = $1,
                 connected_at = NOW(),
                 qr_code = NULL,
                 updated_at = NOW()
             WHERE user_id = $2`,
            [phoneNumber, userId]
        );

        // Update in-memory client
        if (activeClients.has(userId)) {
            activeClients.get(userId).status = 'connected';
            activeClients.get(userId).phoneNumber = phoneNumber;
        }

        console.log(`✅ WhatsApp connected for user ${userId}: ${phoneNumber}`);

        return {
            status: 'connected',
            phoneNumber: phoneNumber
        };

    } catch (error) {
        console.error(`❌ Error simulating connection for user ${userId}:`, error);
        throw error;
    }
}

/**
 * Disconnect WhatsApp client for a user
 * @param {string} userId - User ID
 */
export async function disconnectClient(userId) {
    try {
        await pool.query(
            `UPDATE whatsapp_sessions 
             SET status = 'disconnected',
                 disconnected_at = NOW(),
                 updated_at = NOW()
             WHERE user_id = $1`,
            [userId]
        );

        // Remove from active clients
        activeClients.delete(userId);

        console.log(`🔌 WhatsApp disconnected for user ${userId}`);

        return {
            status: 'disconnected',
            message: 'WhatsApp session disconnected successfully'
        };

    } catch (error) {
        console.error(`❌ Error disconnecting client for user ${userId}:`, error);
        throw error;
    }
}

/**
 * Clean up expired sessions (run periodically)
 */
export async function cleanupExpiredSessions() {
    try {
        // Mark sessions as failed if QR code is older than 5 minutes and not connected
        await pool.query(
            `UPDATE whatsapp_sessions 
             SET status = 'failed', updated_at = NOW()
             WHERE status = 'qr_ready' 
             AND last_qr_generated_at < NOW() - INTERVAL '5 minutes'`
        );

        console.log('🧹 Cleaned up expired WhatsApp sessions');
    } catch (error) {
        console.error('❌ Error cleaning up sessions:', error);
    }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredSessions, 5 * 60 * 1000);
