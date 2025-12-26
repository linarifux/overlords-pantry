import { Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

// Pages
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import CartPage from "./pages/cart/CartPage";
import LoginPage from "./pages/auth/LoginPage";
import ShippingPage from "./pages/shipping/ShippingPage";
import PaymentPage from "./pages/payment/PaymentPage";
import PlaceOrderPage from "./pages/placeorder/PlaceOrderPage";
import OrderPage from "./pages/order/OrderPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderListPage from './pages/admin/OrderListPage'; 
import ProductListPage from './pages/admin/ProductListPage'; 

const App = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "test" }} deferLoading={true}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8 grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/admin/orderlist" element={<OrderListPage />} />
            <Route path="/admin/productlist" element={<ProductListPage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Add the ToastContainer at the bottom */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // Matches the Overlord theme
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default App;
