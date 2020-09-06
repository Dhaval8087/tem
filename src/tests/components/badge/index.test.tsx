import { shallow } from 'enzyme';
import React from 'react';

import { Badge, IBadgeProp } from '../../../components/badge';

function renderBadge() {
    const defaultProps: IBadgeProp = {
        text: 'Sign Up',
        isPill: true,
        type: 'badge-success'
    };
    return shallow(<Badge {...defaultProps} />);
}
it("render badge", () => {
    const wrapper = renderBadge();
    expect(wrapper).toMatchSnapshot();
})
it("renders badge component", () => {
    const wrapper = renderBadge();
    expect(wrapper.find("span").length).toBe(1);
});
it("Should render the badge with pill type", () => {
    const wrapper = renderBadge();
    const badgePill = wrapper.find(".badge-pill").first();
    expect(badgePill).toBeTruthy();
})
it("Should render the badge with pill type", () => {
    const wrapper = renderBadge();
    const badgeText = wrapper.find("span").first();
    expect(badgeText.text()).toBe('Sign Up');
})