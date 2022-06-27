import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { calculateTotal } from "./redux/features/cart/cartSlice";

function App() {
  const { cartItems } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((store) => store.modal)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  return (
    <>
      {isOpen && <Modal/>}
      <Navbar />
      <CartContainer />
    </>
  );
}
export default App;
