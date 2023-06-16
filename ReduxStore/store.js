import cartReducer from "@/services/LocalSlices/CartLocalSlice";
import { userApi } from "@/services/userApiSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import { userSlice } from "@/services/LocalSlices/UserLocalSlice";
import { sadminApi } from "@/services/sadminApiSlice";
import { adminSlice } from "@/services/LocalSlices/AdminLocalSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  whitelist: ["cart", "user", "admin"],
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [sadminApi.reducerPath]: sadminApi.reducer,
  cart: cartReducer,
  user: userSlice.reducer,
  admin: adminSlice.reducer,
});

const _persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([userApi.middleware, sadminApi.middleware]),
});
const persistor = persistStore(store);

export { store, persistor };
