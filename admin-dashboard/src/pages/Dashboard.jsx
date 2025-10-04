import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Table from '../components/Table'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const initialProducts = []

const Dashboard = () => {
  const [products, setProducts] = useState(initialProducts)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [form, setForm] = useState({ id: null, name: '', price: '', stock: '', image: '' })
  const [productToDelete, setProductToDelete] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const openAddModal = () => {
    setForm({ id: null, name: '', price: '', stock: '', image: '' })
    setModalOpen(true)
  }

  const openEditModal = (product) => {
    setForm(product)
    setModalOpen(true)
  }

  const confirmDelete = (product) => {
    setProductToDelete(product)
    setDeleteConfirmOpen(true)
  }

  const handleDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id))
      setDeleteConfirmOpen(false)
      setProductToDelete(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.id) {
      setProducts(products.map(p => p.id === form.id ? form : p))
    } else {
      setProducts([...products, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const columns = [
    { title: 'Image', key: 'image' },
    { title: 'Name', key: 'name' },
    { title: 'Price', key: 'price' },
    { title: 'Stock', key: 'stock' },
  ]

  const tableData = products.map(p => ({
    ...p,
    image: p.image ? (
      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
    ) : (
      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 text-xs">No Image</div>
    )
  }))

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} />
          <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 flex-1 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Products</h2>
              <Button onClick={openAddModal}>Add Product</Button>
            </div>
            <Table data={tableData} columns={columns} onEdit={openEditModal} onDelete={confirmDelete} />
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{form.id ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input label="Name" name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <Input label="Price" name="price" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            <Input label="Stock" name="stock" type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required />

            {/* Upload Image */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 dark:text-gray-300">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if(file){
                    const reader = new FileReader()
                    reader.onload = () => setForm({...form, image: reader.result})
                    reader.readAsDataURL(file)
                  }
                }}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />}
            </div>

            {/* ปุ่ม Cancel + Add/Update */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                {form.id ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirm Modal */}
        <Modal isOpen={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h2>
          <p>Are you sure you want to delete <strong>{productToDelete?.name}</strong>?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setDeleteConfirmOpen(false)} className="bg-gray-400 hover:bg-gray-500">Cancel</Button>
            <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Dashboard
