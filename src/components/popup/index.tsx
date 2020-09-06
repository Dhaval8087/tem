import React from 'react';

import { addPopUp, removePopup } from '../../utils/common-helper';

export interface IPopUpProp {
    title: string,
    body?: React.ReactNode,
    primaryText?: string,
    secondaryText?: string,
    onPrimaryHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    onSecondaryHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    show: boolean,
    id?: string
}

export const Popup = ({
    title,
    body,
    primaryText = 'Save',
    secondaryText = 'Cancel',
    onPrimaryHandler,
    onSecondaryHandler,
    show,
    ...rest
}: IPopUpProp) => {
    if (!show) {
        removePopup();
        return null;
    }
    addPopUp();
    return (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog" tabIndex={-1} >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" id={rest.id} onClick={onPrimaryHandler}>{primaryText}</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onSecondaryHandler}>{secondaryText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}