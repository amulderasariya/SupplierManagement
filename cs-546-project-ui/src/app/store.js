import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth.reducer';
import dashboardReducer from '../redux/dashboard.reducer';
import lookupReducer from '../redux/lookup.reducer';
import ordersReducer from '../redux/order.reducer';
import productsReducer from '../redux/product.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lookups: lookupReducer,
    products: productsReducer,
    orders: ordersReducer,
    dashboard: dashboardReducer,
  },
});
