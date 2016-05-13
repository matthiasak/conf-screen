const data = {
    hashtag: '#spacecityjs',
    logo: {
        url: "http://www.spacecity.codes/images/logo-black.svg"
    },
    sponsors: [{
        name: 'Poetic Systems',
        url: 'http://poeticsystems.com',
        image: 'http://www.spacecity.codes/images/sponsors/2016/poetic.svg',
        priority: 11
    }, {
        name: 'Texas Medical Center',
        url: 'http://www.tmcinnovation.org/tmc-x/',
        image: 'http://www.spacecity.codes/images/sponsors/2015/tmcx.png',
        priority: 11
    }, {
        name: 'Toptal',
        url: 'http://www.toptal.com/',
        image: 'http://www.spacecity.codes/images/sponsors/2016/toptal.svg',
        priority: 11,
        size: 'contain'
    }, {
        name: 'The Iron Yard',
        url: 'http://theironyard.com',
        image: 'http://www.spacecity.codes/images/sponsors/2016/theironyard.svg',
        priority: 11
    }, {
        name: 'Katz Coffee',
        url: 'http://www.katzcoffee.com',
        image: 'http://www.spacecity.codes/images/sponsors/2016/katz.png',
        priority: 1,
        size: 'auto 75%'
    }, {
        name: 'Buffalo Bayou Brewery',
        url: 'http://buffbrew.com/',
        image: 'http://www.spacecity.codes/images/sponsors/2016/buff-bayou.png',
        priority: 1,
        size: 'auto 75%'
    }, {
        name: 'St. Arnold\'s Brewing Company',
        url: 'http://saintarnold.com/',
        image: 'http://www.spacecity.codes/images/sponsors/2016/starnold.jpg',
        priority: 2,
        size: 'auto 75%'
    }, {
        name: 'Karbach Brewing Company',
        url: 'http://karbachbrewing.com/',
        image: 'http://www.spacecity.codes/images/sponsors/2016/karbach.png',
        priority: 2
    }, {
        name: 'Town in City Brewing Company',
        url: 'http://http://townincitybrewing.com',
        image: 'http://www.spacecity.codes/images/sponsors/2016/town-in-city.png',
        priority: 2,
        size: 'auto 100%'
    }],
    colors: { "sponsors": "#38454d", "background": "#1F2D4D", "highlight": "#1F2D4D", "toolbar": "#1F2D4D", "main_font": "#fff", "toolbar_font": "#ffda47" },
    schedule: [{
        start: +new Date(+new Date + 1000) || 'May 14 2016 06:00:00',
        title: 'Coffee, Breakfast, and Registration',
    }, {
        start: +new Date(+new Date + 5000) || 'May 14 2016 08:45:00',
        title: 'Kickoff',
    }, {
        start: +new Date(+new Date + 9000) || 'May 14 2016 09:00:00',
        people: [{
            name: 'Evan Morikawa',
            twitter: '@e0m',
        }],
        title: 'Using Electron & React to Build N1: The Open Source Extensible Desktop Email Client',
    }, {
        start: 'May 14 2016 09:50',
        people: [{
            name: 'Kent C Dodds',
            twitter: '@kentcdodds',
        }],
        title: 'Managing an Open Source Project',
    }, {
        start: 'May 14 2016 10:35',
        title: 'Coffee Break!',
    }, {
        start: 'May 14 2016 10:55',
        people: [{
            name: 'Kirsten Hunter',
            twitter: '@synedra',
        }],
        title: 'Quantifying Your Fitness',
    }, {
        start: 'May 14 2016 11:45',
        people: [{
            name: 'Collin Estes',
            twitter: '@collinestes',
        }],
        title: 'Node @ NASA',
    }, {
        start: 'May 14 2016 12:30',
        title: 'Lunch',
    }, {
        start: 'May 14 2016 13:30',
        title: 'Ronald McDonald House Charities Project',
    }, {
        start: 'May 14 2016 14:00',
        people: [{
            name: 'Lou Huang',
            twitter: '@saikofish',
        }],
        title: 'Learning from Civic Technology: Apps and Interfaces for Engagement',
    }, {
        start: 'May 14 2016 14:50',
        people: [{
            name: 'Slava Akhmechet',
            twitter: '@spakhm',
        }],
        title: 'Making and Using Event-driven Databases @ RethinkDB',
    }, {
        start: 'May 14 2016 15:35:00',
        title: 'Coffee!',
    }, {
        start: 'May 14 2016 15:55:00',
        people: [{
            name: 'Ben Vinegar',
            twitter: '@bentlegen',
        }],
        title: 'JavaScript Error Reporting, and Why We Can\'t Have Nice Things',
    }, {
        start: 'May 14 2016 16:40:00',
        people: [{
            name: 'Chris Oakman',
            twitter: '@oakmac1',
        }],
        title: 'Lessons Learned from N Projects',
    }, {
        start: 'May 14 2016 17:25',
        title: 'Wrap Up!',
    }, {
        start: 'May 14 2016 17:45',
        title: 'After Party!',
    }]
}

export default data
