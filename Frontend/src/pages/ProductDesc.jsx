import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ProductDescription() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [moreProducts, setMoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMoreProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/all`);
        const data = await res.json();
        const filtered = data.filter((item) => item._id !== id);
        setMoreProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
    fetchMoreProducts();
    setLoading(false);
  }, [id]);

  if (loading || !product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl border p-6">
        
        {/* Left Section - Images */}
        <div>
          <img
            src={product.heroImage}
            alt={product.productName}
            className="w-full h-[400px] object-cover rounded-lg mb-4"
          />
          <div className="grid grid-cols-3 gap-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Additional ${index}`}
                className="w-full h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {product.productName}
            </h1>
            <p className="text-sm text-gray-600 mb-1 font-medium">Category: {product.category}</p>
            <p className={`text-sm font-semibold mb-3 inline-block px-3 py-1 rounded-full ${
              product.status === "Available" ? "bg-green-100 text-green-700" :
              product.status === "In Negotiation" ? "bg-yellow-100 text-yellow-700" :
              "bg-red-100 text-red-700"
            }`}>
              {product.status}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              {product.description}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              Posted {formatDistanceToNow(new Date(product.createdAt))} ago
            </p>
            <p className="text-sm text-gray-600 font-medium">Location: {product.address}</p>
            <p className="text-sm text-gray-600 font-medium">Likes: {product.likes}</p>
            <p className="text-sm text-gray-600 font-medium mt-2">Owner: {product.user?.name} </p>
          </div>

          <button
            className="mt-6 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all font-medium"
          >
            Swap Now
          </button>
        </div>
      </div>

      {/* More Swap Options */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6">More Swap Options</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {moreProducts.map((prod) => (
            <div
              key={prod._id}
              className="bg-white rounded-xl shadow-md border p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={prod.heroImage}
                alt={prod.productName}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{prod.productName}</h3>
              <p className="text-sm text-gray-600">{prod.category}</p>
              <p className="text-xs text-gray-500 mt-1">{prod.address}</p>
              <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(prod.createdAt))} ago</p>
              <a href={`/products/${prod._id}`}>
                <button className="mt-3 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 text-sm font-medium">
                  View Product
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
