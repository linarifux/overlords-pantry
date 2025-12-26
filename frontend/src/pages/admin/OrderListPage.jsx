import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Message from '../../components/shared/Message';
import Loader from '../../components/shared/Loader';
import { FaTimes, FaCheck, FaClipboardList } from 'react-icons/fa';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400 border border-purple-500/20">
             <FaClipboardList size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Tribute <span className="text-purple-400">Log</span>
          </h1>
          <p className="text-gray-400 text-sm">Tracking bribes from loyal servants.</p>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto bg-[#1a1025] rounded-[2rem] shadow-2xl border border-white/5">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-black/40 text-amber-400 uppercase text-xs font-bold tracking-widest leading-normal border-b border-white/5">
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Servant (User)</th>
                <th className="py-4 px-6 text-left">Date</th>
                <th className="py-4 px-6 text-left">Bribe Total</th>
                <th className="py-4 px-6 text-center">Payment</th>
                <th className="py-4 px-6 text-center">Delivery</th>
                <th className="py-4 px-6 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm font-light">
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-white/5 hover:bg-purple-500/5 transition-colors duration-150">
                  
                  {/* ID */}
                  <td className="py-4 px-6 text-left whitespace-nowrap font-mono text-xs text-gray-500">
                    {order._id.substring(order._id.length - 8)}
                  </td>
                  
                  {/* User */}
                  <td className="py-4 px-6 text-left font-bold text-white">
                    {order.user && order.user.name}
                  </td>
                  
                  {/* Date */}
                  <td className="py-4 px-6 text-left text-gray-400">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  
                  {/* Total */}
                  <td className="py-4 px-6 text-left font-mono text-amber-300 font-bold text-base">
                    ${order.totalPrice}
                  </td>
                  
                  {/* Paid Status */}
                  <td className="py-4 px-6 text-center">
                    {order.isPaid ? (
                      <div className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 py-1 px-3 rounded-lg text-xs font-bold uppercase tracking-wider">
                        <FaCheck size={10} /> {order.paidAt.substring(0, 10)}
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 py-1 px-3 rounded-lg text-xs font-bold uppercase tracking-wider">
                        <FaTimes size={10} /> Unpaid
                      </div>
                    )}
                  </td>
                  
                  {/* Delivered Status */}
                  <td className="py-4 px-6 text-center">
                    {order.isDelivered ? (
                      <div className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-400 py-1 px-3 rounded-lg text-xs font-bold uppercase tracking-wider">
                        <FaCheck size={10} /> Delivered
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 py-1 px-3 rounded-lg text-xs font-bold uppercase tracking-wider">
                         <FaTimes size={10} /> Pending
                      </div>
                    )}
                  </td>
                  
                  {/* Action */}
                  <td className="py-4 px-6 text-center">
                    <Link 
                      to={`/order/${order._id}`} 
                      className="bg-purple-900/50 text-white py-2 px-4 rounded-xl hover:bg-amber-500 hover:text-purple-900 transition-all font-bold text-xs shadow-lg uppercase tracking-wide"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderListPage;