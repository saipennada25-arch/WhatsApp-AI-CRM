import { pool } from './config/db.js';

async function checkUser() {
    try {
        const res = await pool.query("SELECT * FROM users WHERE work_email = 'final2@example.com'");
        if (res.rows.length > 0) {
            console.log('✅ User Found:', res.rows[0].work_email);
        } else {
            console.error('❌ User NOT Found');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUser();
