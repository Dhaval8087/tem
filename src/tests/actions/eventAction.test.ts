import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';

import { events } from '../../../tools/mockData';
import { ACTION_EVENTS_FETCH_SUCCESS } from '../../actions/actionTypes';
import * as eventActions from '../../actions/eventaction';


describe("fetchEventsSuccess", () => {
    it("should fetch all the list of events action", () => {
        //arrange
        const expectedAction = {
            type: ACTION_EVENTS_FETCH_SUCCESS,
            events
        };
        
        //act
        const action = eventActions.dispatchFetchEventSuccess(events);

        //assert
        expect(action).toEqual(expectedAction);
    });
});