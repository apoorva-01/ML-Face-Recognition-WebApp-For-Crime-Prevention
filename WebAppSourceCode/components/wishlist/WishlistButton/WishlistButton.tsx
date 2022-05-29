import React, { FC, useState,useContext } from 'react'
import cn from 'classnames'
import { useUI } from '@components/ui'
import { Heart } from '@components/icons'
import useAddItem from '@framework/wishlist/use-add-item'
import useCustomer from '@framework/customer/use-customer'
import useWishlist from '@framework/wishlist/use-wishlist'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import s from './WishlistButton.module.css'
import type { Product, ProductVariant } from '@commerce/types/product'
import { DataStore } from '../../../utils/DataStore';
import axios from 'axios'
type Props = {
  productId: Product['id']
  variant: ProductVariant
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  const { state, dispatch } = useContext(DataStore);
  const {customerInfo,} = state;

  const addToWishlist = async () => {
      // const existItem = state.cart.cartItems.find((x:any) => x._id === product._id);
      // const quantity = existItem ? existItem.quantity + 1 : 1;
      // const { data } = await axios.get(`/api/products/${product._id}`);
      // if (data.countInStock < quantity) {
      //   window.alert('Sorry. Product is out of stock');
      //   return;
      // }
      // await dispatch({ type: 'WISHLIST_ADD_ITEM', payload: { ...product, quantity } });
      // setLoading(false)
  }



  const { data } = useWishlist()
  const removeItem = useRemoveItem()
  const { openModal, setModalView } = useUI()
  const [loading, setLoading] = useState(false)

  // @ts-ignore Wishlist is not always enabled
  const itemInWishlist = data?.items?.find(
    // @ts-ignore Wishlist is not always enabled
    (item) =>
      item.product_id === Number(productId) &&
      (item.variant_id as any) === Number(variant.id)
  )

  const handleWishlistChange = async (e: any) => {
    e.preventDefault()

    if (loading) return

    // A login is required before adding an item to the wishlist
    if (!customerInfo) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }

    setLoading(true)

    try {
      if (itemInWishlist) {
        await removeItem({ id: itemInWishlist.id! })
      } else {
        addToWishlist()
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      aria-label="Add to wishlist"
      className={cn(s.root, className)}
      onClick={handleWishlistChange}
      {...props}
    >
      <Heart
        className={cn(s.icon, {
          [s.loading]: loading,
          [s.inWishlist]: itemInWishlist,
        })}
      />
    </button>
  )
}

export default WishlistButton
