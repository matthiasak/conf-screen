# Auto-Conf-Screen

> – work your schedule, don't let it work you.

# Why?

Manually editing slides is annoying; especially if you're running an event/conference and want a feasible amount of control over which slides should be shown. We can't all use Keynote, or Powerpoint, or Google Slides / etc, either.

This software / app is an attempt to parameterize everything one might need as JSON data, which we can put as a serialized string in the browser's hash route.

Everything from colors, to sponsors, to speakers and times, and the hashtag or message, and the logo - are configurable through this object.

For example, serializing the following Object:

```js
{
    hashtag: "#spacecityjs",
    portrait: 0,
    showSponsors: 1,
    logo: { url: "http://www.spacecity.codes/images/logo-black.svg" },
    colors: {
        sponsors: "#38454d",
        background: "#1F2D4D",
        highlight: "#1F2D4D",
        toolbar: "#1F2D4D",
        main_font: "#fff",
        toolbar_font: "#ffda47"
    },
    schedule: [
        { start: "May 14 2016 06:00:00", title: "Coffee, Breakfast, and Registration" },
        { start: "May 14 2016 08:45:00", title: "Kickoff" },
        { start: "May 14 2016 09:00:00", people: [{ name: "Evan Morikawa", twitter: "@e0m" }], title: "Using Electron & React to Build N1: The Open Source Extensible Desktop Email Client" },
        { start: "May 14 2016 09:50", people: [{ name: "Kent C Dodds", twitter: "@kentcdodds" }], title: "Managing an Open Source Project" },
        { start: "May 14 2016 10:35", title: "Coffee Break!" },
        { start: "May 14 2016 10:55", people: [{ name: "Kirsten Hunter", twitter: "@synedra" }], title: "Quantifying Your Fitness" },
        { start: "May 14 2016 11:45", people: [{ name: "Collin Estes", twitter: "@collinestes" }], title: "Node @ NASA" },
        { start: "May 14 2016 12:30", title: "Lunch" },
        { start: "May 14 2016 13:30", title: "Ronald McDonald House Charities Project" },
        { start: "May 14 2016 14:00", people: [{ name: "Lou Huang", twitter: "@saikofish" }], title: "Learning from Civic Technology: Apps and Interfaces for Engagement" },
        { start: "May 14 2016 14:50", people: [{ name: "Slava Akhmechet", twitter: "@spakhm" }], title: "Making and Using Event-driven Databases @ RethinkDB" },
        { start: "May 14 2016 15:35:00", title: "Coffee!" },
        { start: "May 14 2016 15:55:00", people: [{ name: "Ben Vinegar", twitter: "@bentlegen" }], title: "JavaScript Error Reporting, and Why We Can't Have Nice Things" },
        { start: "May 14 2016 16:40:00", people: [{ name: "Chris Oakman", twitter: "@oakmac1" }], title: "Lessons Learned from N Projects" },
        { start: "May 14 2016 17:25", title: "Wrap Up!" }, { start: "May 14 2016 17:45", title: "After Party!" }
    ],
    sponsors: [
        { name: "Poetic Systems", url: "http://poeticsystems.com", image: "http://www.spacecity.codes/images/sponsors/2016/poetic.svg", priority: 11 },
        { name: "Texas Medical Center", url: "http://www.tmcinnovation.org/tmc-x/", image: "http://www.spacecity.codes/images/sponsors/2015/tmcx.png", priority: 11 },
        { name: "Toptal", url: "http://www.toptal.com/", image: "http://www.spacecity.codes/images/sponsors/2016/toptal.svg", priority: 11, size: "contain" },
        { name: "The Iron Yard", url: "http://theironyard.com", image: "http://www.spacecity.codes/images/sponsors/2016/theironyard.svg", priority: 11 },
        { name: "Katz Coffee", url: "http://www.katzcoffee.com", image: "http://www.spacecity.codes/images/sponsors/2016/katz.png", priority: 1, size: "auto 75%" },
        { name: "Buffalo Bayou Brewery", url: "http://buffbrew.com/", image: "http://www.spacecity.codes/images/sponsors/2016/buff-bayou.png", priority: 1, size: "auto 75%" },
        { name: "St. Arnold's Brewing Company", url: "http://saintarnold.com/", image: "http://www.spacecity.codes/images/sponsors/2016/starnold.jpg", priority: 2, size: "auto 75%" },
        { name: "Karbach Brewing Company", url: "http://karbachbrewing.com/", image: "http://www.spacecity.codes/images/sponsors/2016/karbach.png", priority: 2 },
        { name: "Town in City Brewing Company", url: "http://http://townincitybrewing.com", image: "http://www.spacecity.codes/images/sponsors/2016/town-in-city.png", priority: 2, size: "auto 100%" }
    ]
}
```

into a String and then injecting it into the hash with `window.location.hash = '#'+JSON.stringify(...)` will give the app the data it needs to render an entire, automated slide deck, complete with portrait and landscape modes, dynamic data, and the ability to control the current slide.

To see the above code as an example app, open https://matthiasak.github.io/conf-screen/, copy paste the above data, and paste it into the console, passing at as a parameter to `window.setData(...)`. This will automatically update the hash route and draw the data to the screen for you.

# Contributing

Got an issue? Want to make a PR? This project may need a lot:

- I want to parameterize more values and presentation styles
- Tests!
- New features... (hit up issues with a feature request)

# Getting Started with a Local Installation

1. clone this repo (or a fork of this repo)
2. `npm i`
3. `npm run s`

# License

MIT.
