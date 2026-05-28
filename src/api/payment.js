export const payment = async (cartInfo) => {
    console.log(cartInfo)
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/payment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartInfo }),
        })
        if (!response.ok) {
            throw new Error('Failed to payment');
        }
        return response.ok;
    } catch (error) {
        console.error('Error payment:', error.message);
    }
}