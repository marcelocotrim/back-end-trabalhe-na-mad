import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.mount = mount;
global.render = render;
global.shallow = shallow;
// Fail tests on any warning
console.error = ((message) => {
  throw new Error(message);
});
