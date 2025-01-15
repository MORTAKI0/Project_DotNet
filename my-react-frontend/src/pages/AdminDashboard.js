import React, { useState, useEffect } from "react";
import productAPI from "../api/productAPI";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({
        name: "",
        reference: "",
        currentQuantity: 0,
        minThreshold: 0,
        price: 0,
        isActive: true,
        supplierId: null,
    });
    const [newSupplier, setNewSupplier] = useState({ name: "" });
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productAPI.getAllProducts();
            setProducts(Array.isArray(data?.$values) ? data.$values : []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const data = await productAPI.getAllSuppliers();
            setSuppliers(Array.isArray(data?.$values) ? data.$values : []);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            await productAPI.createProduct(currentProduct);
            setIsProductModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const handleSupplierSubmit = async (e) => {
        e.preventDefault();
        try {
            await productAPI.createSupplier(newSupplier);
            setIsSupplierModalOpen(false);
            fetchSuppliers();
        } catch (error) {
            console.error("Error creating supplier:", error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={() => setIsProductModalOpen(true)}>Add Product</button>
            <button onClick={() => setIsSupplierModalOpen(true)}>Add Supplier</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reference</th>
                        <th>Supplier</th>
                        <th>Current Quantity</th>
                        <th>Min Threshold</th>
                        <th>Price</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.name}</td>
                            <td>{product.reference}</td>
                            <td>{suppliers.find((s) => s.supplierId === product.supplierId)?.name || "N/A"}</td>
                            <td>{product.currentQuantity}</td>
                            <td>{product.minThreshold}</td>
                            <td>{product.price}</td>
                            <td>{product.isActive ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isProductModalOpen && (
                <div>
                    <h2>Add Product</h2>
                    <form onSubmit={handleProductSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={currentProduct.name}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Reference"
                            value={currentProduct.reference}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, reference: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Current Quantity"
                            value={currentProduct.currentQuantity}
                            onChange={(e) =>
                                setCurrentProduct({ ...currentProduct, currentQuantity: parseInt(e.target.value) })
                            }
                            required
                        />
                        <input
                            type="number"
                            placeholder="Min Threshold"
                            value={currentProduct.minThreshold}
                            onChange={(e) =>
                                setCurrentProduct({ ...currentProduct, minThreshold: parseInt(e.target.value) })
                            }
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            step="0.01"
                            value={currentProduct.price}
                            onChange={(e) =>
                                setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })
                            }
                            required
                        />
                        <select
                            value={currentProduct.supplierId || ""}
                            onChange={(e) =>
                                setCurrentProduct({ ...currentProduct, supplierId: parseInt(e.target.value) })
                            }
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map((s) => (
                                <option key={s.supplierId} value={s.supplierId}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                        <label>
                            <input
                                type="checkbox"
                                checked={currentProduct.isActive}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, isActive: e.target.checked })
                                }
                            />
                            Active
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsProductModalOpen(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {isSupplierModalOpen && (
                <div>
                    <h2>Add Supplier</h2>
                    <form onSubmit={handleSupplierSubmit}>
                        <input
                            type="text"
                            placeholder="Supplier Name"
                            value={newSupplier.name}
                            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                            required
                        />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsSupplierModalOpen(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
