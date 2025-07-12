import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SwapPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userIDRewear");

  const [mode, setMode] = useState("Swap");
  const [swapImage, setSwapImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [coinDisabledNote, setCoinDisabledNote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      product: productId,
      requestedBy: userId,
      mode,
      ...(mode === "Swap" && { swapImage })
    };

    try {
      const res = await fetch("http://localhost:5000/api/swaps/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Swap request successfully created! 🎉");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(data.message || "Failed to create request.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (e) => {
    const selected = e.target.value;
    if (selected === "Coins") {
      setCoinDisabledNote(true);
      setTimeout(() => setCoinDisabledNote(false), 2500);
      return;
    }
    setMode(selected);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h1
          className="text-4xl font-light text-center text-black mb-4 tracking-wide"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Let's Make a Swap!
        </h1>
        <p className="text-center text-gray-600 text-lg mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          Your pre-loved treasure could be someone else's perfect find.
          We believe every outfit deserves a second spotlight 🌟
        </p>

        {/* Witty Marketing Text */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl mb-6">
          <p className="text-gray-700 font-medium text-sm md:text-base">
            Swapping is not just sustainable — it's sensational! 🤝 Whether you're up for trading your style or earning coins, you're part of a movement that values stories behind clothes, not just the tags. 💛
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Mode</label>
            <select
              value={mode}
              onChange={handleModeChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Swap">Swap</option>
              <option value="Coins" disabled>Coins</option>
            </select>
            {coinDisabledNote && (
              <p className="mt-2 text-sm text-red-500 font-medium">
                Sorry, we're working on it 🛠️
              </p>
            )}
          </div>

          {mode === "Swap" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image of the Product You Want to Offer
              </label>
              <input
                type="text"
                placeholder="Paste image URL"
                value={swapImage}
                onChange={(e) => setSwapImage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium text-sm"
          >
            {loading ? "Sending Swap Request..." : "Swap Now"}
          </button>

          {message && (
            <p className="text-center text-sm font-semibold text-green-600 mt-4">
              {message}
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Made with ♻️ love for the fashion-forward and earth-conscious community.
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
