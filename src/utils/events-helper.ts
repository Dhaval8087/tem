import { EventModel } from '../models';
import { groupBy } from './common-helper';

const getEventsGroupByDate = (events: EventModel[]) => {
    const result = groupBy(events, (c: EventModel) => c.startDate);
    return result;
}
export { getEventsGroupByDate }