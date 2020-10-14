import { shallow } from 'enzyme';
import React from 'react';

import { EventCard, IProps } from '../../../components/eventcard';

function renderAllEvents(args?: {}) {
    const defaultProps: IProps = {
        event: {
            id: 1,
            isFree: true,
            name: 'CSS Grid',
            city: 'London',
            startDate: new Date(),
            endDate: new Date()
        },
        eventSubscriptionHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { },
        subscriptionText: 'Sign Up',
        eventType: 'ALL'
    };
    const props = { ...defaultProps, ...args }
    return shallow(<EventCard {...props} />);
}

it("Should render event name", () => {
    const wrapper = renderAllEvents();
    const eventName = wrapper.find("h6").first();
    expect(eventName.text()).toBe('CSS Grid');
})
it("Should render sign up button", () => {
    const wrapper = renderAllEvents();
    const signupButton = wrapper.find("button").first();
    expect(signupButton.text()).toBe('Sign Up');
})
it("Should render city to be 'Amsterdam' ", () => {
    const wrapper = renderAllEvents({ event: { id: 1, city: 'Amsterdam' } });
    const cityText = wrapper.find(".city").first();
    expect(cityText.text()).toBe('Amsterdam');
})