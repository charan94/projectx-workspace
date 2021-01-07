export const BASE_API_URL = process.env.API_URL || 'http://localhost:8080/api'
export const apiCall = async (url, method, data) => {
    const authToken = localStorage.getItem('x-auth-token');
    if (!authToken) {
        window.location.href = '/401';
    }
    const config = {
        method,
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }),
        body: data && JSON.stringify(data)
    };

    const result = await fetch(url, config);
    if (url.includes('/auth/refreshToken')) {
        // refresh token special case
        if (result && result.status === 200) {
            return await result.json();
        } else {
            return null;
        }
    }

    if (result.status === 401) {
        // Unauthorized case
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/401';
    }

    if (result.status === 403) {
        window.location.href = '/403';
    }

    if (!result.ok) {
        try {
            const body = await result.json();
            return body;
        } catch (_error) {
            throw new Error(_error);
        }
    }
    return result.json();
};