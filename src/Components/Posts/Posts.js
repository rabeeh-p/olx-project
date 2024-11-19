import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import Heart from '../../assets/Heart';
import './Post.css';
import { Link } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products')); // Assuming your products are stored in the 'products' collection
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id }); // Adding the document ID to each product
        });
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <div className="postParentDiv">
    <div className="moreView">
      <div className="heading">
        <span>Quick Menu</span>
        <span>View more</span>
      </div>
      <div className="cards">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="cardLink">
              <div className="card">
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.imageUrl || "../../../Images/default.jpg"} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name">{product.description || 'Category'}</p>
                </div>
                <div className="date">
                  <span>{product.dateAdded}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default Posts;
