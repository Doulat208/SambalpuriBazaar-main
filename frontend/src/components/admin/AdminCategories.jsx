import React, { useEffect, useState } from "react";
import api from "../../config/axios";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [form, setForm] = useState({ name: "", code: "", description: "" });
    const [isEditing, setIsEditing] = useState(false);

    // Category Type states
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [typeList, setTypeList] = useState([]);
    const [typeForm, setTypeForm] = useState({ name: "", code: "", description: "" });
    const [editingType, setEditingType] = useState(null);

    // -------------------- FETCH CATEGORIES --------------------
    const fetchCategories = async () => {
        try {
            const res = await api.get("/category");
            console.log("Categories API response:", res.data); // debug
            setCategories(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/category");
                setCategories(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);


    // -------------------- CATEGORY --------------------
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && selectedCategory) {
                await api.put(`/category/${selectedCategory.id}`, form);
            } else {
                await api.post("/category", form);
            }
            setForm({ name: "", code: "", description: "" });
            setIsEditing(false);
            setSelectedCategory(null);
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setForm({
            name: category.name,
            code: category.code,
            description: category.description,
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await api.delete(`/category/${id}`);
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    };

    // -------------------- CATEGORY TYPES --------------------
    const handleViewTypes = async (category) => {
        setSelectedCategory(category);
        try {
            const res = await api.get(`/category/${category.id}/types`);
            setTypeList(Array.isArray(res.data) ? res.data : []);
            setShowTypeModal(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangeType = (e) => {
        setTypeForm({ ...typeForm, [e.target.name]: e.target.value });
    };

    const handleTypeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingType) {
                await axios.put(`/api/category/types/${editingType.id}`, typeForm);
            } else {
                await axios.post(`/api/category/${selectedCategory.id}/types`, typeForm);
            }
            setTypeForm({ name: "", code: "", description: "" });
            setEditingType(null);
            const res = await axios.get(`/api/category/${selectedCategory.id}/types`);
            setTypeList(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteType = async (typeId) => {
        if (!window.confirm("Delete this category type?")) return;
        try {
            await axios.delete(`/api/category/types/${typeId}`);
            setTypeList(typeList.filter((t) => t.id !== typeId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditType = (type) => {
        setEditingType(type);
        setTypeForm({ name: type.name, code: type.code, description: type.description });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Category Management</h2>

            {/* -------------------- CATEGORY FORM -------------------- */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    name="code"
                    placeholder="Category Code"
                    value={form.code}
                    onChange={handleChange}
                    required
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    style={{ marginRight: "10px" }}
                />
                <button type="submit">{isEditing ? "Update" : "Add"} Category</button>
            </form>

            {/* -------------------- CATEGORIES TABLE -------------------- */}
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.name}</td>
                                <td>{cat.code}</td>
                                <td>{cat.description}</td>
                                <td>
                                    <button onClick={() => handleViewTypes(cat)}>View Types</button>{" "}
                                    <button onClick={() => handleEdit(cat)}>Edit</button>{" "}
                                    <button onClick={() => handleDelete(cat.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No categories found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* -------------------- CATEGORY TYPES MODAL -------------------- */}
            {showTypeModal && selectedCategory && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div style={{ background: "white", padding: "20px", width: "500px" }}>
                        <h3>Category Types for {selectedCategory.name}</h3>
                        <button onClick={() => setShowTypeModal(false)}>Close</button>

                        {/* Type Form */}
                        <form onSubmit={handleTypeSubmit} style={{ margin: "10px 0" }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Type Name"
                                value={typeForm.name}
                                onChange={handleChangeType}
                                required
                                style={{ marginRight: "5px" }}
                            />
                            <input
                                type="text"
                                name="code"
                                placeholder="Type Code"
                                value={typeForm.code}
                                onChange={handleChangeType}
                                required
                                style={{ marginRight: "5px" }}
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={typeForm.description}
                                onChange={handleChangeType}
                                style={{ marginRight: "5px" }}
                            />
                            <button type="submit">{editingType ? "Update" : "Add"} Type</button>
                        </form>

                        {/* Types Table */}
                        <table border="1" cellPadding="10" style={{ marginTop: "10px", width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(typeList) && typeList.length > 0 ? (
                                    typeList.map((t) => (
                                        <tr key={t.id}>
                                            <td>{t.name}</td>
                                            <td>{t.code}</td>
                                            <td>{t.description}</td>
                                            <td>
                                                <button onClick={() => handleEditType(t)}>Edit</button>{" "}
                                                <button onClick={() => handleDeleteType(t.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No types found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
