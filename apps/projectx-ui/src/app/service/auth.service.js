import { BASE_API_URL } from "./api";

export const authService = {
    login: async (email, password) => {
        const url = `${BASE_API_URL}/login`;
        await new Promise((r) => setTimeout(r, 1000));
        if(email === 'sai.c@winvest-global.com' && password === 'Passw0rd1') {
            return {
                status: 200, 
                data: {
                    email,
                    role: 'ADMIN',
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTAwNTYwMzcsImV4cCI6MTY0MTU5MjA4MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjoiQURNSU4ifQ.CSg_Lil5Cn4CNDkH70vBtz3bexTrLodL69th-0FFoZ4'
                }
            }
        }
        throw new Error("Invalid Credentials");
        // return apiCall(url, 'POST', {email, password});
    }
}