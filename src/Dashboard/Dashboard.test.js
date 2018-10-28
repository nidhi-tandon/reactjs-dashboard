import React from 'react';
import Dashboard from './Dashboard';

import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/**
 * Factory function to create a ShallowWrapper for the CashTransaction Component.
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
    const wrapper = shallow(<Dashboard {...props}/>);
    if ( state ) wrapper.setState(state);
    return wrapper;
};


/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {String} val - Value of data-test attribute to search.
 * @returns {ShallowWrapper}
 */

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

test('renders without crashing', () => {
    const wrapper = setup();
    const dashboardComponent = findByTestAttr(wrapper, 'component-dashboard');
    expect(dashboardComponent.length).toBe(1);
});

test('renders search button successfully', () => {
    const wrapper = setup();
    const searchButton = findByTestAttr(wrapper, 'search-button');
    expect(searchButton.length).toBe(1);
});

test('renders sort button successfully', () => {
    const wrapper = setup();
    const sortButton = findByTestAttr(wrapper, 'sort-button');
    expect(sortButton.length).toBe(1);
});



