import { shallow } from 'enzyme';
import React from 'react';

import { IIconProp, RenderIcon } from '../../../components/icons';

function renderIcone(args?: {}) {
    const defaultProps: IIconProp = {
        iconName: 'icon-hourglass',
        pathCount: 22,
    };
    const props = { ...defaultProps, ...args }
    return shallow(<RenderIcon {...props} />);
}
it("render badge", () => {
    const wrapper = renderIcone();
    expect(wrapper).toMatchSnapshot();
})
it("Should generate the proper path", () => {
    const wrapper = renderIcone();
    expect(wrapper.find('i').length).toBe(22);
})
it("Should generate the root span with proper icon name",()=>{
    const wrapper = renderIcone({iconName:'icon-clock',pathCount:8});
    const firstElement = wrapper.find("i").first();
    expect(firstElement.hasClass('icon-clock')).toBe(true);
})

