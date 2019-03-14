import React from 'react'
import NimblePicker from '../nimble-picker'
import renderer from 'react-test-renderer'

import data from '../../../../data/apple'

test('Renders <NimblePicker> component', () => {
    const props = { data }
    const component = renderer.create(
        <NimblePicker {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
