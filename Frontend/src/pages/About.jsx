import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen  pb-16 px-6 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
          About ReWear
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          <span className="font-semibold text-gray-800">ReWear</span> is a community-powered clothing exchange platform built to promote
          sustainability and reduce textile waste. We believe in giving pre-loved clothes a second life — whether
          through direct swaps or a point-based system that makes circular fashion accessible for everyone.
        </p>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-600 text-sm">
              To empower individuals to participate in sustainable fashion by making it easy, affordable, and rewarding to
              exchange clothes rather than discard them.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">How It Works</h2>
            <p className="text-gray-600 text-sm">
              Users can upload unused clothing, browse items listed by others, and either swap directly or redeem items
              using earned points. Our admin team ensures every item is reviewed and approved for quality and relevance.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Why ReWear?</h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li>• Reduce environmental impact by extending the life of garments</li>
            <li>• Save money while refreshing your wardrobe</li>
            <li>• Build a community of mindful fashion contributors</li>
            <li>• Earn points for every contribution and swap</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
