import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  totalQuantity: 0,
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   
    addToCart: (state, action) => {
      let find = state.value.findIndex(item => item.product_id === action.payload.product_id)
      if(find >= 0)
      {
        state.value[find].product_qty += 1;
      }
      else
      {
        
        state.value.push(action.payload)
      }
    },
    removeToCart : (state, action) => {
       state.value = state.value.filter(item => item.product_id !== action.payload) 
      },
      removeOne: (state, action) =>{
        state.value = state.value.map(item=>{
          
          if(item.product_id === action.payload)
          { 
            if(item.product_qty <= 0)
              return item
            return {...item , product_qty: item.product_qty - 1}
          }
          return item;
        })
      },
      addOne: (state, action) =>{
       state.value = state.value.map(item=>{
          if(item.product_id === action.payload)
          {
            return {...item , product_qty: item.product_qty + 1}
          }
          return item;
        })
      },
    getCartTotal: (state) =>{
      const {totalPrice , totalQuantity} = state.value.reduce((cartTotal, cartItem)=>{
        const {product_qty, product_price} = cartItem;
        const price = product_qty * product_price;
        cartTotal.totalPrice += price;
        cartTotal.totalQuantity += product_qty;
        return cartTotal; 
      },{
        totalPrice:0,
        totalQuantity:0,
      })
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    }
  },
 
})

// Action creators are generated for each case reducer function
export const { addToCart, removeToCart, getCartTotal, addOne, removeOne} = cartSlice.actions

export default cartSlice.reducer