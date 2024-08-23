function getPages() {
    // Create pages object
    const pages = {};

    // Home Page
    pages['root'] = {
        template: 'home'
    };

    // Google Play
    const googlePlayOptions = {
        'hammerhex': {
            name: 'Hammer Hex',
            itchio: 'https://bluishgreenpro.itch.io/hammer-hex',
            googleplay: 'hammerhex',
            gxgames: 'ynf9dg/hammer-hex'
        },
        'makenewfriends': {
            name: 'Make New Friends',
            itchio: 'make-new-friends',
            googleplay: 'makenewfriends',
            gxgames: 'v408fd/make-new-friends',
            github: 'Make-New-Friends'
        },
        'bladesofdoom': {
            name: 'Blades of Doom',
            itchio: 'blades-of-doom',
            googleplay: 'bladesofdoom',
            gxgames: 'ovtmf7/blades-of-doom',
            github: 'Blades-Of-Doom'
        },
        'shapeion': {
            name: 'Shapeion',
            itchio: 'shapeion',
            googleplay: 'shapeion',
            gxgames: '3tyac9/shapeion',
            github: 'Shapeion'
        },
        'youareabomb': {
            name: 'You Are A Bomb',
            itchio: 'you-are-a-bomb',
            googleplay: 'youareabomb',
            gxgames: '249rmr/you-are-a-bomb',
            github: 'You-Are-A-Bomb'
        },
        'twilighttempo': {
            name: 'Twilight Tempo',
            itchio: 'twilight-tempo',
            googleplay: 'twilighttempo',
            gxgames: 'r4gpyp/twilight-tempo',
            github: 'Twilight-Tempo'
        }
    };

    for(const name in googlePlayOptions) {
        googlePlayOptions[name].id = name;
        pages[`google-play/${name}`] = {
            template: 'googleplay/home',
            options: googlePlayOptions[name]
        };
        pages[`google-play/${name}/privacypolicy.html`] = {
            template: 'googleplay/privacypolicy',
            options: googlePlayOptions[name]
        };
    }

    return pages;
}

// Export functions
module.exports = {
    getPages
};