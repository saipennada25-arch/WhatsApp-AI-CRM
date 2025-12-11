import express from 'express';
import { pool } from '../config/db.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contacts WHERE user_id = $1 ORDER BY created_at DESC', [req.user.user_id]);
        res.json({ data: result.rows, error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

// Create contact
router.post('/', async (req, res) => {
    try {
        const { name, phone, tags } = req.body;

        // Check for unique phone per user
        const check = await pool.query('SELECT * FROM contacts WHERE user_id = $1 AND phone = $2', [req.user.user_id, phone]);
        if (check.rows.length > 0) {
            return res.status(400).json({ data: null, error: 'Contact with this phone number already exists' });
        }

        const result = await pool.query(
            'INSERT INTO contacts (user_id, name, phone, tags) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.user.user_id, name, phone, tags || []]
        );
        res.status(201).json({ data: result.rows[0], error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

// Get single contact
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contacts WHERE id = $1 AND user_id = $2', [req.params.id, req.user.user_id]);
        if (result.rows.length === 0) return res.status(404).json({ data: null, error: 'Contact not found' });
        res.json({ data: result.rows[0], error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

// Update contact
router.patch('/:id', async (req, res) => {
    try {
        const { name, phone, tags } = req.body;
        const result = await pool.query(
            'UPDATE contacts SET name = COALESCE($1, name), phone = COALESCE($2, phone), tags = COALESCE($3, tags) WHERE id = $4 AND user_id = $5 RETURNING *',
            [name, phone, tags, req.params.id, req.user.user_id]
        );
        if (result.rows.length === 0) return res.status(404).json({ data: null, error: 'Contact not found' });
        res.json({ data: result.rows[0], error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

// Delete contact
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM contacts WHERE id = $1 AND user_id = $2 RETURNING id', [req.params.id, req.user.user_id]);
        if (result.rows.length === 0) return res.status(404).json({ data: null, error: 'Contact not found' });
        res.json({ data: { message: 'Contact deleted' }, error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
});

export default router;
