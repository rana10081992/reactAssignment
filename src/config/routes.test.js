import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import Home from '../components/home/Home';
import ProductDetails from '../components/prodcut-details/ProductDetails';
import UserDetails from '../components/user-details/UserDetails';
import routes from './routes';

describe('Routes', () => {
  it('should render a Route for Home component', () => {
    const wrapper = shallow(<Route path="/home" component={Home} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render a Route for UserDetails component', () => {
    const wrapper = shallow(<Route path="/userDetails" component={UserDetails} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render a Route for ProductDetails component', () => {
    const wrapper = shallow(<Route path="/products" component={ProductDetails} />);
    expect(wrapper.exists()).toBe(true);
  });
})
