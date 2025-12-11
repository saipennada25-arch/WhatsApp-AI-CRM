import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

export const signup = async (req, res) => {
    // 1. Log incoming request (excluding password for security)
    const { full_name, work_email, password, company_name } = req.body;
    console.log('--- [Signup Request] ---');
    console.log('Body:', { full_name, work_email, company_name, password: '***' });

    // 2. Validate fields
    if (!full_name || !work_email || !password || !company_name) {
        console.warn('❌ Signup Validation Failed: Missing fields');
        return res.status(400).json({ error: "Missing required fields: full_name, work_email, password, company_name" });
    }

    try {
        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const trialStart = new Date();
        const trialEnd = new Date(trialStart.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days

        // 4. Database Insert
        console.log('Attempting DB Insert...');
        const result = await pool.query(
            `INSERT INTO users (full_name, work_email, company_name, password_hash, trial_start_date, trial_end_date, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id, full_name, company_name, work_email, trial_start_date, trial_end_date`,
            [full_name, work_email, company_name, password_hash, trialStart, trialEnd]
        );

        const user = result.rows[0];
        console.log('✅ User Created:', user.id);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({ data: { user, token }, error: null });

    } catch (err) {
        console.error("❌ Signup Error:", err.message);
        console.error("PG Error Detail:", err.detail); // Log PG details if available
        console.error("Stack:", err.stack);

        // Handle Unique Constraint Violation (Email already exists)
        if (err.code === '23505') {
            return res.status(409).json({ error: "Email already exists" });
        }

        res.status(500).json({ error: "Internal Server Error during signup" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check both work_email (new) and potentially legacy email column if migrated differently, 
        // but for now we assume strict schema change.
        const result = await pool.query('SELECT * FROM users WHERE work_email = $1', [email]);

        if (result.rows.length === 0) return res.status(400).json({ data: null, error: 'User not found' });

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(400).json({ data: null, error: 'Invalid password' });

        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        delete user.password_hash;

        res.json({ data: { token, user }, error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
};

export const me = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, full_name, company_name, work_email, trial_start_date, trial_end_date, created_at FROM users WHERE id = $1', [req.user.user_id]);
        if (result.rows.length === 0) return res.status(404).json({ data: null, error: 'User not found' });

        res.json({ data: result.rows[0], error: null });
    } catch (err) {
        res.status(500).json({ data: null, error: err.message });
    }
};
