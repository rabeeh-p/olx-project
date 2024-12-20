import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { db } from '../../firebase/config'; 
import { doc, getDoc } from 'firebase/firestore'; 
import './productDetail.css';
import Header from '../Header/Header';

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data()); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [id]); 

  return (
    <>
    <Header/>
    <div className="productPage">
  {product ? (
    <div className="productCard">
      <h1 className="productName">{product.name}</h1>
      <img 
        className="productImage" 
        src={product.imageUrl || "../../../Images/default.jpg"} 
        alt={product.name} 
      />
      <p className="productDescription">{product.description}</p>
      <p className="productPrice">Price: &#x20B9; {product.price}</p>
      <p className="productCategory">Category: {product.category}</p>
      
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>
</>

  );
}

export default ProductDetail;
