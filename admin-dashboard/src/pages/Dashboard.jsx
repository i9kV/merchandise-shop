import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Table from '../components/Table'
import Button from '../components/Button'
import Input from '../components/Input'
import Modal from '../components/Modal'

const initialProducts = [

]

const Dashboard = () => {
  const [products, setProducts] = useState(initialProducts)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [form, setForm] = useState({ id: null, name: '', price: '', stock: '' })
  const [productToDelete, setProductToDelete] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const openAddModal = () => {
    setForm({ id: null, name: '', price: '', stock: '' })
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
    if(productToDelete){
      setProducts(products.filter(p => p.id !== productToDelete.id))
      setDeleteConfirmOpen(false)
      setProductToDelete(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(form.id){
      setProducts(products.map(p => p.id === form.id ? form : p))
    } else {
      setProducts([...products, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
  }

  const columns = [
    { title: 'Name', key: 'name' },
    { title: 'Price', key: 'price' },
    { title: 'Stock', key: 'stock' },
  ]

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
            <Table data={products} columns={columns} onEdit={openEditModal} onDelete={confirmDelete} />
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{form.id ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input label="Name" name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <Input label="Price" name="price" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            <Input label="Stock" name="stock" type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required />
            <Button type="submit" className="mt-2 w-full">{form.id ? 'Update' : 'Add'}</Button>
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
