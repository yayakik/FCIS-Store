export const register = async (userData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to login:', error.message);
    }
};
