import express from 'express';
import { pool } from '../config/db.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/summary', async (req, res) => {
    try {
        const userId = req.user.user_id;

        const contactsCount = await pool.query('SELECT COUNT(*) FROM contacts WHERE user_id = $1', [userId]);
        const messagesCount = await pool.query('SELECT COUNT(*) FROM messages WHERE user_id = $1', [userId]);
        const lastMessage = await pool.query('SELECT created_at FROM messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1', [userId]);

        const summary = {
            total_contacts: parseInt(contactsCount.rows[0].count),
            total_messages: parseInt(messagesCount.rows[0].count),
            last_message_at: lastMessage.rows.length > 0 ? lastMessage.rows[0].created_at : null
        };

        res.json({ data: summary, error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

export default router;
