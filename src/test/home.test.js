import Home from '../home/home';
import { shallow } from 'enzyme';
import React from 'react';
import Adapter from '../jest-config';

it("should render initial layout", () => {
    const component = shallow(<Home />);
    expect(component.getElements()).toMatchSnapshot();
});