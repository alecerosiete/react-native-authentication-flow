const API = 'https://marcadoronline.sekur.com.py/admin.php/api';

export const login = async (credentials) => {
    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json',
            'X-API-KEY': '7b16fbfb5cd3328df243a9a2322da9458d60d9c1'
        },
        body: JSON.stringify(credentials)
    });

    const loginResults = await res.json();
    return loginResults;

}