import { ref } from '@vue/composition-api'

export default function useCart() {
  const cart = ref(JSON.parse(localStorage.getItem('cart')))

  const listCart = () => {
    cart.value = JSON.parse(localStorage.getItem('cart'))
  }

  const addCart = (book) => {
    listCart()
    let list = cart.value || []
    list.push({ id: book.id, title: book.title })
    localStorage.setItem('cart', JSON.stringify(list))
  }

  const cleanCart = () => {
    localStorage.removeItem('cart')
  }

  return { cart, listCart, addCart, cleanCart }
}
