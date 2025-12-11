import fetch from 'node-fetch'; // assuming node 22 logic or removed if not needed? Just use built-in fetch
// Node 22 has built-in fetch.

const BASE_URL = 'http://localhost:5000';
let token = '';

async function verifyAll() {
    console.log('--- Final Verification ---');

    // 1. Login to get token (using a known user from browser step ideally, or create new one)
    // Let's create a temp API user to be sure
    const email = `api_check_${Date.now()}@test.com`;

    const signup = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: 'API Check', companyName: 'API Corp', email, password: 'password' })
    });

    if (signup.status === 200) {
        const data = await signup.json();
        token = data.data?.token || data.token; // Handle both structures if any
        console.log('✅ API Signup OK');
    } else {
        console.error('❌ API Signup Failed', await signup.json());
    }

    // 2. Auth Me
    if (token) {
        const me = await fetch(`${BASE_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (me.status === 200) console.log('✅ API Auth Me OK');
        else console.error('❌ API Auth Me Failed');
    }
}

verifyAll();
