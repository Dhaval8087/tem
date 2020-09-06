import './badge.scss';

import React, { memo } from 'react';

export type IBadgeType = 'badge-success' | 'badge-info' | 'badge-warning' | 'badge-danger'
export interface IBadgeProp {
    text: string,
    isPill?: boolean,
    type: IBadgeType
}

export const Badge = memo(({ type, isPill = true, text }: IBadgeProp) => (
    <span className={`badge ${type} ${!isPill ? '' : 'badge-pill'}`}>{text}</span>
))