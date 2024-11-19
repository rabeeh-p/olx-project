import React, { useState } from 'react';
import { db, auth } from '../../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Create.css'; // Import CSS file for styling

function PostProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET); // Your unsigned preset name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url; 
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      alert('Error uploading image. Please try again.');
      throw error;
    }
  };

  const validateInputs = () => {
    // Reset the error message
    setError('');

    // Check if fields are empty
    if (!name || !price || !description || !file) {
      setError('All fields are required.');
      return false;
    }

    // Validate price is a positive number
    if (isNaN(price) || parseFloat(price) <= 0) {
      setError('Price must be a positive number.');
      return false;
    }

    // Validate file type (image only)
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert('You need to be logged in to post a product.');
      return;
    }

    // Validate inputs before proceeding
    if (!validateInputs()) {
      return; // Don't submit the form if validation fails
    }

    try {
      const imageUrl = await uploadToCloudinary(file);

      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        userId: auth.currentUser.uid,
        timestamp: Timestamp.fromDate(new Date()),
      });

      alert('Product posted successfully!');
      navigate('/'); // Navigate to the home page after success
    } catch (error) {
      console.error('Error posting product:', error);
      alert('Error posting product. Please try again.');
    }
  };

  return (
    <div className="postProductForm">
      <h2 className="formTitle">Post Your Product</h2>

      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="inputField"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
          className="inputField"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="textareaField"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          className="inputField"
        />
        <button type="submit" className="submitBtn">
          Post Product
        </button>
      </form>
    </div>
  );
}

export default PostProduct;
