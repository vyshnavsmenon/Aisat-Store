import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { database } from './firebase';

function Home() {
  const [cookie, setCookie] = useCookies(["user-id"]);
  const [isClicked, setIsClicked] = useState([]);
  const [data, setData] = useState([]);
  const [userProduct, setUserProduct] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const userid = cookie['user-id'];
    if(userid){
      async function fetchUserData() {
      
        const userData = await getDoc(doc(database, 'Users', userid));
        const userProductData = userData.data();
        const userProduct = userProductData ? userProductData.product || [] : [];
    
        const initialIsClicked = data.map((x) =>
          userProduct.some((fav) => fav.FavoriteProduct === x.Product)
        );
        setIsClicked(initialIsClicked);
      }
    
      fetchUserData();
    }
  }, [cookie, data]);

  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDoc(doc(database, 'Products', "lggcaqCqkbePsdgQFdXi"));
        if (response.exists()) {
          setData(response.data().product || []);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    const userid = cookie['user-id'];
    if (!userid) {
      navigate('/login');
    }
  }, [cookie]);
  

  async function handleAddToCart(product, index) {
    alert("Product added to the cart");
    const userid = cookie['user-id'];
    if (!userid) {
      console.error("User id not found");
      return;
    }
    const userData = await getDoc(doc(database, 'Users', userid));

    // Ensure userData.data.Cart is an array or initialize it as an empty array
    const userCart = userData.data().Cart || [];

    await updateDoc(doc(database, 'Users', userid), {
      Cart: [
        ...userCart,
        {
          CartProduct: product.Product,
          ProductDetails: product.ProductDetails,
          ProductImage: product.imageUrl,
        },
      ],
    });
  }

  async function handleAddToFavorites(product, index) {
    const updatedIcons = [...isClicked];
    updatedIcons[index] = !isClicked[index];
    setIsClicked(updatedIcons);

    const userid = cookie['user-id'];
    if (!userid) {
      console.error("User id not found");
      return;
    }
    const userData = await getDoc(doc(database, 'Users', userid));

    // Ensure userData.data.product is an array or initialize it as an empty array
    const userProduct = userData.data().product || [];

    await updateDoc(doc(database, 'Users', userid), {
      product: [
        ...userProduct,
        {
          FavoriteProduct: product.Product,
          ProductDetails: product.ProductDetails,
          ProductImage: product.imageUrl,
        },
      ],
    });
  }

  return (
    <div className='home1'>
      <div className='home'>
        {data.map((product, index) => (
          <div key={product.id} className='items'>
            <img src={product.imageUrl} alt="Product Image" />
            <div className='product-details'>
              {product.Product}
              <br />
              {product.ProductDetails}
            </div>
            <div className='icon' onClick={() => handleAddToCart(product, index)}>
              <AddShoppingCartIcon />
            </div>
            <div className='favorites-icon' onClick={() => handleAddToFavorites(product, index)}>
              <FavoriteIcon className={isClicked[index] ? 'clicked' : ''} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
