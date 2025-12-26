import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to destroy this offering?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted', { theme: "dark" });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create a new blank product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Sample product created', { theme: "dark" });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
        <button
          onClick={createProductHandler}
          className="flex items-center gap-2 bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors shadow-lg"
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
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-100">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-purple-950 text-amber-400 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Brand</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{product._id}</td>
                  <td className="py-3 px-6 text-left font-bold text-gray-800">{product.name}</td>
                  <td className="py-3 px-6 text-left">${product.price}</td>
                  <td className="py-3 px-6 text-left">{product.category}</td>
                  <td className="py-3 px-6 text-left">{product.brand}</td>
                  <td className="py-3 px-6 text-center flex justify-center gap-4">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform"
                    >
                      <FaTrash size={18} />
                    </button>
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

export default ProductListPage;