import { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'; 
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';

const MySwal = withReactContent(Swal);

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const [keyword, setKeyword] = useState('');

  const deleteHandler = async (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this product!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b21a8',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      background: '#1a1025', // Dark background for modal
      color: '#fff', // White text
      backdrop: `rgba(0,0,0,0.8)`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id);
          refetch();
          toast.success('Product deleted', { theme: "dark" });
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

  const createProductHandler = async () => {
    MySwal.fire({
      title: 'Create new offering?',
      text: "This will create a blank sample product.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6b21a8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!',
      iconColor: '#fbbf24',
      background: '#1a1025',
      color: '#fff',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await createProduct();
          refetch();
          toast.success('Sample product created', { theme: "dark" });
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    });
  };

  // Filter Logic
  const filteredProducts = products?.filter((product) => 
    product.name.toLowerCase().includes(keyword.toLowerCase()) || 
    product.category.toLowerCase().includes(keyword.toLowerCase())
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-[#1a1025] p-6 rounded-[2rem] border border-white/5 shadow-xl">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Inventory <span className="text-purple-400">Management</span>
        </h1>
        
        {/* Search Bar UI - Dark Mode */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-purple-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-[#0f0716] text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 sm:text-sm transition duration-150 ease-in-out shadow-inner"
            placeholder="Search by name or category..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/30 whitespace-nowrap transform hover:-translate-y-1"
        >
          <FaPlus /> Create Product
        </button>
      </div>

      {(loadingCreate || loadingDelete) && <Loader />}

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
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Price</th>
                <th className="py-4 px-6 text-left">Category</th>
                <th className="py-4 px-6 text-left">Brand</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm font-light">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-b border-white/5 hover:bg-purple-500/5 transition-colors duration-150">
                  <td className="py-4 px-6 text-left whitespace-nowrap font-mono text-xs text-gray-500">
                    {product._id.substring(product._id.length - 6)}
                  </td>
                  <td className="py-4 px-6 text-left">
                    <Link 
                      to={`/product/${product._id}`} 
                      className="font-bold text-white hover:text-amber-400 hover:underline transition-colors text-base"
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-left font-mono text-amber-300 font-bold">
                    ${product.price}
                  </td>
                  <td className="py-4 px-6 text-left">
                    <span className="bg-purple-900/40 border border-purple-500/30 text-purple-300 py-1 px-3 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-left text-gray-400">{product.brand}</td>
                  <td className="py-4 px-6 text-center flex justify-center gap-4">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="text-blue-400 hover:text-blue-300 bg-blue-400/10 p-2 rounded-lg hover:bg-blue-400/20 transition-all"
                    >
                      <FaEdit size={16} />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-400 hover:text-red-300 bg-red-400/10 p-2 rounded-lg hover:bg-red-400/20 transition-all"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                 <tr>
                   <td colSpan="6" className="text-center py-12 text-gray-500 italic">
                     No products found matching "{keyword}"
                   </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;