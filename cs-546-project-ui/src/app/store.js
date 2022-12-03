import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth.reducer';
import lookupReducer from '../redux/lookup.reducer';
import productsReducer from '../redux/product.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lookups: lookupReducer,
    products: productsReducer,
  },
});
