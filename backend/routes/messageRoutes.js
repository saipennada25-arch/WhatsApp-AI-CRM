import express from 'express';
import { pool } from '../config/db.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get messages for a contact
router.get('/:contactId/messages', async (req, res) => {
    try {
        // Verify contact ownership first
        const contactCheck = await pool.query('SELECT * FROM contacts WHERE id = $1 AND user_id = $2', [req.params.contactId, req.user.user_id]);
        if (contactCheck.rows.length === 0) return res.status(404).json({ data: null, error: 'Contact not found' });

        const result = await pool.query(
            'SELECT * FROM messages WHERE contact_id = $1 AND user_id = $2 ORDER BY created_at ASC',
            [req.params.contactId, req.user.user_id]
        );
        res.json({ data: result.rows, error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

// Send message (create 'out' message)
router.post('/:contactId/messages', async (req, res) => {
    try {
        const { content } = req.body;

        // Verify contact ownership
        const contactCheck = await pool.query('SELECT * FROM contacts WHERE id = $1 AND user_id = $2', [req.params.contactId, req.user.user_id]);
        if (contactCheck.rows.length === 0) return res.status(404).json({ data: null, error: 'Contact not found' });

        const result = await pool.query(
            "INSERT INTO messages (user_id, contact_id, direction, content, type) VALUES ($1, $2, 'out', $3, 'text') RETURNING *",
            [req.user.user_id, req.params.contactId, content]
        );
        res.status(201).json({ data: result.rows[0], error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

export default router;
