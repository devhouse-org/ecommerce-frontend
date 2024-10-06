import React from 'react'
import { Button } from "@material-tailwind/react";
import { ShoppingBasketIcon, ShoppingCart } from 'lucide-react';
type Props = {}
 
const Home = ({}: Props) => {
  return (
    <div>
        <Button variant='text' className=''>
            <ShoppingCart />
        </Button>
    </div>
  )
}



export default Home