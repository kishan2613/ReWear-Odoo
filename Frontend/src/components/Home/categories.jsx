import React from 'react';

const categories = [
  { name: 'Electronics', image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/FEBRUARY/20/1icPFn5V_1c71a185856944aa9e4819294ab3ba73.jpg" },
  { name: 'Fashion', image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/FEBRUARY/20/1icPFn5V_1c71a185856944aa9e4819294ab3ba73.jpg" },
  { name: 'Home & Kitchen', image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/FEBRUARY/20/1icPFn5V_1c71a185856944aa9e4819294ab3ba73.jpg" },
  { name: 'Books', image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/FEBRUARY/20/1icPFn5V_1c71a185856944aa9e4819294ab3ba73.jpg" },
  { name: 'Beauty', image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/FEBRUARY/20/1icPFn5V_1c71a185856944aa9e4819294ab3ba73.jpg" },
  { name: 'Toys', image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/FEBRUARY/20/1icPFn5V_1c71a185856944aa9e4819294ab3ba73.jpg"},
];

export default function CategoriesSection() {
  return (
    <section className="bg-white py-10 px-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-6xl  mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 hover:bg-purple-100 text-center rounded-xl p-0  shadow-sm transition-all cursor-pointer"
          >
            <div className="text-4xl mb-3">
                <img
                src={category.image}
                alt="categories"
                className='h-40 w-full  rounded-t-xl'
                />
                </div>
            <div className="text-lg font-medium text-gray-700">{category.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
