import '../events.scss';

import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actionCancelEvent, actionGetMyEvents, IActionMyEvents } from '../../../actions/eventaction';
import { EventCard } from '../../../components/eventcard';
import { EventModel } from '../../../models/eventmodel';
import { getEventDateHeader, getEventsGroupByDate } from '../../../utils';



interface EventCollection {
    myEvents: EventModel[]
}
interface MyEventViewProps extends EventCollection {
    actionGetMyEvents: () => () => void,
    actionCancelEvent: (eventid: number) => () => void
}

interface EventViewState {
    eventsReducer: EventCollection
}


const MyEvents: FC<MyEventViewProps> = ({ ...rest }) => {
    /* eslint-disable */
    useEffect(() => {
        //TODO: we can store the user settings in to DB and give good user experience. 
        rest.actionGetMyEvents();
    }, [])
    const events = getEventsGroupByDate(rest.myEvents);
    const cancelEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id = (event.currentTarget as HTMLInputElement).id;
        rest.actionCancelEvent(+id);
    }
    const renderEvents = () => {
        return Object.keys(events).map((item: any) => {
            const eventsData = events[item] as EventModel[];
            return (
                <div key={item} className="col-md-12 event__card">
                    <span className="event__date">{getEventDateHeader(new Date(item))}</span>
                    {
                        eventsData.map(event => <EventCard key={`${event.id}${event.startDate}`} event={event} eventSubscriptionHandler={cancelEvent} subscriptionText='Cancel' eventType="MY" />)
                    }
                </div>
            )
        }
        )
    }
    return (
        <div className="event-container">
            <div className="right-half pb-2">
                {Object.keys(events).length > 0 ? renderEvents() : <h2>you have not signup any event</h2>}
            </div>
        </div>
    )
}

const mapStateToProps = (state: EventViewState) => {
    const props = {
        myEvents: state.eventsReducer.myEvents
    }
    return props as Pick<MyEventViewProps, keyof typeof props>
}
const mapDispatchToProps = (dispatch: Dispatch<IActionMyEvents>) => {
    const props = {
        actionGetMyEvents: bindActionCreators(actionGetMyEvents, dispatch),
        actionCancelEvent: bindActionCreators(actionCancelEvent, dispatch)
    }
    return props as Pick<MyEventViewProps, keyof typeof props>
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);


