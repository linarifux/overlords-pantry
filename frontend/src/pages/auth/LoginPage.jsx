import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import Loader from '../../components/shared/Loader';
import { FaCat, FaLock, FaEnvelope } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      setErrMsg(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Login Card */}
      <div className="max-w-md w-full space-y-8 bg-[#1a1025] p-10 rounded-[3rem] shadow-2xl border border-white/10 relative overflow-hidden group">
        
        {/* Background Glow Effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-[60px] -z-10 group-hover:bg-purple-600/20 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-600/5 rounded-full blur-[60px] -z-10 group-hover:bg-amber-600/10 transition-all duration-700"></div>

        {/* Header Section */}
        <div className="text-center relative">
          <div className="mx-auto h-20 w-20 bg-[#0f0716] rounded-2xl flex items-center justify-center border border-white/5 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-500">
            <FaCat className="h-10 w-10 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Identify Yourself
          </h2>
          <p className="mt-3 text-sm text-purple-200/60 font-medium">
            Enter your credentials to serve the Overlord.
          </p>
        </div>

        {/* Custom Error Message */}
        {errMsg && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl relative text-sm text-center animate-pulse">
            <span className="font-bold mr-1">Error:</span> {errMsg}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-5">
            
            {/* Email Input */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500 group-focus-within/input:text-amber-400 transition-colors" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="block w-full pl-11 pr-4 py-4 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium shadow-inner"
                placeholder="Servant Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-500 group-focus-within/input:text-amber-400 transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-11 pr-4 py-4 bg-[#0f0716] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm font-medium shadow-inner"
                placeholder="Passphrase"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4" /> Authenticating...
                </div>
              ) : (
                'Access Pantry'
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6 pt-6 border-t border-white/5">
           <p className="text-sm text-gray-500">
             New Servant?{' '}
             <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="font-bold text-amber-500 hover:text-amber-400 transition-colors hover:underline">
               Register here
             </Link>
           </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;