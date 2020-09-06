import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { events } from '../../../tools/mockData';
import * as eventActions from '../../actions/eventaction';
import rootReducer from '../../reducers';

const intialState = {
    events: [],
    tempevents: [],
    myEvents: [],
    isLoading: false,
}
it("Should handle fetching events", async () => {
    // arrange
    const store = createStore(rootReducer, {}, applyMiddleware(thunk));
    const event = {
        "id": 0,
        "isFree": true,
        "name": "CSS Grids: fact or fiction",
        "city": 'Barcelona',
        "startDate": new Date("2019-07-14T02:00:00+00:00"),
        "endDate": new Date("2019-07-14T03:00:00+00:00")
    }

    // act
    const action = eventActions.dispatchFetchEventSuccess(events);

    store.dispatch(action);

    // assert
    const createdCourse = store.getState()?.eventsReducer?.events[0];
    expect(createdCourse).toEqual(event);
});
