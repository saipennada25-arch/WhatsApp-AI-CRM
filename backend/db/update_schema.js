import { pool } from '../config/db.js';

async function updateSchema() {
    try {
        // Rename columns if they exist as old names
        await pool.query(`
            DO $$
            BEGIN
                IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='business_name') THEN
                    ALTER TABLE users RENAME COLUMN business_name TO company_name;
                END IF;
                IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='email') THEN
                    ALTER TABLE users RENAME COLUMN email TO work_email;
                END IF;
            END $$;
        `);

        // Add new columns if they don't exist
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS trial_start_date TIMESTAMP,
            ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP;
        `);

        console.log('Database schema updated successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error updating schema:', err);
        process.exit(1);
    }
}

updateSchema();
