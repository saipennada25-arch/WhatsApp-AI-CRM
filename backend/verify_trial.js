import { pool } from './config/db.js';

async function verifyTrial() {
    try {
        const res = await pool.query('SELECT work_email, trial_start_date, trial_end_date FROM users ORDER BY created_at DESC LIMIT 1');
        if (res.rows.length > 0) {
            const user = res.rows[0];
            console.log('--- Verification Result ---');
            console.log(`User: ${user.work_email}`);
            console.log(`Trial Start: ${user.trial_start_date}`);
            console.log(`Trial End: ${user.trial_end_date}`);

            const start = new Date(user.trial_start_date);
            const end = new Date(user.trial_end_date);
            const diffDays = (end - start) / (1000 * 60 * 60 * 24);

            console.log(`Duration (Days): ${diffDays}`);

            if (Math.abs(diffDays - 14) < 0.1) {
                console.log('✅ PASS: Trial duration is correct (14 days).');
            } else {
                console.log('❌ FAIL: Trial duration is incorrect.');
            }
        } else {
            console.log('No users found.');
        }
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

verifyTrial();
