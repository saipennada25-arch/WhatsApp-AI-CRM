import { pool } from './config/db.js';

async function testConnection() {
    try {
        console.log('🔍 Testing database connection...');

        // Test basic connection
        const connectionTest = await pool.query('SELECT NOW()');
        console.log('✅ Database connected successfully');
        console.log('📅 Server time:', connectionTest.rows[0].now);

        // Check if users table exists
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'users'
            );
        `);

        if (tableCheck.rows[0].exists) {
            console.log('✅ Users table exists');

            // Count users
            const countResult = await pool.query('SELECT COUNT(*) FROM users');
            console.log(`📊 Total users in database: ${countResult.rows[0].count}`);

            // Show recent users
            const recentUsers = await pool.query(`
                SELECT id, full_name, work_email, company_name, trial_start_date, trial_end_date, created_at 
                FROM users 
                ORDER BY created_at DESC 
                LIMIT 5
            `);

            if (recentUsers.rows.length > 0) {
                console.log('\n📋 Recent users:');
                recentUsers.rows.forEach((user, index) => {
                    console.log(`\n${index + 1}. ${user.full_name} (${user.work_email})`);
                    console.log(`   Company: ${user.company_name}`);
                    console.log(`   Trial Start: ${user.trial_start_date}`);
                    console.log(`   Trial End: ${user.trial_end_date}`);
                    console.log(`   Created: ${user.created_at}`);
                });
            } else {
                console.log('\n⚠️  No users found in database');
            }
        } else {
            console.log('❌ Users table does NOT exist');
            console.log('💡 Run: npm run db:init');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Database connection failed:');
        console.error('Error:', err.message);
        console.error('\nDetails:', err);
        process.exit(1);
    }
}

testConnection();
