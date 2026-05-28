export function deleteFromCart(productId, quantity = 1, userId) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteFromCart`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId,
            quantity,
            userId,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete from cart');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error deleting from cart:', error.message);
        });
}
