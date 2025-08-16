import React from 'react';

const ProblemSection: React.FC = () => {
  return (
    <>
      <div className="">
        <section className="bg-gradient-to-r from-purple-800 to-blue-800 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white sm:text-5xl tracking-tight">
                The Challenges of Founding a Company
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-blue-100 mx-auto leading-relaxed">
                Founding a company is an exhilarating yet often isolating journey. 
                Founders face unique challenges, from fundraising and 
                product development to team building and scaling. 
                Traditional networking events often lack depth and fail to 
                foster genuine connections. <span className="font-bold text-3xl py-8">Founders Circle addresses this gap.</span>
              </p>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Accelerate Growth", description: "Gain valuable insights and accelerate your path to success.", image: "/image/accelerate.png" },
                { title: "Build Meaningful Connections", description: "Forge authentic relationships with like-minded individuals.", image: "/image/connect.png" },
                { title: "Unlock New Opportunities", description: "Access potential investors and advisors through our network.", image: "/image/opportunity.png" },
                { title: "Find Support and Inspiration", description: "Navigate entrepreneurship with a dedicated community.", image: "/image/support.png" }
              ].map((item, index) => (
                <div key={index} className="rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <img className="h-48 w-full object-cover" src={item.image} alt={item.title} />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-6">
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProblemSection;
