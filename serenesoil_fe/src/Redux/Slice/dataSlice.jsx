import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../Config/api_url";

// -------------------fetch Token ------------------------------
const token = localStorage.getItem("authToken");
// ------------------thunk fetch cart Items---------------
export const fetchCartItems = createAsyncThunk(
  "data/fetchCartItems",
  async () => {
    try {
      console.log("working");
      const response = await axios.get(`${API_URL}/api/user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", response);
      return response.data.user.cartData;
    } catch (error) {
      console.log(error);
    }
  }
);
// -------------------thunk fetch Products------------------
export const fetchProductList = createAsyncThunk(
  "data/fetchProductList",
  async () => {
    const response = await axios.get(`${API_URL}/api/product/list`);

    return response.data.list;
  }
);
// ----------------thunk add to cart----------------------
export const addToCart = createAsyncThunk(
  "data/addToCart",
  async ({ userID, productID }, { rejectWithValue }) => {
    try {
      // console.log("working");
      const response = await axios.post(
        `${API_URL}/api/cart/addToCart`,
        {
          productID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log("response", response.data.cartData);
      return response.data.cartData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// ---------------thunk remove from cart--------------------
export const removeFromCart = createAsyncThunk(
  "data/removeFromCart",
  async ({ userID, productID }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/removeFromCart`,
        {
          productID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(response.data.cartData);
      return response.data.cartData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// --------------------thunk to delete from cart------------------------
export const deleteFromCart = createAsyncThunk(
  "data/deleteFromCart",
  async ({ userID, productID }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cart/deleteFromCart`,
        {
          productID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(response);
      return response.data.cartData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const dataSlice = createSlice({
  name: "data",
  initialState: {
    product_list: [],
    cartItems: {},
    status: "idle",
    editCartStatus: "idle",
    filteredData: ["oil", "spice", "utilities", "devotional", "cooking", "cosmetics"],
  },
  reducers: {
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    resetData : (state)=>{
      state.product_list = []
      state.cartItems = {}
      state.status = 'idle'
      state.editCartStatus = 'idle'
      state.filteredData = ["oil", "spice", "utilities", "devotional", "cooking", "cosmetics"]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = "Success";
        state.product_list = action.payload;
      })
      .addCase(fetchProductList.rejected, (state) => {
        state.status = "Failed";
      })
      .addCase(addToCart.pending, (state) => {
        state.editCartStatus = "Loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.editCartStatus = "Success";
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.editCartStatus = "Failed";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.editCartStatus = "Loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.editCartStatus = "Success";
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.editCartStatus = "Failed";
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.editCartStatus = "Loading";
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.editCartStatus = "Success";
        state.cartItems = action.payload;
      })
      .addCase(deleteFromCart.rejected, (state) => {
        state.editCartStatus = "Failed";
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.editCartStatus = "Loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.editCartStatus = "Success";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.editCartStatus = "Failed";
      });
  },
});
export const {  setFilteredData, resetData} = dataSlice.actions
export default dataSlice.reducer;
