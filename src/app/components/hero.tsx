
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GrDeliver } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { LuSprout } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from 'next/link';  // Import Link from Next.js
import { client, urlFor } from "../../sanity/lib/sanity";

// Define Product type
interface Product {
  name: string;
  id: string;
  price: string;
  description: string;
  image: any;  // Image type is any because it's fetched from Sanity
  slug: any;
}

const Hero = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`
        *[_type == "product"][0...20]{
          name,
          description,
          price,
          image,
          slug
        }
      `);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className='bg-slate-100 top-4 relative'>
        <Image src="/Container.jpg" alt='' width={1440} height={300} />
      </div>
      <div className='flex justify-center items-center font-semibold text-2xl py-7'>
        What makes our brand different
      </div>
      <div>
        <GrDeliver />
        <p className="font-semibold text-lg">Next day as standard</p>
        <p className="text-gray-600 w-[270px] h-[48px]">
          Order before 3pm and get your order the next day as standard.
        </p>
      </div>
      <div className='relative bottom-24 ml-72'>
        <FaRegCheckCircle />
        <p className="font-semibold text-lg">Made by true artisans</p>
        <p className="text-black w-[270px] h-[48px]">
          Handmade crafted goods made with real passion and craftsmanship
        </p>
      </div>
      <div className='relative bottom-44 ml-96 left-44'>
        <BiSolidPurchaseTag />
        <p className="font-semibold text-lg">Unbeatable price</p>
        <p className="text-black w-[270px] h-[48px]">
          For our materials and quality you won't find better prices anywhere.
        </p>
      </div>
      <div className='relative bottom-64 ml-96 left-96'>
        <LuSprout />
        <p className="font-semibold text-lg">Recycled packaging</p>
        <p className="text-black w-[270px] h-[48px]">
          We use 100% recycled packaging to ensure our footprint is manageable
        </p>
      </div>

      <div className='font-semibold text-black relative text-3xl bottom-32 ml-8'>
        New ceramics
      </div>




      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
  {products.map((product) => (
    <div key={product.slug.current} className="bg-white border  border-gray-200 p-4 rounded-lg shadow-lg">
      <Image
        src={urlFor(product.image)?.width(403).height(300).url() || "/fallback-image.jpg"}
        alt={product.name || 'Default Product'}
        width={403}
        height={300}
        className="object-cover rounded-md"
      />
      <div className="text-center mt-4">
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-red-500">${product.price}</p>
        <p className="text-sm text-blue-300">{product.description}</p>
      </div>
      <div className="mt-4 text-center">
        <Link href={`/product/${product.slug.current}`} passHref>
          <Button className="bg-slate-700 hover:bg-red-700 w-full text-white py-2 rounded-md transition duration-300">
            Wishlist
          </Button>
        </Link>
      </div>
    </div>
  ))}
</div>
</div>
           
)
}
export default Hero;
