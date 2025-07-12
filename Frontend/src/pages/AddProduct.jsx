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
    user: "" // You might want to populate this from your logged-in user's context
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    'Ethnic Wear', 'Casual Wear', "Men's Activewear", "Women's Activewear",
    'Western Wear', 'Footwear', 'Sportswear', 'Office Wear',
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
    // Get user ID from localStorage
    const userId = localStorage.getItem("userIDRewear");

    if (!userId) {
      setMessage("User not logged in. Please login first.");
      setLoading(false);
      return;
    }

    // Include the user ID in formData
    const payload = {
      ...formData,
      user: userId,
    };

    const res = await fetch("http://localhost:5000/api/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
   <div className="min-h-screen bg-gray-50 py-10 px-4">
  <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
    
    <h2 
      className="text-3xl font-light text-black mb-4 tracking-wide" 
      style={{ fontFamily: 'Playfair Display, serif' }}
    >
      List Your Product
    </h2>

    {/* Witty Notice */}
    <div className="bg-yellow-50 border-l-4  text-yellow-800 p-6 rounded-2xl shadow-sm mb-8">
      <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        Heads-Up, Fashion Lister! 
      </h3>
      <p className="text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
        We're currently in our <strong>early development phase</strong> (aka “let’s build this awesome thing together” mode)! 
        While we haven’t added direct cloud uploads yet, you can still list your products like a pro. <br /><br />
         Simply <strong>upload your images to your Google Drive</strong> (or any image hosting service) and paste the link here in the 
        <em> Hero Image</em> and <em> Other Images</em> fields.  
        <br /><br />
        We're working round the clock to bring you maximum features and frictionless fashion listing. Thanks for being an early part of the journey! 
      </p>
    </div>

    {/* Form Starts */}
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input name="productName" value={formData.productName} onChange={handleChange} required placeholder="Product Name" className="w-full p-3 border rounded-xl" />

      <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-3 border rounded-xl">
        <option value="">Select Category</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Description" rows={4} className="w-full p-3 border rounded-xl" />

      <input name="heroImage" value={formData.heroImage} onChange={handleChange} required placeholder="Main Image URL" className="w-full p-3 border rounded-xl" />

      <div>
        <p className="font-medium text-gray-700 mb-2">Additional Image URLs</p>
        {formData.images.map((img, i) => (
          <input key={i} value={img} onChange={(e) => handleImageChange(e, i)} placeholder={`Image URL ${i + 1}`} className="w-full mb-2 p-3 border rounded-xl" />
        ))}
        <button type="button" onClick={addImageField} className="text-sm text-blue-600 hover:underline">+ Add another image</button>
      </div>

      <input name="address" value={formData.address} onChange={handleChange} required placeholder="Your Address (City, State)" className="w-full p-3 border rounded-xl" />

      <button type="submit" disabled={loading} className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all">
        {loading ? "Submitting..." : "List Product"}
      </button>

      {message && <p className="text-center mt-4 text-sm font-medium text-green-600">{"Successfully Added your Product"}</p>}
    </form>
  </div>
</div>

  );
};

export default AddProductForm;
