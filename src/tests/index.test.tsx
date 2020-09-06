import { shallow } from 'enzyme';
import React from 'react';

import App from '../App';

test('renders the component', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
});