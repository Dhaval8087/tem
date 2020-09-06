import './layout.scss';

import React, { FC, ReactNode } from 'react';
import { withRouter } from 'react-router-dom';

import FiltersEvents from '../../features/events/filter';
import { Header } from '../header';

const Layout: FC = (props: Record<string, ReactNode>) => (
    <div>
        <Header />
        <div className="container-fluid">
            {window.location.pathname.indexOf('events') !== -1 && <div className="left-half">
                <FiltersEvents />
            </div>}
            {props.children}
        </div>
    </div>
)
export default withRouter(Layout)

