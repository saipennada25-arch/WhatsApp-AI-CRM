import { pool } from './config/db.js';

async function simpleTest() {
    try {
        // Test 1: Connection
        const result = await pool.query('SELECT NOW() as time, current_database() as db');
        console.log('✅ Connected to database:', result.rows[0].db);
        console.log('⏰ Server time:', result.rows[0].time);

        // Test 2: Count users
        const count = await pool.query('SELECT COUNT(*) FROM users');
        console.log('👥 Total users:', count.rows[0].count);

        // Test 3: List all users
        const users = await pool.query('SELECT id, full_name, work_email, company_name FROM users LIMIT 10');
        console.log('\n📋 Users in database:');
        users.rows.forEach((u, i) => {
            console.log(`${i + 1}. ${u.full_name} - ${u.work_email} (${u.company_name})`);
        });

        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

simpleTest();
