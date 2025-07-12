import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    heroImage: "",
    images: [""],
    address: "",
    user: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState(""); // For hero image preview

  const categories = [
    "Ethnic Wear", "Casual Wear", "Men's Activewear", "Women's Activewear",
    "Western Wear", "Footwear", "Sportswear", "Office Wear",
    "Men's Ethnic Wear", "Size Inclusive Styles"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userIDRewear");
      if (!userId) {
        setMessage("User not logged in. Please login first.");
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        user: userId
      };

      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Product listed successfully!");
        setTimeout(() => navigate("/products"), 2000);
      } else {
        setMessage(data.message || "Failed to list product");
      }
    } catch (err) {
      setMessage("Server Error: " + err.message);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        
        {/* LEFT: Image Preview */}
        <div className="md:w-1/2 flex flex-col items-center justify-center border border-gray-300 rounded-xl p-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="rounded-lg max-h-[400px] w-full object-contain shadow"
            />
          ) : (
            <div className="h-[300px] w-full flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
              Image Preview
            </div>
          )}
          <button
            type="button"
            onClick={() => setPreviewUrl(formData.heroImage)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            Preview Image
          </button>
        </div>

        {/* RIGHT: Form */}
        <div className="md:w-1/2">
          <h2
            className="text-3xl font-semibold text-gray-800 mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            List Your Product
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              placeholder="Product Name"
              className="w-full p-3 border rounded-lg"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Description"
              rows={4}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="heroImage"
              value={formData.heroImage}
              onChange={handleChange}
              required
              placeholder="Main Image URL"
              className="w-full p-3 border rounded-lg"
            />

            <div>
              <p className="font-medium text-gray-700 mb-2">Additional Image URLs</p>
              {formData.images.map((img, i) => (
                <input
                  key={i}
                  value={img}
                  onChange={(e) => handleImageChange(e, i)}
                  placeholder={`Image URL ${i + 1}`}
                  className="w-full mb-2 p-3 border rounded-lg"
                />
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add another image
              </button>
            </div>

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Your Address (City, State)"
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-900 transition"
            >
              {loading ? "Submitting..." : "List Product"}
            </button>

            {message && (
              <p className="text-center mt-2 text-sm font-medium text-green-600">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
