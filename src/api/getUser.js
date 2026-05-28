export const getUser = async () => {
    const userID = sessionStorage.getItem('userID');
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ userID }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};