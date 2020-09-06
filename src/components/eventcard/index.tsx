import './eventcard.scss';

import React, { FC } from 'react';

import { EventModel, EventType } from '../../models';
import { eventDuration, formatDate, getOneCookie } from '../../utils';
import { Badge } from '../badge';
import { RenderIcon } from '../icons';

export interface IProps {
    event: EventModel,
    eventSubscriptionHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    subscriptionText: string,
    eventType: EventType
}

export const EventCard: FC<IProps> = ({ event, eventSubscriptionHandler, subscriptionText, eventType }) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const selectedEvents = (getOneCookie('selectedevents') as unknown) as Array<EventModel | undefined>;
    let isSignup = true;

    if (eventType === 'ALL' && selectedEvents && selectedEvents.find(p => p?.id === event.id)) {
        isSignup = false;
    }
    return (
        <div className="card">
            <div className="card-block">
                <div className="row m-2">
                    <div className="col-md-10 inline-box">
                        {event.isFree && <Badge type="badge-success" text="FREE"  />}
                        <h6 className="ml-3 font-weight-bold">{event.name}</h6>
                    </div>
                    <div className="col-4 col-md-2 btn-signup">
                        {isSignup ? <button type="button" className="btn btn-outline-secondary" id={event.id.toString()} onClick={eventSubscriptionHandler}><b>{subscriptionText}</b></button> : null}
                    </div>
                </div>
                <div className="row m-2">
                    <div className="col-md-4 inline-box">
                        <i className="icon-world"></i>
                        <span className="text-muted city">{event.city}</span>
                    </div>
                    <div className="col-md-4 inline-box">
                        <RenderIcon pathCount={8} iconName="icon-hourglass" />
                        <span className="text-muted">{`${eventDuration(startDate, endDate)}`}'</span>
                    </div>
                    <div className="col-md-4 text-right ">
                        <div className="inline-box">
                            <RenderIcon pathCount={22} iconName="icon-clock" />
                            <span className="text-muted">{` from ${formatDate(startDate)} to ${formatDate(endDate)}`}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

