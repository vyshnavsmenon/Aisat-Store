import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { database } from './firebase';
import Navbar from './Navbar';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Main() {
  const [cookie, setCookie] = useCookies(["user-id"]);
  const [isClicked, setIsClicked] = useState([]);
  const [data, setData] = useState([]);
  const [userProduct, setUserProduct] = useState([])
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);

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
        const response = await getDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"));
        if (response.exists()) {
          setData(response.data().Products || []);
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

  useEffect(() => {
    async function fetchData(){
      const response = await getDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"));
      const productData = response.data().Products || []
      setCount(productData.Count);
    }
  }, [])
  

  async function handleAddToCart(product, index) {
    
    const userid = cookie['user-id'];
    if (!userid) {
      console.error("User id not found");
      return;
    }
  
    try {
      const userDocRef = doc(database, 'Users', userid);
      const userData = await getDoc(userDocRef);
  
      // Ensure userData.data.Cart is an array or initialize it as an empty array
      let userCart = userData.data().Cart || [];
      console.log("Initial userCart:", userCart);
  
      // Check for duplicates based on a unique identifier (e.g., product.Product)
      const isDuplicate = userCart.find((cartItem) => cartItem.ProductID === product.ProductID) !== undefined;
      console.log("Is duplicate:", isDuplicate);
  
      if (!isDuplicate) {
        // If it's not a duplicate, add the product to the cart
        const updatedCart = [
          ...userCart,
          {
            CartProduct: product.Name,
            ProductDetails: product.Price,
            ProductImage: product.ImageUrl,
            ProductID: product.ProductID,
            Stock: product.Stock
          },
        ];
  
        // Update the Firestore document with the new cart data
        await updateDoc(userDocRef, { Cart: updatedCart });
  
        // Refresh userCart with the updated data
        userCart = updatedCart;
        console.log("Updated userCart:", userCart);
        alert("Product added to the cart");
      } else {
        alert("Product is already in the cart");
      }      
    } catch (error) {
      console.error("Firestore error:", error);
    }
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

    const isDuplicate = userProduct.find((favItem) => favItem.ProductID === product.ProductID)

    if(!isDuplicate){
      await updateDoc(doc(database, 'Users', userid), {
        product: [
          ...userProduct,
          {
            FavoriteProduct: product.Name,
            ProductDetails: product.Price,
            ProductImage: product.ImageUrl,
            ProductID: product.ProductID,
            Stock: product.Stock,
            Count : value
          },
        ],
      });
      alert("Added to favorites");
    }
    else{
      alert("Already added to the favorites");
    }
  }

  async function incrementValue(product){
    setValue(value+1);
    const productData = await getDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"))
    const pdtData = productData.data().Products;
    const bool = pdtData.find((Item) => Item.ProductID === product.ProductID)
    if(bool){
      bool.Count = value+1;
      await updateDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"),{        
          Products: pdtData        
      })
    }
  }
  async function decremenentValue(product){
    setValue(value-1);
    const productData = await getDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"))
    const pdtData = productData.data().Products;
    const bool = pdtData.find((Item) => Item.ProductID === product.ProductID)
    if(bool){
      bool.Count = value-1;
      await updateDoc(doc(database, 'Products', "X5xa4y5EAkbPlaeEGBYp"),{        
          Products: pdtData        
      })
    }
  }

  return (
    <>      
      <Navbar showNavbar={true}/>
      <div className='home1'>
      <div className='outerdiv'>
      {data.map((product, index) => (
        <div className='product_outerdiv'>
          <img src={product.ImageUrl} alt="Product Image" />                    
            <div className='product-details'>
              {product.Name}
              <br/>
              {product.Price}
            </div>
            <div className='icon' onClick={() => handleAddToCart(product, index)}>
              <AddShoppingCartIcon />
            </div>
            <div className='favorites-icon' onClick={() => handleAddToFavorites(product, index)}>
              <FavoriteIcon className={isClicked[index] ? 'clicked' : ''} />
            </div>
            <div className='product-count'><AddIcon className='add-icon' onClick={() => {incrementValue(product,index)}}/>
          <input value={product.Count} type='text' className='update-value'/>
          <RemoveIcon className='add-icon' onClick={() => {decremenentValue(product,index)}} /></div>
        </div>
      ))}        
      </div>
    </div>
    </>
  );
}

export default Main;