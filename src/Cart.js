import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { database } from './firebase';

function Cart() {
  const [cookie,] = useCookies(["user-id"]);
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const userid = cookie['user-id'];
    if(!userid){
      navigate('/login');
    }
  }, [cookie,navigate])

  useEffect(() => {
    const userid = cookie['user-id'];
    async function fetchData(){
      const response = await getDoc(doc(database, "Users", userid));
      setCartProducts(response.data().Cart || []);
    }
    fetchData();
  }, [cookie])

  return (
    <div className='home'>
      {cartProducts.map((x) => (
        <div key={x.id} className='items'> 
          <img src={x.ProductImage} alt="Product Image" />
          <div className='product-details'>{x.CartProduct}<br/>{x.ProductDetails}</div>
          {/* <div className='icon' onClick={goToCart}><AddShoppingCartIcon /></div> */}
          {/* <div className='favorites-icon' onClick={() => handlefavorites(x,index)}>
            <FavoriteIcon className={isClicked[index] ? 'clicked' : ''} />
          </div> */}
        </div>
      ))}      
    </div>
  )
}

export default Cart