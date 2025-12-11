import express from 'express';
import cors from 'cors';
import { pool } from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Request logging middleware
app.use((req, res, next) => {
    console.log(`\n📥 [${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Origin:', req.headers.origin || 'No origin header');
    console.log('Content-Type:', req.headers['content-type'] || 'No content-type');
    if (req.body && Object.keys(req.body).length > 0) {
        const sanitizedBody = { ...req.body };
        if (sanitizedBody.password) sanitizedBody.password = '***';
        console.log('Body:', sanitizedBody);
    }
    next();
});

// CORS Middleware - Allow requests from frontend
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(express.json());

// Log when JSON parsing fails
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('❌ JSON Parse Error:', err.message);
        return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes); // Base path for contacts
app.use('/contacts', messageRoutes); // Mount message routes under /contacts because paths are /contacts/:id/messages
app.use('/dashboard', dashboardRoutes);
app.use('/whatsapp', whatsappRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'UNPHUC CRM Backend Running',
        status: 'OK',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: {
                signup: 'POST /auth/signup',
                login: 'POST /auth/login',
                me: 'GET /auth/me'
            },
            whatsapp: {
                generateQR: 'POST /whatsapp/generate-qr',
                status: 'GET /whatsapp/status',
                simulateConnect: 'POST /whatsapp/simulate-connect',
                disconnect: 'DELETE /whatsapp/disconnect'
            }
        }
    });
});

// 404 Handler
app.use((req, res) => {
    console.log(`⚠️  404 Not Found: ${req.method} ${req.path}`);
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.path,
        method: req.method
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Unhandled Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
        path: req.path
    });
});

// Start Server
app.listen(PORT, async () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 UNPHUC CRM Backend Server');
    console.log('='.repeat(60));
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🌐 CORS enabled for: http://localhost:3000, http://localhost:3001`);
    console.log(`📅 Started at: ${new Date().toISOString()}`);

    try {
        await pool.query('SELECT 1');
        console.log('✅ Database connected successfully');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }

    console.log('='.repeat(60));
    console.log('📋 Available endpoints:');
    console.log('   POST /auth/signup - Create new user with 14-day trial');
    console.log('   POST /auth/login - User login');
    console.log('   GET  /auth/me - Get current user');
    console.log('   POST /whatsapp/generate-qr - Generate WhatsApp QR code');
    console.log('   GET  /whatsapp/status - Get WhatsApp session status');
    console.log('   POST /whatsapp/simulate-connect - Simulate WhatsApp connection');
    console.log('   DELETE /whatsapp/disconnect - Disconnect WhatsApp session');
    console.log('='.repeat(60) + '\n');
});
