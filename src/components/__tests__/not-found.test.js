import React from 'react'
import NotFound from '../not-found'
import renderer from 'react-test-renderer'

import appleData from '../../../data/apple'


const i18n = {
    search: 'Search',
    clear: 'Clear', // Accessible label on "clear" button
    emojilist: 'List of emoji', // Accessible title for list of emoji
    notfound: 'No Emoji Found',
    skintext: 'Choose your default skin tone',
    categories: {
        search: 'Search Results',
        recent: 'Frequently Used',
        people: 'Smileys & People',
        nature: 'Animals & Nature',
        foods: 'Food & Drink',
        activity: 'Activity',
        places: 'Travel & Places',
        objects: 'Objects',
        symbols: 'Symbols',
        flags: 'Flags',
        custom: 'Custom',
    },
    categorieslabel: 'Emoji categories', // Accessible title for the list of categories
    skintones: {
        1: 'Default Skin Tone',
        2: 'Light Skin Tone',
        3: 'Medium-Light Skin Tone',
        4: 'Medium Skin Tone',
        5: 'Medium-Dark Skin Tone',
        6: 'Dark Skin Tone',
    },
}

test('Renders <NotFound> component', () => {
    const emojiProps = {"native":true,"skin":1,"size":24,"set":"apple","sheetSize":64,"forceSize":true,"tooltip":false}
    const component = renderer.create(
        <NotFound
            data={appleData}
            notFound={() => {}}
            notFoundEmoji={"sleuth_or_spy"}
            emojiProps={emojiProps}
            i18n={i18n}
    />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
