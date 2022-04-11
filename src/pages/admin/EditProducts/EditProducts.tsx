import React from 'react'
import './edit-products.scss'
import EditProductModal from './EditProductModal'

const EditProducts: React.FC = () => {
  return (
    <section className="edit-products">
      <div className="container">
        <div className="edit-products-content">
          <EditProductModal />
        </div>
      </div>
    </section>
  )
}

export default EditProducts
