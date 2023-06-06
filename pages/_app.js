import "@/styles/globals.css";
import { store, persistor}  from "@/ReduxStore/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "@/components/User/Navbar";
import { ChakraProvider } from '@chakra-ui/react'
import CartDrawer from "@/components/User/CartDrawer";
import Banner from "@/components/User/Banner";
import Footer from "@/components/User/Footer";
import { useState } from "react";
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

export default function App({ Component, pageProps }) {
  const path = useRouter().pathname;
  const {cart, setCart} = useState(["Product"]);

  return (
    <>
      { 
        path.includes("/admin") ? (
        // Super Admin Interfaces 
        <ChakraProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        </ChakraProvider>
      ) : path.includes("/storeAdmin") ? (
        // Store Admin Interfaces
        <ChakraProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        </ChakraProvider>
      ) : (
        // Normal User Interafaces
        <ChakraProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <Navbar/>
          <Banner/>
          <CartDrawer/>
          <Component cart={cart} setCart={setCart} {...pageProps} />
          <Footer/>
          </PersistGate>
          
        </Provider>
        </ChakraProvider>
        )
      }
    </>
  );
}
