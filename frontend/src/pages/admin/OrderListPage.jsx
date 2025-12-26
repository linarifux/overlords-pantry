import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Message from '../../components/shared/Message';
import Loader from '../../components/shared/Loader';
import { FaTimes } from 'react-icons/fa';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Tributes</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-purple-950 text-amber-400 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">User</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-center">Paid</th>
                <th className="py-3 px-6 text-center">Delivered</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{order._id}</td>
                  <td className="py-3 px-6 text-left">{order.user && order.user.name}</td>
                  <td className="py-3 px-6 text-left">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-3 px-6 text-left font-bold text-gray-900">${order.totalPrice}</td>
                  <td className="py-3 px-6 text-center">
                    {order.isPaid ? (
                      <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs">
                        {order.paidAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes style={{ color: 'red' }} className="mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {order.isDelivered ? (
                      <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs">
                        {order.deliveredAt.substring(0, 10)}
                      </span>
                    ) : (
                      <FaTimes style={{ color: 'red' }} className="mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Link to={`/order/${order._id}`} className="bg-purple-100 text-purple-600 py-1 px-3 rounded hover:bg-purple-200 transition-colors font-bold text-xs">
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