import { Action, Dispatch } from 'redux';

import { API_URL } from '../config';
import { EventModel, MakeRequestParam, MakeResponseParam } from '../models';
import { getOneCookie, setCookie } from '../utils';
import { makeRequest } from '../utils/http-helper';
import {
    ACTION_EVENTS_FETCH,
    ACTION_EVENTS_FETCH_ERROR,
    ACTION_EVENTS_FETCH_SUCCESS,
    ACTION_EVENTS_MY_EVENTS,
} from './actionTypes';


export interface IActionEventFetch extends Action {
    type: 'EVENTS_FETCH'
}

export interface IActionEventFetchSuccess extends Action {
    type: 'EVENTS_FETCH_SUCCESS',
    events: EventModel[]
}

export interface IActionEventFetchError extends Action {
    type: 'EVENTS_FETCH_ERROR',
    errorMessage: string
}
export interface IActionMyEvents extends Action {
    type: 'ACTION_EVENTS_MY_EVENTS'
}


export type AppActions = IActionEventFetch | IActionEventFetchSuccess | IActionEventFetchError | IActionMyEvents;



export const dispatchFetchEventSuccess = (events: EventModel[]) => ({
    type: ACTION_EVENTS_FETCH_SUCCESS,
    events
});

export const dispatchMyEvents = (myEvents: EventModel[]) => ({
    type: ACTION_EVENTS_MY_EVENTS,
    myEvents
})
function dispatchFetchEventError(e: Error): IActionEventFetchError {
    return {
        type: ACTION_EVENTS_FETCH_ERROR,
        errorMessage: e.message
    };
}
export function beginApiCall() {
    return { type: ACTION_EVENTS_FETCH };
  }

export function actionFetchEvents() {
    return (dispatch: Dispatch) => {
        const request: MakeRequestParam = {
            url: API_URL,
            method: 'get',
        }
        
        makeRequest(request).then((res: MakeResponseParam) => {
            if (res.json) {
                return res.json();
            }
        }).then(data => {
            const events = (data as unknown as Record<string, unknown>).events as EventModel[];
            dispatch(dispatchFetchEventSuccess(events));
        }).catch(err => {
            dispatch(dispatchFetchEventError(err))
        })
    };
}
export function actionStoreMyEvents(events: EventModel[], selectedEventId: number) {
    return (dispatch: Dispatch) => {
        let selectedEvents = (getOneCookie('selectedevents') as unknown) as Array<EventModel | undefined>;
        if (!selectedEvents) {
            selectedEvents = [];
        }
        selectedEvents.push(events.find(p => p.id === selectedEventId));
        setCookie('selectedevents', selectedEvents);

    }
}
export function actionGetMyEvents() {
    return (dispatch: Dispatch) => {
        let selectedEvents = (getOneCookie('selectedevents') as unknown) as Array<EventModel>;
        if (selectedEvents) {
            dispatch(dispatchMyEvents(selectedEvents));
        }
    }
}
export function actionCancelEvent(id: number) {
    return (dispatch: Dispatch) => {
        const selectedEvents = (getOneCookie('selectedevents') as unknown) as Array<EventModel | undefined>;
        if (selectedEvents) {
            const latestEvents = selectedEvents.filter(p => p?.id !== id) as EventModel[];
            if (latestEvents) {
                setCookie('selectedevents', latestEvents);
                dispatch(dispatchMyEvents(latestEvents))
            }
        }

    }
}