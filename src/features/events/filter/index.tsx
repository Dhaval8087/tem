import './filter.scss';

import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { actionFilterEvents, IActionFilterEventFetch } from '../../../actions/filteraction';
import { Badge } from '../../../components/badge';
import { EventFilter, EventType } from '../../../models';
import { getEventType } from '../../../utils/common-helper';

interface FilterEventViewProps {
    actionFilterEvents: (values: EventFilter, eventtype: EventType) => () => void,
}

const FiltersEvents: FC<FilterEventViewProps> = ({ ...rest }) => {
    const [values, setValues] = useState({
        name: '',
        city: '',
        isFree: false,
        isMorning: false,
        isAfternoon: false,
        isEvening: false,
        isNight: false
    });
    /* eslint-disable */
    useEffect(() => {
        //TODO: we can introduce the server side filter for better search which can search from the db.
        rest.actionFilterEvents(values, getEventType());
    }, [values])
    const handleChange = (prop: keyof EventFilter, value: string | boolean = '') => (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (prop === 'name' || prop === 'city') {
            setValues({ ...values, [prop]: event.currentTarget.value });
        } else {
            setValues({ ...values, [prop]: event.currentTarget.checked });
        }

    }
    return (
        <div>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control filter__text" placeholder="Name" value={values.name} onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control filter__text" placeholder="City" value={values.city} onChange={handleChange('city')} />
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" checked={values.isFree} onChange={handleChange('isFree')} />
                        <label className="form-check-label filter__check" >
                            Only <Badge text="FREE" type="badge-success" />
                        </label>
                    </div>
                </div>
                <div className="time__filter">
                    <div className="form-group remove__bottom__margin">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" checked={values.isMorning} onChange={handleChange('isMorning')} />
                            <label className="form-check-label filter__check" >
                                Morning
                    </label>
                        </div>
                    </div>
                    <div className="form-group remove__bottom__margin">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" checked={values.isAfternoon} onChange={handleChange('isAfternoon')} />
                            <label className="form-check-label filter__check" >
                                Afternoon
                    </label>
                        </div>
                    </div>
                    <div className="form-group remove__bottom__margin">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" checked={values.isEvening} onChange={handleChange('isEvening')} />
                            <label className="form-check-label filter__check" >
                                Evening
                    </label>
                        </div>
                    </div>
                    <div className="form-group remove__bottom__margin">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" checked={values.isNight} onChange={handleChange('isNight')} />
                            <label className="form-check-label filter__check" >
                                Night
                    </label>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<IActionFilterEventFetch>) => {
    const props = {
        actionFilterEvents: bindActionCreators(actionFilterEvents, dispatch)
    }
    return props as Pick<FilterEventViewProps, keyof typeof props>
}
export default connect(null, mapDispatchToProps)(FiltersEvents);
