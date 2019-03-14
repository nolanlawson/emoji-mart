// Link.react.test.js
import React from 'react';
import NotFound from '../not-found';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <NotFound></NotFound>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
