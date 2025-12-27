import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaImage, FaCloudUploadAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCreateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/shared/Loader';

const ProductCreatePage = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formDataObj = new FormData();
    formDataObj.append('image', file);
    try {
      const res = await uploadProductImage(formDataObj).unwrap();
      toast.success(res.message || 'Image uploaded');
      setFormData((prev) => ({ ...prev, image: res.image }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // NOTE: Ensure your productsApiSlice createProduct mutation accepts 'data' argument!
      await createProduct(formData).unwrap();
      toast.success('Product created successfully');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/admin/productlist" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <FaArrowLeft /> Back to Inventory
        </Link>
        <h1 className="text-3xl font-black text-white">Forge New Tribute</h1>
      </div>

      {/* Form Container */}
      <div className="bg-[#1a1025] p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -z-10"></div>

        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#0f0716] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. Laser Pointer 9000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Brand</label>
              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full bg-[#0f0716] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. Overlord Inc."
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Price ($)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-[#0f0716] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Stock</label>
              <input
                type="number"
                name="countInStock"
                required
                min="0"
                value={formData.countInStock}
                onChange={handleInputChange}
                className="w-full bg-[#0f0716] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#0f0716] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. Toys"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaImage /> Product Image
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="image"
                required
                value={formData.image}
                onChange={handleInputChange}
                className="w-full bg-[#0f0716] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-mono"
                placeholder="Image URL"
              />
              <input
                type="file"
                id="image-file-upload"
                onChange={uploadFileHandler}
                className="hidden" 
                accept="image/*"
              />
              <label 
                htmlFor="image-file-upload"
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 font-bold cursor-pointer hover:bg-white/10 hover:text-amber-400 transition-colors whitespace-nowrap ${loadingUpload ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loadingUpload ? (
                    <span className="animate-spin h-4 w-4 border-2 border-amber-500 rounded-full border-t-transparent"></span>
                ) : (
                    <FaCloudUploadAlt size={18} />
                )}
                Upload
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
            <textarea
              name="description"
              required
              rows="5"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-[#0f0716] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
              placeholder="Describe this offering..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={loadingCreate}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-purple-950 font-black hover:to-amber-400 shadow-lg hover:shadow-amber-500/20 transition-all transform hover:-translate-y-1"
            >
               {loadingCreate ? <Loader className="w-4 h-4" /> : <><FaSave /> Create Product</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductCreatePage;