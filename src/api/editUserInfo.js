export const editUserInfo = async (user) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/editUserInfo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        })
        if (!response.ok) {
            throw new Error('Failed to update userInfo');
        }
        return response.ok;
    } catch (error) {
        console.error('Error update userInfo:', error.message);
    }
}