const AboutUs = () => {
  return (
    <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="bg-white shadow-md rounded-2xl p-8 lg:w-1/2">
            <p className="font-semibold text-xl text-orange-400">
              How It Started
            </p>
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl my-4">
              Our Dream is Global Learning Transformation
            </h2>
            <p className="mt-8 text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
              expedita, odit molestiae perspiciatis ab sint iusto cum deleniti
              quae repudiandae architecto accusamus velit ut nisi, excepturi sed
              sapiente quibusdam. Unde? Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Quaerat expedita, odit molestiae perspiciatis ab
              sint iusto cum deleniti quae repudiandae architecto accusamus
              velit ut nisi, excepturi sed sapiente quibusdam. Unde?
            </p>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <div className="overflow-hidden rounded-xl bg-white shadow-md hover:scale-105 transition duration-700 ease-in-out">
              <img
                className="w-full h-64 object-cover"
                src="https://schoffa.com/cdn/shop/files/Schoffa12476.jpg?v=1716207338&width=1000"
                alt="About Us"
              />
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="bg-slate-100 p-4 rounded-xl hover:scale-105 transition duration-400 ease-in-out cursor-pointer shadow-lg "
                  >
                    <p className="text-3xl font-semibold">23</p>
                    <p className="mt-2">Project Manager</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
