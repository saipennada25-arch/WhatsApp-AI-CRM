// Using built-in fetch for Node 22+

const BASE_URL = 'http://localhost:5000';
let token = '';
let userId = '';
let contactId = '';

async function testBackend() {
    console.log('--- Starting API Verification ---');

    // 1. Signup
    console.log('\n1. Testing Signup...');
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            full_name: 'Test User',
            company_name: 'Test Corp',
            work_email: `test${Date.now()}@example.com`,
            password: 'password123'
        })
    });
    const signupData = await signupRes.json();
    if (signupRes.status === 201) {
        console.log('✅ Signup Successful:', signupData.data.user.work_email);
    } else {
        console.error('❌ Signup Failed:', signupData);
        return;
    }

    // 2. Login
    console.log('\n2. Testing Login...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: signupData.data.user.work_email,
            password: 'password123'
        })
    });
    const loginData = await loginRes.json();
    if (loginRes.status === 200) {
        token = loginData.data.token;
        userId = loginData.data.user.id;
        console.log('✅ Login Successful. Token received.');
    } else {
        console.error('❌ Login Failed:', loginData);
        return;
    }

    // 3. Get Me
    console.log('\n3. Testing Get Me...');
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meRes.json();
    if (meRes.status === 200 && meData.data.id === userId) {
        console.log('✅ Get Me Successful:', meData.data.full_name);
    } else {
        console.error('❌ Get Me Failed:', meData);
    }

    // 4. Create Contact
    console.log('\n4. Testing Create Contact...');
    const contactRes = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: 'John Doe',
            phone: `+1555${Date.now()}`,
            tags: ['lead']
        })
    });
    const contactData = await contactRes.json();
    if (contactRes.status === 201) {
        contactId = contactData.data.id;
        console.log('✅ Create Contact Successful:', contactData.data.name);
    } else {
        console.error('❌ Create Contact Failed:', contactData);
    }

    // 5. Send Message
    console.log('\n5. Testing Send Message...');
    const msgRes = await fetch(`${BASE_URL}/contacts/${contactId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            content: 'Hello World'
        })
    });
    const msgData = await msgRes.json();
    if (msgRes.status === 201) {
        console.log('✅ Send Message Successful:', msgData.data.content);
    } else {
        console.error('❌ Send Message Failed:', msgData);
    }

    // 6. Dashboard Summary
    console.log('\n6. Testing Dashboard Summary...');
    const dashRes = await fetch(`${BASE_URL}/dashboard/summary`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const dashData = await dashRes.json();
    if (dashRes.status === 200) {
        console.log('✅ Dashboard Summary Successful:', dashData.data);
    } else {
        console.error('❌ Dashboard Summary Failed:', dashData);
    }
}

testBackend();
