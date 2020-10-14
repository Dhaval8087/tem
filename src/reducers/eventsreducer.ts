import { ACTION_EVENTS_FETCH_SUCCESS, ACTION_EVENTS_FILTER, ACTION_EVENTS_MY_EVENTS } from '../actions/actionTypes';

import type { EventFilter, EventModel } from '../models';
export interface eventState {
    events: EventModel[];
    tempevents: EventModel[];
    isLoading?: boolean;
    errorMessage?: string,
    myEvents: EventModel[]
}
export const getInitialState = () => ({
    events: [],
    tempevents: [],
    myEvents: [],
    isLoading: false,
});

const eventsReducer = (state: eventState = getInitialState(), action: any) => {
    switch (action.type) {
        case ACTION_EVENTS_FETCH_SUCCESS:
            return { ...state, events: action.events, tempevents: action.events }
        case ACTION_EVENTS_FILTER:
            if (action.eventtype === 'ALL') {
                return { ...state, events: filterEvent([...state.tempevents], action.eventfilters) }
            } else if (action.eventtype === 'MY') {
                return { ...state, myEvents: filterEvent([...state.tempevents], action.eventfilters) }
            }
            break;
        case ACTION_EVENTS_MY_EVENTS:
            return { ...state, tempevents: action.myEvents, myEvents: action.myEvents }
        default:
            return state;
    }
}
function filterEvent(events: EventModel[], filters: EventFilter) {
    if (filters) {
        if (filters.isFree) {
            events = events.filter(p => p.isFree);
        }
        if (filters.name !== '') {
            events = events.filter(p => p.name.toLowerCase().indexOf(filters.name.toLowerCase()) > -1);
        }

        if (filters.city !== '') {
            events = events.filter(p => p.city.toLowerCase().indexOf(filters.city.toLowerCase()) > -1);
        }
        if (filters.isMorning) {
            events = events.filter(p => (getHours(p.startDate) > 6 && getHours(p.startDate) < 12) && (getHours(p.endDate) > 6 && getHours(p.endDate) < 12));
        }
        if (filters.isAfternoon) {
            events = events.filter(p => (getHours(p.startDate) > 12 && getHours(p.startDate) < 17) && (getHours(p.endDate) > 12 && getHours(p.endDate) < 17));
        }
        if (filters.isEvening) {
            events = events.filter(p => (getHours(p.startDate) > 17 && getHours(p.startDate) < 21) && (getHours(p.endDate) > 17 && getHours(p.endDate) < 21));
        }
        if (filters.isNight) {
            events = events.filter(p => (getHours(p.startDate) > 21 || getHours(p.startDate) < 6) && (getHours(p.endDate) > 21 || getHours(p.endDate) < 6));
        }
    }

    return events;
}
function getHours(date: Date) {
    return new Date(date).getHours();
}

export default eventsReducer;