import { pool } from './config/db.js';
import fs from 'fs';

async function fullTest() {
    const output = [];
    const log = (msg) => {
        console.log(msg);
        output.push(msg);
    };

    try {
        log('='.repeat(60));
        log('DATABASE CONNECTION TEST');
        log('='.repeat(60));

        // Test 1: Connection
        const result = await pool.query('SELECT NOW() as time, current_database() as db, version() as version');
        log('\n✅ DATABASE CONNECTED');
        log(`📦 Database: ${result.rows[0].db}`);
        log(`⏰ Server Time: ${result.rows[0].time}`);
        log(`🔧 PostgreSQL Version: ${result.rows[0].version.split(',')[0]}`);

        // Test 2: Check tables
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);
        log(`\n📊 Tables in database: ${tables.rows.length}`);
        tables.rows.forEach(t => log(`   - ${t.table_name}`));

        // Test 3: Users table structure
        const columns = await pool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position
        `);
        log('\n📋 Users table structure:');
        columns.rows.forEach(c => {
            log(`   - ${c.column_name} (${c.data_type}) ${c.is_nullable === 'NO' ? 'NOT NULL' : 'NULLABLE'}`);
        });

        // Test 4: Count users
        const count = await pool.query('SELECT COUNT(*) FROM users');
        log(`\n👥 Total users in database: ${count.rows[0].count}`);

        // Test 5: List all users with trial info
        const users = await pool.query(`
            SELECT id, full_name, work_email, company_name, 
                   trial_start_date, trial_end_date, created_at
            FROM users 
            ORDER BY created_at DESC
        `);

        if (users.rows.length > 0) {
            log('\n📋 ALL USERS:');
            log('-'.repeat(60));
            users.rows.forEach((u, i) => {
                log(`\n${i + 1}. ${u.full_name}`);
                log(`   Email: ${u.work_email}`);
                log(`   Company: ${u.company_name}`);
                log(`   Trial Start: ${u.trial_start_date || 'Not set'}`);
                log(`   Trial End: ${u.trial_end_date || 'Not set'}`);
                log(`   Created: ${u.created_at}`);

                // Calculate trial status
                if (u.trial_end_date) {
                    const now = new Date();
                    const endDate = new Date(u.trial_end_date);
                    const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
                    if (daysLeft > 0) {
                        log(`   Status: ✅ Trial Active (${daysLeft} days left)`);
                    } else {
                        log(`   Status: ❌ Trial Expired (${Math.abs(daysLeft)} days ago)`);
                    }
                }
            });
        } else {
            log('\n⚠️  No users found in database');
        }

        log('\n' + '='.repeat(60));
        log('✅ ALL TESTS PASSED');
        log('='.repeat(60));

        // Write to file
        fs.writeFileSync('db_test_results.txt', output.join('\n'));
        log('\n📄 Full results saved to: db_test_results.txt');

        await pool.end();
        process.exit(0);
    } catch (err) {
        log('\n❌ ERROR OCCURRED:');
        log(`Message: ${err.message}`);
        log(`Code: ${err.code}`);
        log(`Detail: ${err.detail || 'N/A'}`);

        fs.writeFileSync('db_test_results.txt', output.join('\n') + '\n\nERROR:\n' + err.stack);
        process.exit(1);
    }
}

fullTest();
