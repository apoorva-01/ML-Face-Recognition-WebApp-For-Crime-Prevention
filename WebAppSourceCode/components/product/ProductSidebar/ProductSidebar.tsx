import s from './ProductSidebar.module.css'
import { DataStore } from '../../../utils/DataStore';
import axios from 'axios'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState, useContext } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import AttachFileIcon from '@mui/icons-material/AttachFile';
interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }:{ product:any, className?:any}) => {
  const { state, dispatch } = useContext(DataStore);
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})


  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)




  const addToCart = async () => {
    setLoading(true)
    try {
      const existItem = state.cart.cartItems.find((x:any) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      await dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity, options: [selectedOptions] } });
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <Text variant="pageHeading">{product.name}</Text>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
      </div>
      <div className="mt-6">
        <Collapse title="Details">
          {product.detailsHtml}
        </Collapse>
        {product.documents?.length > 0 ? (

          <Collapse title="Documents">
            <a  href={product.documents?.[0]}>
              <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                <div className="mr-5">
                  <AttachFileIcon />
                </div>
                <div className="text-sm text-center font-medium">
                  <span className="uppercase">Document</span>
                </div>
              </div>
            </a>

          </Collapse>
        ) : null}

      </div>
    </div>
  )
}

export default ProductSidebar
