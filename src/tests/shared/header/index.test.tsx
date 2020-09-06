import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '../../../shared/header';


// Note how with mount you search for the final rendered HTML since it generates the final DOM.
// We also need to pull in React Router's memoryRouter for testing since the Header expects to have React Router's props passed in.
it("should contains 4 anchors via mount", () => {
    const numAnchors = mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    ).find("a").length;
  
    expect(numAnchors).toEqual(4);
  });