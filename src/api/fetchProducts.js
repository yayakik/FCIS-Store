
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProducts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        return products || [];
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};


