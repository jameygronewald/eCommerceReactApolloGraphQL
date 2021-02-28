import Link from 'next/link';
import { useUser } from './User.js';
import NavStyles from './styles/NavStyles';
import SignOut from './SignOut.js';
import { useCart } from '../lib/CartState.js';

export default function Nav() {
  const user = useUser();

  const { openCart } = useCart();

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user ? (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <button type='button' onClick={openCart}>
            My Cart
          </button>
          <SignOut />
        </>
      ) : (
        <>
          <Link href='/signin'>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
