import { ProductT } from '@/utils/types';
import { useComparisonStore } from '../store/index';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Comparison = () => {
  const { comparisonList, removeFromComparison } = useComparisonStore();


  return (
    <div className="container mx-auto px-4 pt-28">
      <h1 className="text-3xl font-bold mb-8">Product Comparison</h1>
      {comparisonList.length === 0 ? (
        <p className="text-gray-600">You haven't added any products to compare.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Feature</th>
                {comparisonList.map((product: ProductT) => (
                  <th key={product.id} className="border p-2">
                    <div className="flex justify-between items-center">
                      <span>{product.name}</span>
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-bold">Image</td>
                {comparisonList.map((product: ProductT) => (
                  <td key={product.id} className="border p-2">
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mx-auto" />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border p-2 font-bold">Price</td>
                {comparisonList.map((product: ProductT) => (
                  <td key={product.id} className="border p-2">${product.price.toFixed(2)}</td>
                ))}
              </tr>
              <tr>
                <td className="border p-2 font-bold">Description</td>
                {comparisonList.map((product: ProductT) => (
                  <td key={product.id} className="border p-2">{product.description}</td>
                ))}
              </tr>

              <tr>
                <td className="border p-2 font-bold">Action</td>
                {comparisonList.map((product: ProductT) => (
                  <td key={product.id} className="border p-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Comparison;
