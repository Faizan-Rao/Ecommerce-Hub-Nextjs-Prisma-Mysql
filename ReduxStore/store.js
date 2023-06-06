import cartReducer from "@/services/LocalSlices/CartLocalSlice";
import { userApi } from "@/services/userApiSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import { userSlice } from "@/services/LocalSlices/UserLocalSlice";

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  cart: cartReducer,
  user: userSlice.reducer
});

const _persistedReducer = persistReducer(persistConfig, rootReducer);
 const store = configureStore({
  reducer:_persistedReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ],
      },
    })).concat(userApi.middleware),
});
const persistor = persistStore(store)

export {store, persistor}
