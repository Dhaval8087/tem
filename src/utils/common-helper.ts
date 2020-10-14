import { EventType } from '../models';

const groupBy = (xs: any, f: any) => {
    /* eslint-disable */
    return xs.reduce((r: any, v: any, i: any, a: any, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

const getEventType = (): EventType => {
    const pathName = window.location.pathname;
    if (pathName.indexOf('/myevents') > -1) {
        return 'MY'
    } else if (pathName.indexOf('/allevents') > -1) {
        return 'ALL'
    } else {
        return 'ALL'
    }
}
const addPopUp = () => {
    const element = document.createElement('div');
    element.className = 'modal-backdrop fade show'
    document.body.appendChild(element);
}
const removePopup = () => {
    const findelement = document.getElementsByClassName('modal-backdrop');
    if (findelement.length > 0) {
        document.body.removeChild(findelement[0]);
    }
}
export { groupBy, getEventType, addPopUp, removePopup };