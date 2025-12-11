import { pool } from '../config/db.js';

async function createTables() {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name TEXT NOT NULL,
      company_name TEXT NOT NULL,
      work_email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      trial_start_date TIMESTAMP,
      trial_end_date TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const contactsTable = `
    CREATE TABLE IF NOT EXISTS contacts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      tags TEXT[],
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, phone)
    );
  `;

  const messagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
      contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
      direction TEXT CHECK (direction IN ('in', 'out')) NOT NULL,
      content TEXT NOT NULL,
      type TEXT DEFAULT 'text',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const whatsappSessionsTable = `
    CREATE TABLE IF NOT EXISTS whatsapp_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
      status TEXT CHECK (status IN ('pending', 'qr_ready', 'connected', 'disconnected', 'failed')) DEFAULT 'pending',
      qr_code TEXT,
      phone_number TEXT,
      session_data JSONB,
      last_qr_generated_at TIMESTAMP,
      connected_at TIMESTAMP,
      disconnected_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(usersTable);
    console.log('✅ Users table ready');
    await pool.query(contactsTable);
    console.log('✅ Contacts table ready');
    await pool.query(messagesTable);
    console.log('✅ Messages table ready');
    await pool.query(whatsappSessionsTable);
    console.log('✅ WhatsApp sessions table ready');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating tables:', err);
    process.exit(1);
  }
}

createTables();
