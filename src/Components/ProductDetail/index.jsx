import { useContext } from 'react'
import { ShoppingEcommerceContext } from '../../Context'
import "./styles.css";
import { XMarkIcon } from '@heroicons/react/24/solid'

const ProductDetail = () => {
  const context = useContext (ShoppingEcommerceContext)

  return (
    <aside className={`${context.showProductDetail ? 'flex' : 'hidden'}
    product-detail flex-col fixed right-0 border overflow-y-scroll border-black rounded-lg bg-white`}>
      <div className="flex justify-between mb-5 bg-slate-600 text-white items-center p-3">
        <h2 className="font-medium text-xl">Detail</h2>
        <div>
          <XMarkIcon className="size-7 cursor-pointer text-white" onClick={() => context.closeProductDetail()} />
        </div>
      </div>
      <figure className='px-5'>
        <img className='w-full h-full rounded-lg' src={context.productToShow.image} alt={context.productToShow.title} />
      </figure>
      <p className='flex flex-col p-5'>
        <span className='font-bold text-2xl mb-3'>${context.productToShow.price}</span>
        <span className='font-medium text-xl'>{context.productToShow.title}</span>
        <span className='font-light text-sm'>{context.productToShow.description}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
