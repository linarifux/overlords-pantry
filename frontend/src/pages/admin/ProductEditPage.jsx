import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaUpload, FaSave, FaBoxOpen } from 'react-icons/fa';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  // API Hooks
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  // Populate Form on Load
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); 
      
      toast.success('Product updated successfully', { theme: 'dark' });
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message, { theme: 'dark' });
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
      
      <Link to='/admin/productlist' className='flex items-center gap-2 text-gray-400 hover:text-amber-400 mb-6 font-semibold transition-colors w-fit'>
         <FaArrowLeft /> Back to Inventory
      </Link>

      <div className="bg-[#1a1025] rounded-[2rem] shadow-2xl p-8 border border-white/10 relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -z-10"></div>
        
        <div className="flex items-center gap-3 mb-8">
           <div className="p-3 bg-purple-900/30 rounded-xl text-amber-400">
             <FaBoxOpen size={24} />
           </div>
           <h1 className="text-3xl font-black text-white tracking-tight">Edit Offering</h1>
        </div>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Name */}
            <div className="space-y-2">
              <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1">Product Name</label>
              <input
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-600"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1">Price ($)</label>
                <input
                  type='number'
                  placeholder='0.00'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-5 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-600 font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1">Stock Count</label>
                <input
                  type='number'
                  placeholder='0'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="w-full px-5 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-600 font-mono"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1">Product Image</label>
              
              <div className="hidden">
                 <input
                  type='text'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  readOnly
                />
              </div>

              {/* THUMBNAIL AREA */}
              <div className="relative group my-4 flex justify-center p-6 border-2 border-dashed border-white/10 rounded-2xl bg-[#0f0716]/50 min-h-[200px] items-center transition-all hover:border-purple-500/50 hover:bg-[#0f0716]">
                  {loadingUpload ? (
                      <div className="text-center z-10">
                          <Loader />
                          <p className="text-sm text-amber-400 mt-4 font-bold animate-pulse">Uploading to Cloud...</p>
                      </div>
                  ) : image ? (
                      <div className="relative z-10">
                        <img 
                          src={image} 
                          alt="Product Preview" 
                          className="h-48 w-48 object-contain rounded-xl shadow-2xl bg-[#1a1025] p-2 border border-white/10" 
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                          UPLOADED
                        </div>
                      </div>
                  ) : (
                      <div className="text-center text-gray-500 z-10">
                        <FaUpload className="mx-auto text-3xl mb-2 opacity-50" />
                        <p className="text-sm">No image uploaded</p>
                      </div>
                  )}
                  
                  {/* Background Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              </div>

              <label className="w-full flex items-center justify-center gap-2 cursor-pointer bg-[#0f0716] text-purple-400 border border-purple-500/30 py-3 rounded-xl hover:bg-purple-500/10 hover:text-purple-300 transition-all font-bold group">
                 <FaUpload className="group-hover:-translate-y-1 transition-transform" /> 
                 <span>Select New Image</span>
                 <input
                    type="file"
                    onChange={uploadFileHandler}
                    className="hidden" 
                 />
              </label>
            </div>

            {/* Brand & Category */}
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1">Brand</label>
                  <input
                    type='text'
                    placeholder='e.g., Mr. Mew'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-5 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-600"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1">Category</label>
                  <input
                    type='text'
                    placeholder='e.g., Toys'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-600"
                  />
               </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-gray-400 font-bold text-sm uppercase tracking-wider ml-1">Description</label>
              <textarea
                placeholder='Describe the tribute...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-5 py-3 bg-[#0f0716] border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-gray-600 resize-none"
              ></textarea>
            </div>

            <button
              type='submit'
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 mt-4"
            >
              <FaSave size={18} /> Update Offering
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;