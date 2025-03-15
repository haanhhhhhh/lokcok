'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/lib/models/ProductModel';

import { Rating } from './Rating';

const ProductItemClient = ({ product }: { product: Product }) => {
  return (
    <div className='card mb-4 bg-base-300'>
      <figure>
        <Link
          href={`/product/${product.slug}`}
          className='relative aspect-square h-full w-full'
        >
          <Image
            src={product.image}
            alt={product.name}
            width={350}
            height={350}
            className='h-full w-full object-cover'
          />
        </Link>
      </figure>
      <div className='card-body'>
        <Link href={`/product/${product.slug}`}>
          <h3 className='card-title line-clamp-1 font-normal'>
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} caption={`(${product.name})`} isCard />
        <p className='line-clamp-1'>{product.brand}</p>
        <div className='card-actions flex items-center justify-between'>
          <span className='text-2xl'>${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItemClient; 