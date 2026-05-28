import React, { useState, useContext, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import './../assets/styles/AdminDashboard.css';
import { ProductsContext } from '../context/ProductsContext';
import { addProduct } from '../api/addProduct';
import { deleteProduct } from '../api/deleteProduct';
import { updateProduct } from '../api/updateProduct';
import { Alert, Slide, Snackbar, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useNavigate } from 'react-router-dom';
export default function AdminDashboard() {
    const { products, setProducts } = useContext(ProductsContext);
    const [openAlert, setOpenAlert] = useState(false);
    const [localProducts, setLocalProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();


    useEffect(() => {
        console.log(sessionStorage.getItem('role'))
        if (sessionStorage.getItem('role') !== 'admin') {
            navigate('/login');
        }
        setLocalProducts(products);
    }, [products]);

    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        productID: '',
        productName: '',
        category: '',
        price: '',
        numOfProduct: '',
        productDetails: '',
        productImg: ''
    });

    // Filter products based on search term
    const filteredProducts = localProducts.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /* ===================================== [ADD PRODUCT] ===================================== */
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = {
            productName: formData.productName,
            category: formData.category,
            price: parseFloat(formData.price),
            numOfProduct: parseInt(formData.numOfProduct),
            productDetails: formData.productDetails,
            productImg: formData.productImg
        };

        const res = addProduct(newProduct);
        if (res) {
            setProducts([...products, newProduct]);
            showAlert('success', 'add');
            setFormData({
                productID: '',
                productName: '',
                category: '',
                price: '',
                numOfProduct: '',
                productDetails: '',
                productImg: ''
            });
        } else {
            showAlert('error', 'add');
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            productName: product.productName,
            category: product.category,
            price: product.price,
            numOfProduct: product.numOfProduct,
            productDetails: product.productDetails,
            productImg: product.productImg
        });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const res = updateProduct({ ...formData, _id: editingProduct._id });
        if (res) {
            setProducts(products.map(product =>
                product._id === editingProduct._id
                    ? { ...product, ...formData, price: parseFloat(formData.price), quantity: parseInt(formData.numOfProduct) }
                    : product
            ));
            setEditingProduct(null);
            setFormData({
                productName: '',
                category: '',
                price: '',
                numOfProduct: '',
                productDetails: '',
                productImg: ''
            });
            showAlert('success', 'update');
        } else {
            showAlert('error', 'update');
        }
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    function showAlert(type, operation) {
        if (type === 'success') {
            setAlertMessage(`Product ${operation}ed successfully!`);
            setAlertType('success');
        } else if (type) {
            setAlertMessage(`Error ${operation}ing product!`);
            setAlertType('error');
        }
        setOpenAlert(true);
    };


    /* ===================================== [ADD PRODUCT] ===================================== */

    const handleDeleteProduct = (_id) => {
        const res = window.confirm('Are you sure you want to delete this product?');
        if (res) {
            const res = deleteProduct(_id);
            if (res) {
                setAlertMessage('Product deleted successfully!');
                setAlertType('success');
                showAlert('success', 'delete');
                setProducts(products.filter(product => product._id !== _id));
            } else {
                setAlertMessage('Error deleting product!');
                setAlertType('error');
                showAlert('error', 'delete');
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Product Management Dashboard</h1>

            <div className="search-input">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>



            <div className="product-list-container">
                <h2>Product Inventory</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Details</th>
                            <th>Product Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, idx) => (
                            <tr key={idx + 1}>
                                <td>{idx + 1}</td>
                                <td><p className='product-name'>{product.productName}</p></td>
                                <td>{product.category}</td>
                                <td><p className='td-price'>EGP {product.price}</p></td>
                                <td>{product.numOfProduct}</td>
                                <td ><p className='product-details'>{product.productDetails}</p></td>
                                <td><img src={product.productImg} alt={product.productName} width={'auto'} height={100} /></td>
                                <td>
                                    <div className="actions">

                                        <button

                                            onClick={() => handleEditProduct(product)}
                                            className="edit-btn"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button

                                            onClick={() => {
                                                console.log('Editing product:', product._id);
                                                handleDeleteProduct(product._id)

                                            }}
                                            className="delete-btn"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="product-form">
                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={editingProduct !== null ? handleUpdateProduct : handleAddProduct}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="numOfProduct"
                            value={formData.numOfProduct}
                            onChange={handleInputChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Details</label>
                        <textarea
                            name="productDetails"
                            value={formData.productDetails}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Image URL</label>
                        <input
                            type="text"
                            name="productImg"
                            value={formData.productImg}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" >
                        {editingProduct ? 'Update Product' : 'Add Product'} <FaPlus />
                    </button>
                    {editingProduct && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setEditingProduct(null);
                                setFormData({
                                    productID: '',
                                    productName: '',
                                    category: '',
                                    price: '',
                                    numOfProduct: '',
                                    productDetails: '',
                                    productImg: ''
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>


            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{
                    vertical: isMobile ? 'bottom' : 'bottom',
                    horizontal: isMobile ? 'center' : 'right'
                }}
                TransitionComponent={Slide}
                sx={{
                    bottom: isMobile ? '16px !important' : '24px'
                }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertType}
                    variant="filled"
                    icon={alertType === 'success' ? <CheckCircleOutlineIcon /> : <DangerousIcon />}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div >
    );
};