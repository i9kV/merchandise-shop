import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Table, { type Column } from '../components/Table';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

interface Product {
  id: number;
  name: string;
  price: number | string;
  stock: number | string;
  image: string | ArrayBuffer | null;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [form, setForm] = useState<Product>({
    id: 0,
    name: '',
    price: '',
    stock: '',
    image: '',
  });
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Add/Edit Modal
  const openAddModal = () => {
    setForm({ id: 0, name: '', price: '', stock: '', image: '' });
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setForm(product);
    setModalOpen(true);
  };

  // Delete
  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setDeleteConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  // Form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.id && products.some((p) => p.id === form.id)) {
      setProducts(products.map((p) => (p.id === form.id ? form : p)));
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  // File change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Columns
  const columns: Column<Product>[] = [
    {
      title: 'Image',
      key: 'image',
      render: (row) =>
        row.image ? (
          <div className="flex items-center justify-center">
            <img
              src={row.image as string}
              alt={row.name}
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-300 dark:border-gray-600"
            />
          </div>
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-xs md:text-sm rounded-md">
            No Image
          </div>
        ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (row) => <span className="text-gray-800 dark:text-gray-100">{row.name}</span>,
    },
    {
      title: 'Price',
      key: 'price',
      render: (row) => <span className="text-gray-700 dark:text-gray-300">฿{row.price}</span>,
    },
    {
      title: 'Stock',
      key: 'stock',
      render: (row) => <span className="text-gray-700 dark:text-gray-300">{row.stock}</span>,
    },
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileSidebarOpen} />

          <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 flex-1 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Products</h2>
              <Button onClick={openAddModal}>Add Product</Button>
            </div>

            {/* Table responsive */}
            <div className="overflow-x-auto">
              <Table<Product> data={products} columns={columns} onEdit={openEditModal} onDelete={confirmDelete} />
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            {form.id && products.some((p) => p.id === form.id) ? 'Edit Product' : 'Add Product'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              label="Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
            />
            <Input
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
              className="dark:text-white dark:bg-gray-700 dark:border-gray-600"
            />

            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {form.image && (
                <img
                  src={form.image as string}
                  alt="Preview"
                  className="w-24 md:w-32 h-24 md:h-32 object-cover rounded mt-2"
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
              <Button type="button" onClick={() => setModalOpen(false)} className="bg-gray-400 hover:bg-gray-500 text-white w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                {form.id && products.some((p) => p.id === form.id) ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirm Modal */}
        <Modal isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
          <p className="text-gray-800 dark:text-white">
            Are you sure you want to delete <strong>{productToDelete?.name}</strong>?
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <Button onClick={() => setDeleteConfirmOpen(false)} className="bg-gray-400 hover:bg-gray-500 text-white w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto">
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
