import React from 'react';
import { Link } from 'react-router-dom';

// Import images properly
import saree from '../images/saree.jpeg';
import stole from '../images/saree.jpeg'; // replace with stole image when available
import kurtui from '../images/womenKurti.jpeg'; // replace with stole image when available
import kurta from '../images/menKurti.jpeg'; // replace with stole image when available

const NewArrivals = () => {
  const products = [
    {
      id: 1,
      name: 'Sambalpuri Silk Saree',
      price: '₹3,499',
      category: 'Sarees',
      image: saree   // ✅ FIXED
    },
    {
      id: 2,
      name: 'Cotton Handloom Dress',
      price: '₹1,999',
      category: 'Dresses',
      image: kurtui  // simple URL
    },
    {
      id: 3,
      name: 'Traditional Kurta Set',
      price: '₹2,499',
      category: 'Kurtas',
      image: kurta  // simple URL
    },
    {
      id: 4,
      name: 'Handwoven Stole',
      price: '₹899',
      category: 'Accessories',
      image: stole   // using imported image
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-uppercase">New Arrivals</h2>
          <p className="text-muted">Discover our latest collection of handcrafted Sambalpuri products</p>
        </div>
        
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative overflow-hidden" style={{ height: '300px' }}>
                  <img 
                    src={product.image}
                    onError={e => e.target.src = `https://via.placeholder.com/300x400?text=${product.name}`}
                    className="card-img-top h-100 w-100 object-fit-cover"
                    alt={product.name}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">New</span>
                  </div>
                </div>
                <div className="card-body">
                  <span className="text-muted small">{product.category}</span>
                  <h5 className="card-title mb-1">{product.name}</h5>
                  <p className="card-text fw-bold text-primary mb-2">{product.price}</p>
                  <div className="d-grid gap-2">
                    <Link to={`/product/${product.id}`} className="btn btn-outline-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-5">
          <Link to="/new-arrivals" className="btn btn-primary btn-lg px-4">
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
