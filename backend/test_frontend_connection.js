// Test script to verify frontend can reach backend
const API_URL = 'http://localhost:5000';

async function testBackendConnection() {
    console.log('='.repeat(60));
    console.log('FRONTEND-BACKEND CONNECTION TEST');
    console.log('='.repeat(60));
    console.log(`Testing connection to: ${API_URL}\n`);

    // Test 1: Check if backend is running
    console.log('Test 1: Checking if backend is accessible...');
    try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
        console.log('✅ Backend is running');
        console.log('   Response:', data);
    } catch (error) {
        console.error('❌ Cannot reach backend:', error.message);
        console.log('\n⚠️  Make sure backend is running: npm run dev');
        process.exit(1);
    }

    // Test 2: Test signup endpoint with valid data
    console.log('\nTest 2: Testing signup endpoint...');
    const testUser = {
        full_name: 'Frontend Test User',
        company_name: 'Test Company',
        work_email: `test.${Date.now()}@example.com`,
        password: 'testpassword123'
    };

    try {
        console.log('Sending signup request with:', {
            ...testUser,
            password: '***'
        });

        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testUser)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Signup failed:', errorData);
            return;
        }

        const data = await response.json();
        console.log('✅ Signup successful!');
        console.log('   User ID:', data.data.user.id);
        console.log('   Email:', data.data.user.work_email);
        console.log('   Trial Start:', data.data.user.trial_start_date);
        console.log('   Trial End:', data.data.user.trial_end_date);
        console.log('   Token received:', data.data.token ? 'Yes' : 'No');

    } catch (error) {
        console.error('❌ Request failed:', error.message);

        if (error.message.includes('fetch')) {
            console.log('\n⚠️  Network error - possible causes:');
            console.log('   1. Backend not running');
            console.log('   2. CORS not configured correctly');
            console.log('   3. Wrong API URL');
        }
    }

    // Test 3: Test with duplicate email
    console.log('\nTest 3: Testing duplicate email handling...');
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testUser) // Same email as before
        });

        if (response.status === 409) {
            console.log('✅ Duplicate email correctly rejected (409 Conflict)');
            const errorData = await response.json();
            console.log('   Error message:', errorData.error);
        } else {
            console.log('⚠️  Expected 409 status, got:', response.status);
        }
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS COMPLETED');
    console.log('='.repeat(60));
}

// Run tests
testBackendConnection().catch(console.error);
