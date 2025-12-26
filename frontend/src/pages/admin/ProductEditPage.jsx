import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaUpload, FaSave } from 'react-icons/fa';
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
      setImage(res.image); // This updates the state, showing the thumbnail immediately
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link to='/admin/productlist' className='flex items-center gap-2 text-gray-600 hover:text-purple-700 mb-6 font-semibold'>
         <FaArrowLeft /> Back to Inventory
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Offering</h1>

        {loadingUpdate && <Loader />}
        {/* We removed loadingUpload from here to put it inside the image box */}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Product Name</label>
              <input
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Price ($)</label>
                <input
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Count In Stock</label>
                <input
                  type='number'
                  placeholder='Enter stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Image</label>
              
              <div className="flex gap-2 mb-2">
                 <input
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-500"
                  readOnly
                />
              </div>

              {/* NEW: Thumbnail & Loader Area */}
              <div className="my-4 flex justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 min-h-[160px] items-center">
                  {loadingUpload ? (
                      <div className="text-center">
                          <Loader />
                          <p className="text-sm text-purple-600 mt-2 font-semibold">Uploading to Cloud...</p>
                      </div>
                  ) : image ? (
                      <img 
                        src={image} 
                        alt="Product Preview" 
                        className="h-40 w-40 object-contain rounded-lg shadow-md bg-white p-2 border border-gray-100" 
                      />
                  ) : (
                      <p className="text-gray-400 text-sm">No image uploaded yet</p>
                  )}
              </div>

              <label className="flex items-center justify-center gap-2 cursor-pointer bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition-colors font-bold">
                 <FaUpload /> Upload Image
                 <input
                    type="file"
                    onChange={uploadFileHandler}
                    className="hidden" 
                 />
              </label>
            </div>

            {/* Brand & Category */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-gray-700 font-bold mb-2">Brand</label>
                  <input
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
               </div>
               <div>
                  <label className="block text-gray-700 font-bold mb-2">Category</label>
                  <input
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
               </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <button
              type='submit'
              className="w-full flex items-center justify-center gap-2 bg-purple-900 text-white font-bold py-3 rounded-xl hover:bg-purple-800 transition-all shadow-lg hover:shadow-purple-900/30"
            >
              <FaSave /> Update Offering
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;