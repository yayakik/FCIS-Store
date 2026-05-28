export async function clearCart(userId) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/clearCart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to clear cart');
    }

    return response.json();
}
