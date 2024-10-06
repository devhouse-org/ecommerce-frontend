import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { Settings2 } from 'lucide-react'
import React from 'react'

type Props = {}

const Products = (props: Props) => {
  return (
    <>
      <div className='font-bold text-5xl text-center mt-8'>Man Clothing collection</div>
      <div className='text-center mt-4 text-sm text-gray-500'>
        Find everything you need to look and feel your best, and shop the latest mens fashion and lifestyle products
      </div>

      {/* category */}
      <div className='flex justify-center gap-x-2 mt-10 overflow-x-auto whitespace-nowrap px-4 scrollbar-none'>
        <a href="#" className="text-sm rounded-full px-5 py-2 text-white border-2 border-white bg-black">Tshirt</a>
        <a href="#" className="text-sm rounded-full px-5 py-2 text-black border-2 border-black">Jacket</a>
        <a href="#" className='text-sm rounded-full px-5 py-2 text-black border-2 border-black'>Pants</a>
        <a href="#" className='text-sm rounded-full px-5 py-2 text-black border-2 border-black'>Hoodie</a>
        <a href="#" className='text-sm rounded-full px-5 py-2 text-black border-2 border-black'>Short</a>
        <a href="#" className='text-sm rounded-full px-5 py-2 text-black border-2 border-black'>Pants</a>
        <a href="#" className='border-2 rounded-full px-2 border-black'><Settings2 className='mt-1' /></a>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mx-auto mt-10 gap-4 p-10 md:p-0">
        <div className="bg-white rounded-lg w-full">
          <a href="#">
            <img className="rounded-lg w-full" src="https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg" alt="" />
          </a>
          <div className="py-5">
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">PY Tshirt</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Classic t-shirt for daily use.</p>
            <div className="font-bold text-lg">
              99$
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg w-full">
          <a href="#">
            <img className="rounded-lg w-full" src="https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg" alt="" />
          </a>
          <div className="py-5">
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">PY Tshirt</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Classic t-shirt for daily use.</p>
            <div className="font-bold text-lg">
              99$
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg w-full">
          <a href="#">
            <img className="rounded-lg w-full" src="https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg" alt="" />
          </a>
          <div className="py-5">
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">PY Tshirt</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Classic t-shirt for daily use.</p>
            <div className="font-bold text-lg">
              99$
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg w-full">
          <a href="#">
            <img className="rounded-lg w-full" src="https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg" alt="" />
          </a>
          <div className="py-5">
            <a href="#">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">PY Tshirt</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Classic t-shirt for daily use.</p>
            <div className="font-bold text-lg">
              99$
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Products;