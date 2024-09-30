import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import HomePage from "./pages/home/home.page.jsx";
import CartPage from "./pages/cart/cart.page.jsx";
import RootLayout from "./layouts/root.layout.jsx";
import CheckoutPage from "./pages/checkout/checkout.page.jsx";
import { ClerkProvider } from '@clerk/clerk-react';
import SignInPage from "./pages/auth/sign-in/sign-in.page.jsx";
import SignUpPage from "./pages/auth/sign-up/sign-up.page.jsx";
import PaymentPage from "./pages/payment/payment.page.jsx";
import { Toaster } from 'sonner';
import ShopPage from "./pages/shop/shop.page.jsx";
import ProductDetailsPage from "./pages/productDetails/productDetails.page.jsx";
import ClothesDetailsPage from "./pages/productDetails/clothesDetails.page.jsx";
import OrdersHistoryPage from "./pages/ordersHistory/ordersHistory.page.jsx";



// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path:"/productDetails/:id",
        element: <ProductDetailsPage/>
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path:"/payment",
        element: <PaymentPage/>
      },
      {
        path:"/ClothesDetails/:id",
        element: <ClothesDetailsPage/>
      },
      {
        path:"/OrderHistory",
        element: <OrdersHistoryPage/>
      }
    ],
  },
  {
    path:"/sign-in",
    element: <SignInPage/>
  },
  {
    path:"/sign-up",
    element: <SignUpPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster richColors/>
    </ClerkProvider>
  </React.StrictMode>
);
