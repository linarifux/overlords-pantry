import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaUser, FaHistory, FaSave, FaTimes, FaCheck, FaEye, FaCreditCard } from 'react-icons/fa';

import { useProfileMutation } from '../../slices/usersApiSlice'; 
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { setCredentials } from '../../slices/authSlice';

import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // API Hooks
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passphrases do not match. Focus, servant.');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Credentials updated successfully.');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COL: USER PROFILE FORM */}
        <div className="lg:col-span-4">
          <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[50px] -z-10"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <FaUser size={20} />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Servant Profile</h2>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-gray-400 font-bold text-xs uppercase tracking-wider ml-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 font-bold text-xs uppercase tracking-wider ml-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 font-bold text-xs uppercase tracking-wider ml-1">New Passphrase</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 font-bold text-xs uppercase tracking-wider ml-1">Confirm Passphrase</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold py-3 rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
              >
                {loadingUpdateProfile ? <Loader className="w-4 h-4" /> : <><FaSave /> Update Credentials</>}
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT COL: ORDER HISTORY */}
        <div className="lg:col-span-8">
          <div className="bg-[#1a1025] p-8 rounded-[2rem] shadow-2xl border border-white/5 h-full">
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <FaHistory size={20} />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Tribute History</h2>
            </div>

            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders?.data?.message || errorOrders.error}</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="bg-black/40 text-purple-400 uppercase text-xs font-bold tracking-widest leading-normal border-b border-white/5">
                      <th className="py-4 px-6 text-left">ID</th>
                      <th className="py-4 px-6 text-left">Date</th>
                      <th className="py-4 px-6 text-left">Total</th>
                      <th className="py-4 px-6 text-center">Paid</th>
                      <th className="py-4 px-6 text-center">Delivered</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-sm font-light">
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b border-white/5 hover:bg-purple-500/5 transition-colors duration-150">
                        <td className="py-4 px-6 text-left whitespace-nowrap font-mono text-xs text-gray-500">
                          {order._id.substring(order._id.length - 8)}
                        </td>
                        <td className="py-4 px-6 text-left font-medium">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="py-4 px-6 text-left font-mono text-amber-400 font-bold">
                          ${order.totalPrice}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {order.isPaid ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                              <FaCheck size={10} />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                              <FaTimes size={10} />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          {order.isDelivered ? (
                             <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                               <FaCheck size={10} />
                             </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                              <FaTimes size={10} />
                            </div>
                          )}
                        </td>
                        
                        {/* ACTION COLUMN: Shows "Pay Tribute" if unpaid */}
                        <td className="py-4 px-6 text-center">
                          {!order.isPaid ? (
                            <Link 
                              to={`/order/${order._id}`} 
                              className="inline-flex items-center gap-1 bg-amber-500 text-purple-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:bg-amber-400 hover:scale-105 shadow-[0_0_10px_rgba(245,158,11,0.4)] animate-pulse"
                            >
                              <FaCreditCard /> Pay Tribute
                            </Link>
                          ) : (
                            <Link 
                              to={`/order/${order._id}`} 
                              className="inline-flex items-center gap-1 bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            >
                              <FaEye /> View
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && (
                   <div className="text-center py-12 text-gray-500">
                     <p>You have not submitted tribute yet.</p>
                     <Link to="/" className="text-amber-400 hover:underline text-sm mt-2 block">Start Worshiping</Link>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;