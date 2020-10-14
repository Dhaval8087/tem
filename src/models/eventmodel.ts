
interface EventModel {
    id: number;
    isFree: boolean;
    name: string;
    city: string;
    startDate: Date;
    endDate: Date
}
type EventType = 'ALL' | 'MY'
export type { EventModel,EventType };
