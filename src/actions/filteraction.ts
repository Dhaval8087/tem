import { Action, Dispatch } from 'redux';

import { EventFilter, EventType } from '../models';
import { ACTION_EVENTS_FILTER } from './actionTypes';

export interface IActionFilterEventFetch extends Action {
    type: 'FILTER_EVENTS'
}
export interface IActionEventFilter extends Action {
    type: 'ACTION_EVENTS_FILTER',
    eventfilters: EventFilter
}
export const dispatchFilterEvent = (eventfilters: EventFilter, eventtype: EventType) => ({
    type: ACTION_EVENTS_FILTER,
    eventfilters,
    eventtype
});

export function actionFilterEvents(values: EventFilter, eventtype: EventType) {
    return (dispatch: Dispatch) => {
        dispatch(dispatchFilterEvent(values, eventtype))
    };
}