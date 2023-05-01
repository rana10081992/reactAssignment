import Home from '../components/home/Home';
import ProductDetails from '../components/prodcut-details/ProductDetails';
import UserDetails from '../components/user-details/UserDetails';

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/userDetails',
    component: UserDetails
  },
  {
    path: '/products',
    component: ProductDetails
  },
  {
    path: '/',
    component: Home
  }
];

export default routes;
