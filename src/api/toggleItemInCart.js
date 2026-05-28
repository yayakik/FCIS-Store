
export function toggleItemInCart(productId, userId, quantity = 1) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/toggleCartItem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, userId, quantity }),
    })
        .then(async response => {
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to toggle item in cart');
            }
            return response.json(); 
        });
}