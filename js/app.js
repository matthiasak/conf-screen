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

let data, navTo

// import test_data from './data'

const parseData = (str) => {
    // let data = test_data
    let data = JSON.parse(str)
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
    app()
    // update()
}

window.setData = setData
window.addEventListener('hashchange', onData)

const info = (title='') =>
    m('.info',
        m('h5', title))

const talk = (t,c='') => {
    if(!t) return ''
    // console.log(t)
    return m('.talk'+c,
        t.people && t.people.length ? [
            m('h1', m('span', t.people[0].name)),
            m('h3', m('span', t.people[0].twitter)),//, ' | ', t.people[0].github)),
            m('h4', m('span', t.title)),
        ] : [
            m('h1', m('span', t.title)),
        ],

        // m('h5', m('span', t.url)),
        // m('h5', m('span', time(t.start)))
    )
}

const sub = (t,c='') => {
    if(!t) return ''

    return m('.next'+c,
        m('span', 'Up next: '),
        m('h6',
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
    navTo = Math.max(0, Math.min(data.schedule.length, (navTo||0)+delta))
    if(delta !== 0) update()
}

const APPVIEW = m => (prev, current, next, fadeOut) => {
    return m('.container'+(fadeOut ? '.fadeout' : '.fadeout.fadein'),
        {
            config: (el) => {
                window.onkeyup = null
                window.addEventListener('keyup', handleKeypress)
            }
        },
        info(data.hashtag),
        // m('div', talk(prev)),
        talk(current),
        sub(next)
    )
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
        }

    setVars()

    // console.log(current, nav())

    let interval = setInterval(() => {
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
    }, 1000)

    mount(() => data ? view(prev, nav(), next, fadeOut) : m('div'), root)

    return () => {
        clearInterval(interval)
    }
}

const app = () => {
    let view = APPVIEW(m)
    start(data, view, update, qs(), mount)
}

onData()
app()
// new Date('May 14th, 2016, 9:00')