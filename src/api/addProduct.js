export const addProduct = async (productData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        return response.ok;
    } catch (error) {
        console.error('Error adding product:', error.message);
    }
};
