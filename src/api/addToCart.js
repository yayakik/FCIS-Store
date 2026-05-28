export function addToCart(productId, quantity = 1, userId) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/addToCart`, {
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
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error adding to cart:', error.message);
        });
}
