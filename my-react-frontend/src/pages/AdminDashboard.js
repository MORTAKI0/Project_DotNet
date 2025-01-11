import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import productAPI from '../api/productAPI';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]); // State for storing products
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        reference: '',
        currentQuantity: 0,
        minThreshold: 0,
        price: 0,
        isActive: true,
    });

    useEffect(() => {
        fetchProducts(); // Fetch products from the backend when the component loads
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productAPI.getAllProducts();
            setProducts(data); // Set the fetched products in state
        } catch (error) {
            console.error('Error fetching products:', error.message || error);
            alert('Failed to load products from the database.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: currentProduct.name,
                reference: currentProduct.reference,
                currentQuantity: currentProduct.currentQuantity,
                minThreshold: currentProduct.minThreshold,
                price: currentProduct.price,
                isActive: currentProduct.isActive,
            };

            if (isEditing) {
                await productAPI.updateProduct(currentProduct.productId, payload);
            } else {
                await productAPI.createProduct(payload);
            }

            setIsModalOpen(false);
            resetForm();
            fetchProducts(); // Refresh the product list after submission
        } catch (error) {
            console.error('Error saving product:', error.message || error);
            alert('Failed to save product. Please check your input.');
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productAPI.deleteProduct(id);
                fetchProducts(); // Refresh the product list after deletion
            } catch (error) {
                console.error('Error deleting product:', error.message || error);
                alert('Failed to delete product.');
            }
        }
    };

    const resetForm = () => {
        setCurrentProduct({
            name: '',
            reference: '',
            currentQuantity: 0,
            minThreshold: 0,
            price: 0,
            isActive: true,
        });
        setIsEditing(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Reference</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.productId}>
                                <td className="px-6 py-4 text-sm">{product.name}</td>
                                <td className="px-6 py-4 text-sm">{product.reference}</td>
                                <td className="px-6 py-4 text-sm">{product.currentQuantity}</td>
                                <td className="px-6 py-4 text-sm">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.productId)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                {isEditing ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={currentProduct.name}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Reference</label>
                                <input
                                    type="text"
                                    name="reference"
                                    value={currentProduct.reference}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="currentQuantity"
                                    value={currentProduct.currentQuantity}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Min Threshold</label>
                                <input
                                    type="number"
                                    name="minThreshold"
                                    value={currentProduct.minThreshold}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={currentProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={currentProduct.isActive}
                                    onChange={handleInputChange}
                                    className="rounded border-gray-300"
                                />
                                <label className="text-sm font-medium text-gray-700">Active</label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                {isEditing ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
