import '../events.scss';

import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actionFetchEvents, actionStoreMyEvents, IActionEventFetch } from '../../../actions/eventaction';
import { EventCard } from '../../../components/eventcard';
import { Popup } from '../../../components/popup';
import { EventFilter } from '../../../models';
import { getEventDateHeader, getEventsGroupByDate } from '../../../utils';

import type { EventModel } from '../../../models/eventmodel';
interface EventCollection {
    events: EventModel[],
    eventfilters: EventFilter
}
export interface EventViewProps extends EventCollection {
    actionFetchEvents: () => () => void,
    actionStoreMyEvents: (events: EventModel[], selectedEventId: number) => () => void,
    errorMessage?: string
}

export interface EventViewState {
    eventsReducer: EventCollection,
    eventFilterReducer: EventFilter
}

//name export for the unit test cases 
export const AllEvents: FC<EventViewProps> = ({ ...rest }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const [signupEventName, setSignupEventName] = useState<string | undefined>('');
    const [selectedEventId, setSelectedEventId] = useState('');

    const events = getEventsGroupByDate(rest.events);
    /* eslint-disable */
    useEffect(() => {
        //TODO : we can implement the Lazy loading using the pagination and offset.
        rest.actionFetchEvents();
    }, [])

    const singUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = (event.currentTarget as HTMLInputElement).id;
        setSelectedEventId(id)
        setSignupEventName(rest.events.find(p => p.id === +id)?.name)
        setShowPopUp(true);
    }
    const onSingupEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        rest.actionStoreMyEvents(rest.events, +selectedEventId);
        setShowPopUp(false);
    }
    const onCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setShowPopUp(false);
    }
    return (
        <div className="event-container">

            <div className="right-half pb-2">
                {
                    Object.keys(events).map(item => {
                        const eventsData = events[item] as EventModel[];
                        return (
                            <div key={item} className="col-md-12 event__card">
                                <span className="event__date">{getEventDateHeader(new Date(item))}</span>
                                {
                                    eventsData.map(event => <EventCard key={`${event.id}${event.startDate}`} event={event} eventSubscriptionHandler={singUp} subscriptionText='Sign up' eventType="ALL" />)
                                }
                            </div>
                        )
                    }
                    )
                }
            </div>
            <Popup show={showPopUp}
                title='Event Sign Up'
                primaryText='SignUp'
                secondaryText='Cancel'
                body={(
                    <>
                        <h4>Are you sure you want to attend the event :  <span className="eventName">{signupEventName}</span></h4>
                    </>)}
                onPrimaryHandler={onSingupEvent} onSecondaryHandler={onCancel} />
        </div>
    )
}

const mapStateToProps = (state: EventViewState) => {
    const props = {
        events: state.eventsReducer.events,
        eventfilters: state.eventFilterReducer
    }
    return props as Pick<EventViewProps, keyof typeof props>
}
const mapDispatchToProps = (dispatch: Dispatch<IActionEventFetch>) => {
    const props = {
        actionFetchEvents: bindActionCreators(actionFetchEvents, dispatch),
        actionStoreMyEvents: bindActionCreators(actionStoreMyEvents, dispatch)
    }
    return props as Pick<EventViewProps, keyof typeof props>
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents);


