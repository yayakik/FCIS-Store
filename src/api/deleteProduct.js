export function deleteProduct(productId) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteProduct`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: productId }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            return response.ok;
        })
        .catch((error) => {
            console.error('Error deleting product:', error.message);
        });
}