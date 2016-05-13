// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
// import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
import * as u from 'universal-utils'
const {fp,vdom,lazy,hamt,csp,fetch:f,router} = u,
    {debounce,m,html,rAF,mount,update,qs,container} = vdom

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => {
        app()
    })
}

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.log('registration failed', e)
//             // Registration failed
//     })
//
//     const unregister = () => navigator.serviceWorker.getRegistrations().then(registrations => {
//         for (let registration of registrations) {registration.unregister()}
//     })
//     window.unregister = unregister
// } else {
//     // No ServiceWorker Support
// }

let data, navTo, showSponsors

import test_data from './data'

const parseData = (str='') => {
    // let data = test_data
    let data = str ? JSON.parse(str) : test_data
    data.schedule.map((v,i) => {
        v.start = new Date(v.start)
    })
    return data
}

const byStartTime = ({start:a},{start:b}) => (+a <= +b) ? -1 : 1
const findCurrent = (sortedSchedule, now = new Date) =>
    sortedSchedule.reduce((a,v,i) =>
        (+now >= +v.start) ? v : a)

const findPrev = (sortedSchedule, current, now = new Date) =>
    sortedSchedule[sortedSchedule.indexOf(current)-1]

const findNext = (sortedSchedule, current, now = new Date) =>
    sortedSchedule[sortedSchedule.indexOf(current)+1]

const time = (d, h=d.getHours(), m=d.getMinutes() ) => {
    let suffix=(h<12 ? 'am' : 'pm')
    return `${h === 12 ? 12 : h%12}:${m<10?'0':''}${m} ${suffix}`
}

const setData = (d) => {
    location.hash = '#'+ (d ? JSON.stringify(d) : location.hash.slice(1))
}

const onData = () => {
    data = parseData(location.hash.slice(1))
    if(data.portrait) {
        qs().classList.add('portrait')
    } else {
        qs().classList.remove('portrait')
    }
    app()
    // update()
}

window.setData = setData
window.addEventListener('hashchange', onData)

const info = (title='') =>
    m('.info', {style:{'background-color': data.colors.toolbar}},
        m('h5', {style:{color: data.colors.toolbar_font}}, title))

const talk = (t,c='') => {
    if(!t) return ''

    let style = {'background-color': data.colors.highlight, color: data.colors.main_font},
        style1 = {'background-color': data.colors.highlight, color: data.colors.toolbar_font}
    // console.log(t)
    return m('.talk'+c,
        {style:{'background-color': data.colors.background}},
        t.people && t.people.length ? [
            m('h1', {style}, m('span', t.people[0].name)),
            m('h3', {style:style1}, m('span', t.people[0].twitter)),//, ' | ', t.people[0].github)),
            m('h4', {style}, m('span', t.title)),
        ] : [
            m('h1', {style}, m('span', t.title)),
            m('h3'),
            m('h4')
        ],
        logo()

        // m('h5', m('span', t.url)),
        // m('h5', m('span', time(t.start)))
    )
}

const byTypePriority = ({priority:a}, {priority:b}) => a >= b ? -1 : 1

const groupByPriority = sponsors =>
    sponsors.reduce((a,v,i) => {
        let p = v.priority
        return {...a, [p]: a[p] ? a[p] + 1 : 1}
    }, {})

const sponsors = () => {
    if(!data || !data.sponsors || !data.sponsors.length) return ''

    const s = data.sponsors.sort(byTypePriority),
        pgroups = groupByPriority(data.sponsors),
        max = s[0].priority,
        min = s[s.length - 1].priority

    return m(`.sponsors${showSponsors ? '.show' : ''}`,
        {style:{'background-color': data.colors.sponsors}},
        s.map(({priority:p, image:i, size}) =>
            m(`div`, {
                style:{
                    'background-image': `url(${i})`,
                    'flex': p,
                    // 'flex-shrink': Math.floor(p/2),
                    'min-width': Math.floor(100/pgroups[p])-5+'%',
                    'min-height': p === max ? 35+'%' : 'none',
                    'background-size': size || '75% auto'
                }
            })))
}

const sub = (t,c='') => {
    if(!t) return ''

    return m('.next'+c,
        {style:{'background-color': data.colors.toolbar, color: data.colors.toolbar_font}},
        m('span', 'Up next: '),
        m('h6',
            {style: {color: data.colors.toolbar_font}},
            m('span', time(t.start)),
            t.people && t.people.length ? [
                ' - ',
                m('span', t.people[0].name)
            ] : [
                ' - ',
                t.title
            ]),
    )
}

const handleKeypress = ({which}) => {
    let delta = (which === 37) ? -1 : (which === 39 ? 1 : 0)
    navTo = Math.max(0, Math.min(data.schedule.length-1, (navTo||0)+delta))
    if(delta !== 0) update()
}

const logo = () => {
    return data.logo ?
        m('div.logo', {style:{'background-image': `url(${data.logo.url})`}})
        : ''
}

const APPVIEW = m => (prev, current, next, fadeOut) => {
    return [
        m('.slides'+(fadeOut ? '.fadeout' : '.fadeout.fadein'),
            {
                style: {'background-color': data.colors.background},
                config: (el) => {
                    window.onkeyup = null
                    window.addEventListener('keyup', handleKeypress)
                }
            },
            info(data.hashtag),
            // m('div', talk(prev)),
            talk(current),
            sub(next)
        ),
        sponsors()
    ]
}

const makeCleanable = (fn) => {
    let cleanup
    return (...args) => {
        cleanup && cleanup()
        cleanup = fn(...args)
    }
}

const start = (data, view, update = ()=>{}, root, mount) => {
    let nav = (to) => {
            let n = s[to || navTo]
            if (n && n !== current) return n
            return current
        },
        s,
        current,
        prev,
        next,
        fadeOut = false,
        setVars = () => {
            if(!data) return
            s = data.schedule.sort(byStartTime)
            current = (findCurrent(s) || nav(0))
            prev = findPrev(s, current)
            next = findNext(s, current)
            showSponsors = false
        }

    setVars()

    // console.log(current, nav())

    let intervals = [
        setInterval(() => {
            if(!data) return
            // setVars()
            let c = findCurrent(s)
            if(c !== current){
                navTo = null
                fadeOut = true
                update()

                setTimeout(() => {
                    fadeOut = false
                    prev = findPrev(s, c)
                    current = c
                    navTo = s.indexOf(c)
                    next = findNext(s, c)
                    update()
                }, 500)
            }
        }, 1000),
        data.showSponsors && setInterval(() => {
            showSponsors = true
            update()
            setTimeout(() => {
                showSponsors = false
                update()
            }, 15000)
        }, 120000)
    ]

    mount(() => data ? view(prev, nav(), next, fadeOut) : m('div'), root)

    return () => {
        intervals.filter(x => !!x).map(i => clearInterval(i))
    }
}

const app = () => {
    let view = APPVIEW(m)
    start(data, view, update, qs(), mount)
}

onData()
app()
// new Date('May 14th, 2016, 9:00')
//