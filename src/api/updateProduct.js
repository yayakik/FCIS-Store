export const updateProduct = async (product) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateProduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product: product }),
        })
        console.log(response.ok);
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        return response.ok;
    } catch (error) {
        console.error('Error adding product:', error.message);
    }
}