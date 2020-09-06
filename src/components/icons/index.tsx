import React, { memo } from 'react';

export interface IIconProp {
    iconName: string,
    pathCount: number,
}
const loadIcon = (pathCount: number) => {
    const icon = [];
    for (let i = 1; i < pathCount; i++) {
        icon.push(<i key={`path${i}`} className={`path${i}`}></i>)
    }
    return icon;
}
export const RenderIcon = memo(({ iconName, pathCount }: IIconProp) => (
    <i className={iconName}>
        {loadIcon(pathCount)}
    </i>
))