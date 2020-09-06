import eventReducer from "../../reducers/eventsreducer";
import * as actions from "../../actions/eventaction";
import { events } from "../../../tools/mockData";

it("should fetch events when passed mockevents", () => {
    // arrange
    const initialState = {
        events: [],
        tempevents: [],
        myEvents: [],
        isLoading: false,
    }

    const action = actions.dispatchFetchEventSuccess(events);

    // act
    const newState = eventReducer(initialState, action);

    // assert
    expect(newState?.events.length).toEqual(4);
});

