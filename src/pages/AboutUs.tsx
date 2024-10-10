import React from 'react'

const AboutUs = () => {
  return (
    <div className=' bg-slate-50'>




    <div className="   flex     gap-12     h-[100vh]  mx-48  ">
     


     <div className=' h-[550px] mt-16  px-8 pt-9 rounded-2xl bg-white shadow-md w-[500px]   '>
<p className=' font-semibold text-xl text-orange-400'>How It Started</p>
<p className=' font-bold text-5xl  my-4 '>
Our Dream is Goldal Learning Transformation 
  </p>
  <p className=' mt-16  '>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat expedita, odit molestiae perspiciatis ab sint iusto cum deleniti quae repudiandae architecto accusamus velit ut nisi, excepturi sed sapiente quibusdam. Unde?
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat expedita, odit molestiae perspiciatis ab sint iusto cum deleniti quae repudiandae architecto accusamus velit ut nisi, excepturi sed sapiente quibusdam. Unde?</p>
     </div>

<div className=' flex flex-col mt-[47px]'>

    {/* object-cover hover:scale-[1.11] duration-[.9s] transition ease-in-out */}
     <div className='   overflow-hidden rounded-xl bg-white shadow-md mb-4 mt-5 hover:scale-[1.05] duration-[.7s] transition ease-in-out w-[570px]  h-[240px] '>
      
      <img className='' src='https://schoffa.com/cdn/shop/files/Schoffa12476.jpg?v=1716207338&width=1000'/>

     </div>

<div className='   rounded-xl bg-white shadow-md    gap-6 flex   flex-wrap  justify-center pt-5  w-[570px]  h-[290px] '>
{[1,2,3,4].map(()=>{
  return(
    <div className=' bg-slate-100 pl-5 h-24 w-56 rounded-xl  hover:scale-[1.05] duration-[.4s] transition ease-in-out  hover:cursor-pointer shadow-lg'>
<p className=' text-3xl font-semibold pt-3'>23</p>
<p className='   py-2 w-32 '>project menger</p>
    </div>
  )
})} 


</div>
</div>


    </div>

    </div>
    )
}

export default AboutUs