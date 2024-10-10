import React from 'react'

type Props = {}

const Contact = (props: Props) => {
  return ( 
    <div className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col h-[100vh] lg:h-[80vh] lg:flex-row">
          <div className="bg-white gap-y-10 relative shadow-sm lg:rounded-l-2xl flex flex-[.6] flex-col justify-between overflow-hidden p-8 lg:w-1/2">
          <div className='w-[150px] h-[150px] absolute -z-1 bottom-[-150px] right-[-150px] blur-[100px] bg-gray-800/25 rounded-full' />
          <div  className=''>
            <h1 className='font-bold text-[18px] pb-2 mb-8 border-b border-b-gray-200/75'>Contact us:</h1>
            
            <div className='flex flex-col mb-4'>
                <label htmlFor="name" className='mb-1'>Your Name:</label>
                <input
                className="bg-white px-4 py-2 outline-none text-white rounded-lg border transition-colors duration-100 border-solid focus:border-[#152f19] border-gray-200"
                name="name"
                type="text"
                id='name'
                />

            </div>
            <div className='flex flex-col mb-4'>
                <label htmlFor="email" className='mb-1'>Your E-mail Address:</label>
                <input
                className="bg-white px-4 py-2 outline-none text-white rounded-lg border transition-colors duration-100 border-solid focus:border-[#152f19] border-gray-200"
                name="email"
                type="email"
                id='email'
                />

            </div>
            <div className='flex flex-col'>
                <label htmlFor="message" className='mb-1'>Message:</label>
                <textarea
                className="bg-white px-4 py-2 outline-none resize-y max-h-[150px] min-h-[75px] text-white rounded-lg border transition-colors duration-100 border-solid focus:border-[#152f19] border-gray-200"
                id='message'
                name="message"
                />
            </div>
              <button className="bg-white h-fit py-2 px-4 w-fit mt-4 self-center lg:self-start rounded-md cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out border border-black/5  hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0 text-[#000] font-bold">
             Send 
            </button>
          </div>
          <div>
            <div>
                <p>
                  123 Main St, Anytown, Basra 
                </p>
                <p>
                  (+964) 771 7504 243
                </p>
                <p>
                  contact@example.com
                </p>
            </div>
          </div>
          </div>
          <div className="flex-[.4] h-full hidden lg:block">
            <div className="h-full lg:max-h-full overflow-hidden lg:rounded-r-2xl shadow-md transition duration-700 ease-in-out">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.shopify.com/s/files/1/1368/3463/files/shortstache_E2_84_A2_Cuts__20NY_May_Full-443_450x_crop_center@2x.progressive.jpg?v=1726606904"
                alt="About Us"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Contact