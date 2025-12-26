import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from '../../slices/ordersApiSlice';
import Message from '../../components/shared/Message';
import Loader from '../../components/shared/Loader';
import { FaShippingFast, FaCreditCard, FaBoxOpen, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: { 'client-id': paypal.clientId, currency: 'USD' },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('👑 Tribute Accepted! The Overlord is pleased.', { theme: "dark" });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      }).then((orderID) => { return orderID; });
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('🚚 Order Dispatched! The zoomies have begun.', { theme: "dark" });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="container mx-auto px-4 py-8 relative z-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-[#1a1025] p-6 rounded-[2rem] border border-white/5 shadow-2xl">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center text-amber-400 border border-purple-500/20">
             <FaBoxOpen size={24} />
           </div>
           <div>
             <h1 className="text-2xl font-black text-white tracking-tight">
               Order <span className="text-purple-400">#{order._id.substring(order._id.length - 8)}</span>
             </h1>
             <p className="text-gray-400 text-xs font-mono mt-1">
               PLACED ON {order.createdAt.substring(0, 10)}
             </p>
           </div>
        </div>
        
        <div className={`px-6 py-2 rounded-xl font-bold text-sm border flex items-center gap-2 ${
            order.isDelivered 
              ? 'bg-green-500/10 text-green-400 border-green-500/30' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
          }`}>
          {order.isDelivered ? <FaCheckCircle /> : <FaShippingFast />}
          {order.isDelivered ? 'DELIVERED' : 'IN TRANSIT'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (Details) */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* SHIPPING INFO */}
           <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-xl border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -z-10 group-hover:bg-purple-600/20 transition-all"></div>
             
             <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <FaUser className="text-purple-400" /> Servant Details
             </h2>
             
             <div className="space-y-4 text-gray-300">
                <p><span className="text-purple-400 font-bold uppercase text-xs tracking-wider">Name: </span> {order.user.name}</p>
                <p><span className="text-purple-400 font-bold uppercase text-xs tracking-wider">Email: </span> <a href={`mailto:${order.user.email}`} className="text-white hover:text-amber-400 transition-colors">{order.user.email}</a></p>
                <div className="pt-2">
                  <span className="text-purple-400 font-bold uppercase text-xs tracking-wider block mb-1">Destination: </span>
                  <p className="text-white text-lg leading-relaxed">
                    {order.shippingAddress.address}, <br/>
                    {order.shippingAddress.city} {order.shippingAddress.postalCode}, <br/>
                    {order.shippingAddress.country}
                  </p>
                </div>
             </div>

             <div className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${
                order.isDelivered 
                ? 'bg-green-900/20 border-green-500/30 text-green-400' 
                : 'bg-red-900/20 border-red-500/30 text-red-400'
              }`}>
               {order.isDelivered ? <FaCheckCircle /> : <FaTimesCircle />}
               <span className="font-bold text-sm uppercase tracking-wide">
                 {order.isDelivered ? `Delivered on ${order.deliveredAt.substring(0,10)}` : 'Not Delivered'}
               </span>
             </div>
           </div>

           {/* PAYMENT INFO */}
           <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-xl border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaCreditCard className="text-amber-400" /> Payment Method
              </h2>
              <p className="text-gray-300 mb-6">
                <span className="text-purple-400 font-bold uppercase text-xs tracking-wider">Method: </span>
                <span className="text-white font-bold ml-2">{order.paymentMethod}</span>
              </p>
              
              <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                order.isPaid 
                ? 'bg-green-900/20 border-green-500/30 text-green-400' 
                : 'bg-red-900/20 border-red-500/30 text-red-400'
              }`}>
                {order.isPaid ? <FaCheckCircle /> : <FaTimesCircle />}
                <span className="font-bold text-sm uppercase tracking-wide">
                  {order.isPaid ? `Paid on ${order.paidAt.substring(0,10)}` : 'Not Paid'}
                </span>
              </div>
           </div>

           {/* ORDER ITEMS */}
           <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-xl border border-white/5">
             <h2 className="text-xl font-bold text-white mb-6">Tribute Items</h2>
             <div className="divide-y divide-white/10">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 hover:bg-white/5 transition-colors px-2 rounded-lg -mx-2">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-white/10" />
                    <Link to={`/product/${item.product}`} className="font-bold text-white hover:text-amber-400 transition-colors">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-gray-400 font-mono text-sm">
                    {item.qty} x ${item.price} = <span className="font-bold text-amber-400 text-lg ml-2">${(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
           </div>
        </div>

        {/* RIGHT COLUMN (Summary & Actions) */}
        <div className="lg:col-span-4">
          <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-2xl border border-white/5 sticky top-24">
            <h2 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-widest border-b border-white/10 pb-4">
              Receipt
            </h2>
            
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between text-gray-400"><span>Subtotal</span><span className="text-white font-mono">${order.itemsPrice}</span></div>
              <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-white font-mono">${order.shippingPrice}</span></div>
              <div className="flex justify-between text-gray-400"><span>Tax</span><span className="text-white font-mono">${order.taxPrice}</span></div>
              
              <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-end">
                <span className="font-bold text-gray-300">Total Bribe</span>
                <span className="text-3xl font-black text-amber-400 font-mono">${order.totalPrice}</span>
              </div>
            </div>

            {/* PAYPAL BUTTONS (Only if NOT Paid) */}
            {!order.isPaid && (
               <div className="mt-6 relative z-0">
                 {loadingPay && <Loader />}
                 {isPending ? <Loader /> : (
                   <PayPalButtons
                     createOrder={createOrder}
                     onApprove={onApprove}
                     onError={onError}
                     style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                   ></PayPalButtons>
                 )}
               </div>
            )}

            {/* ADMIN DELIVER BUTTON */}
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                type='button'
                className='w-full mt-6 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/30 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group'
                onClick={deliverHandler}
              >
                <FaShippingFast className="group-hover:translate-x-1 transition-transform" /> Mark As Delivered
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderPage;