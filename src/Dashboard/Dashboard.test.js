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



test('renders save button successfully', () => {
    // const wrapper = setup();
    // const saveButton = findByTestAttr(wrapper, 'save-button');
    // expect(saveButton.length).toBe(1);
});

test('merchant name starts as empty string', () => {
    // const wrapper = setup();
    // const initialState = wrapper.state('merchantName');
    // expect(initialState).toBe('');
});

test('clicking button sets merchant name', () => {
    // const merchantName = 'abc';
    // const wrapper = setup(null, { merchantName });
    //
    // // find button and click
    // const saveButton = findByTestAttr(wrapper, 'save-button');
    // saveButton.simulate('click');
    //
    // // find text field and display
    // const merchantNameTextField = findByTestAttr(wrapper, 'merchant-name-text-field');
    // expect(merchantNameTextField.text()).toContain(merchantName+'d');
});
