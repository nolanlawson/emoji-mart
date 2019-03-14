import React from 'react'
import NimblePicker from '../nimble-picker'
import renderer from 'react-test-renderer'

import appleData from '../../../../data/apple'
import data from "../../../../data/all"

test('Renders <NimblePicker> component', () => {
    const props = { data: appleData }
    const component = renderer.create(
        <NimblePicker {...props} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
