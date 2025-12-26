import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'; // <--- Import useSelector
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation, // <--- Import
} from '../../slices/ordersApiSlice';
import Message from '../../components/shared/Message';
import Loader from '../../components/shared/Loader';
import { FaShippingFast, FaCreditCard, FaBoxOpen, FaUser } from 'react-icons/fa';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation(); // <--- Init Hook

  const { userInfo } = useSelector((state) => state.auth); // <--- Get User Info

  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // ... (useEffect for PayPal remains the same) ...
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

  // ... (onApprove, onError, createOrder remain the same) ...
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('👑 Tribute Accepted!');
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


  // NEW HANDLER: Mark as Delivered
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('🚚 Order Dispatched! The zoomies have begun.', {
        theme: "dark"
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="container mx-auto px-4 py-8">
      
      {/* ... (Header Section with ID and Status Badge remains the same) ... */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">Order <span className="text-purple-600">#{order._id}</span></h1>
           <p className="text-gray-500 text-sm mt-1">Placed on {order.createdAt.substring(0, 10)}</p>
        </div>
        <div className={`px-4 py-2 rounded-full font-bold text-sm ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {order.isDelivered ? 'Delivered' : 'Processing / In Transit'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (Details) - Remains the same */}
        <div className="md:col-span-8 space-y-8">
           {/* ... Shipping Info Block ... */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             {/* ... content ... */}
             <div className="text-gray-600 space-y-1">
                <p><span className="font-semibold text-gray-900">Name: </span> {order.user.name}</p>
                <p><span className="font-semibold text-gray-900">Email: </span> <a href={`mailto:${order.user.email}`} className="text-purple-600 hover:underline">{order.user.email}</a></p>
                <p className="mt-4">
                  <span className="font-semibold text-gray-900 block mb-1">Address: </span>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
             </div>
             <div className={`mt-4 p-3 rounded-lg border ${order.isDelivered ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
               {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not Delivered'}
             </div>
           </div>

           {/* ... Payment Info Block ... */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              {/* ... content ... */}
              <p className="text-gray-600 mb-4"><span className="font-semibold text-gray-900">Method: </span>{order.paymentMethod}</p>
              <div className={`p-3 rounded-lg border ${order.isPaid ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
              </div>
           </div>

           {/* ... Order Items Block ... */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             {/* ... content ... */}
             <div className="divide-y divide-gray-100">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                    <Link to={`/product/${item.product}`} className="font-medium text-gray-800 hover:text-purple-600">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {item.qty} x ${item.price} = <span className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
           </div>
        </div>

        {/* RIGHT COLUMN (Summary & Actions) */}
        <div className="md:col-span-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Receipt Summary</h2>
            
            <div className="space-y-3 text-sm mb-6">
              {/* ... Price Breakdown ... */}
              <div className="flex justify-between text-gray-600"><span>Items</span><span>${order.itemsPrice}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>${order.shippingPrice}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>${order.taxPrice}</span></div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900"><span>Total</span><span>${order.totalPrice}</span></div>
            </div>

            {/* PAYPAL BUTTONS (Only if NOT Paid) */}
            {!order.isPaid && (
               <div>
                 {loadingPay && <Loader />}
                 {isPending ? <Loader /> : (
                   <PayPalButtons
                     createOrder={createOrder}
                     onApprove={onApprove}
                     onError={onError}
                   ></PayPalButtons>
                 )}
               </div>
            )}

            {/* ADMIN DELIVER BUTTON (Only if Paid & Not Delivered & IsAdmin) */}
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                type='button'
                className='w-full mt-4 bg-purple-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-800 transition-all shadow-md'
                onClick={deliverHandler}
              >
                Mark As Delivered
              </button>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderPage;