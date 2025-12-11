const API_BASE_URL = 'http://localhost:5000';

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
    return localStorage.getItem('token');
}

/**
 * Make authenticated API request
 */
async function authenticatedFetch(url: string, options: RequestInit = {}) {
    const token = getAuthToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Generate WhatsApp QR code
 */
export async function generateQR(): Promise<{
    status: string;
    qrCode: string | null;
    sessionId?: string;
    phoneNumber?: string;
}> {
    const data = await authenticatedFetch(`${API_BASE_URL}/whatsapp/generate-qr`, {
        method: 'POST',
    });
    return data.data;
}

/**
 * Get WhatsApp session status
 */
export async function getStatus(): Promise<{
    status: string;
    qrCode: string | null;
    phoneNumber?: string;
    connectedAt?: string;
    lastQRGeneratedAt?: string;
    message?: string;
}> {
    const data = await authenticatedFetch(`${API_BASE_URL}/whatsapp/status`);
    return data.data;
}

/**
 * Simulate WhatsApp connection (for testing)
 */
export async function simulateConnect(phoneNumber: string): Promise<{
    status: string;
    phoneNumber: string;
    message: string;
}> {
    const data = await authenticatedFetch(`${API_BASE_URL}/whatsapp/simulate-connect`, {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
    });
    return data.data;
}

/**
 * Disconnect WhatsApp session
 */
export async function disconnect(): Promise<{
    status: string;
    message: string;
}> {
    const data = await authenticatedFetch(`${API_BASE_URL}/whatsapp/disconnect`, {
        method: 'DELETE',
    });
    return data.data;
}
