import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { calculateTotal, getCartItems } from "./redux/features/cart/cartSlice";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((store) => store.modal)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems("testing"));
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    )
  }
  return (
    <>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </>
  );
}
export default App;
