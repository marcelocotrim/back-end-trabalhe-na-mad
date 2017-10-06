import React from 'react';
import { shallow } from 'enzyme';
import App from './../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<App />);
});
