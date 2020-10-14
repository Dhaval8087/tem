import { mount } from 'enzyme';
import React from 'react';

import { events } from '../../../../../tools/mockData';
import { AllEvents, EventViewProps } from '../../../../features/events/allevents';
import { EventModel } from '../../../../models';

function renderAllEvents(args?: {}) {
    const defaultProps: EventViewProps = {
        actionFetchEvents: () => () => jest.fn(),
        actionStoreMyEvents: (events: EventModel[], selectedEventId: number) => () => jest.fn(),
        events,
        eventfilters: {
            name: '',
            city: '',
            isFree: false,
            isMorning: false,
            isAfternoon: false,
            isEvening: false,
            isNight: false
        }
    };
    const props = { ...defaultProps, ...args }
    return mount(<AllEvents {...props} />);
}
it('should open the popup when attempting to click on signup button',()=>{
    const wrapper = renderAllEvents();
    wrapper.find('button').first().simulate('click');
    const popup = wrapper.find('.modal').first();
    expect(popup).toBeTruthy();
   
})
