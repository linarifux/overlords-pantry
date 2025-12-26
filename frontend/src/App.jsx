import { Routes, Route, useLocation } from "react-router-dom";
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
import ProductEditPage from './pages/admin/ProductEditPage';

const App = () => {
  const location = useLocation();
  
  // Define routes that need full width (no container) to look good
  const fullWidthRoutes = ['/', '/login', '/register'];
  const isFullWidth = fullWidthRoutes.includes(location.pathname);

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }} deferLoading={true}>
      
      {/* 1. GLOBAL WRAPPER: Dark Theme Base */}
      <div className="flex flex-col min-h-screen bg-[#0f0716] text-gray-100 font-sans selection:bg-amber-500 selection:text-purple-900 relative overflow-x-hidden">
        
        {/* 2. GLOBAL AMBIENT BACKGROUND (Fixed behind everything) */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Top Right Purple Blob */}
          <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-purple-900/10 rounded-full blur-[120px] animate-pulse"></div>
          {/* Bottom Left Amber Blob */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] bg-amber-900/5 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
          {/* Grain/Noise Overlay for Texture (Optional, adds premium feel) */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        {/* 3. HEADER (Z-Index to stay on top) */}
        <div className="relative z-50">
          <Header />
        </div>

        {/* 4. MAIN CONTENT */}
        {/* We conditionally apply 'container' so Home Page can be full-width, but inner pages stay centered */}
        <main className={`grow relative z-10 ${isFullWidth ? '' : 'container mx-auto px-4 py-8 md:py-12'}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/orderlist" element={<OrderListPage />} />
            <Route path="/admin/productlist" element={<ProductListPage />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* 5. FOOTER */}
        <div className="relative z-10">
          <Footer />
        </div>

        {/* 6. TOAST NOTIFICATIONS (Styled for Dark Mode) */}
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName={() => 
            "relative flex p-1 min-h-10 rounded-xl justify-between overflow-hidden cursor-pointer bg-[#1a1025] border border-white/10 shadow-2xl shadow-purple-900/20 mb-4 p-4 text-sm text-gray-200 font-sans"
          }
          bodyClassName={() => "text-sm font-medium block p-3"}
          progressClassName="bg-gradient-to-r from-purple-500 to-amber-500"
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default App;