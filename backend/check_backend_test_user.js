import { pool } from './config/db.js';

async function checkRecentUser() {
    try {
        const result = await pool.query(`
            SELECT id, full_name, work_email, company_name, trial_start_date, trial_end_date, created_at
            FROM users 
            WHERE work_email LIKE '%backendtest%'
            ORDER BY created_at DESC
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            console.log('✅ Backend Test User Found!');
            console.log('='.repeat(60));
            console.log('Full Name:', user.full_name);
            console.log('Email:', user.work_email);
            console.log('Company:', user.company_name);
            console.log('Trial Start:', user.trial_start_date);
            console.log('Trial End:', user.trial_end_date);
            console.log('Created:', user.created_at);

            // Calculate days remaining
            const now = new Date();
            const endDate = new Date(user.trial_end_date);
            const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
            console.log('Trial Status: ✅ Active (' + daysLeft + ' days remaining)');
            console.log('='.repeat(60));
        } else {
            console.log('❌ No backend test user found');
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

checkRecentUser();
