import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen  pb-16 px-6 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Have questions, feedback, or just want to connect? We're here to help.
          Whether you're looking to collaborate or need assistance with the ReWear platform,
          reach out to us below.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold">Our Email</h2>
            <p className="text-gray-600 text-sm">rewear.support@email.com</p>

            <h2 className="text-xl font-semibold">Phone</h2>
            <p className="text-gray-600 text-sm">+91 98765 43210</p>

            <h2 className="text-xl font-semibold">Address</h2>
            <p className="text-gray-600 text-sm">
              2nd Floor, Impact Hub<br />
              New Delhi, India - 110001
            </p>
          </div>

          <form className="bg-gray-50 p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
