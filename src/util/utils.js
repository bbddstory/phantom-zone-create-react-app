// sleep(ms) {
//   new Promise(resolve => setTimeout(resolve, ms))
// };
// sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// submitFn = async (values) => {
//   await this.sleep(800); // simulate server latency
//   window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
// };

// validationSchema={object().shape({
//   eng_title: string().required().min(1).max(200),
//   orig_title: string().min(1).max(200),
//   year: number().integer().moreThan(1900).lessThan(2099),
//   runtime: string().matches(/^([0-9]{1,2}min|[1-9]{1}h|[1-9]{1}h[\s]{1}[0-9]{1,2}min)$/),
//   stars: string().notRequired().min(1).max(200),
//   director: string().required().min(1).max(100),
//   creator: string().min(1).max(100),
//   plot: string().min(1).max(800),
//   imdb: string().matches(/^[t]{2}[0-9]{7}$/),
//   rating: string().matches(/^[0-9]{1}.[0-9]{1}$/),
//   douban: string().matches(/^[0-9]{1,10}$/),
//   mtime: string().matches(/^[0-9]{1,10}$/),
//   trailer: string().url(),
//   featurette: string().url(),
//   status: number().integer().moreThan(-1).lessThan(10),
//   category: string().matches(/^[a-zA-Z]{1,20}$/),
//   poster: string().url(),
//   subtitle: string().url()
// })}

export const CATS = {
    HOME: 'Home',
    MOVIE: 'Movies',
    TV: 'TV',
    DOC: 'Documentaries',
    ANIME: 'Animations',
    XXX: 'XXX',
    JAV: 'JAV'
}

export const REGEX = {
    id: /^[0-9]{1,20}$/,
    eng_title: /^[a-zA-Z0-9,.'-\s]{1,200}$/,
    orig_title: /^([a-zA-Z\s,']|[^\x00-\x7F]){1,200}$/, // ([^\x00-\x7F]|\w){1,200}
    prod: /^[a-zA-Z0-9,.'-\s]{1,20}$/,
    year: /^[0-9]{4}$/,
    runtime: /^([0-9]{1,2}min|[1-9]{1}h|[1-9]{1}h[\s]{1}[0-9]{1,2}min)$/,
    stars: /^[a-zA-Z0-9,.'-\s]{1,200}$/,
    director: /^([a-zA-Z\s,']|[^\x00-\x7F]){1,100}$/, // ([^\x00-\x7F]|\w){1,100}
    creator: /^([a-zA-Z\s,']|[^\x00-\x7F]){1,100}$/, // ([^\x00-\x7F]|\w){1,100}
    plot: /^[a-zA-Z0-9,."'()!?-\s]{1,800}$/,
    imdb: /^[t]{2}[0-9]{7}$/,
    rating: /^[0-9]{1}.[0-9]{1}$/,
    douban: /^[0-9]{1,10}$/,
    mtime: /^[0-9]{1,10}$/,
    trailer: /^[a-zA-Z0-9]{11}$/,
    featurette: /^[a-zA-Z0-9]{11}$/,
    status: /^[0-9]{1}$/,
    category: /^[a-zA-Z]{1,20}$/,
    poster: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
    subtitle: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
    comments: /^[a-zA-Z0-9,."'()!?-\s]{1,300}$/,
}

// The port number corresponds to the port on which NodeJS backend (cemetery) is listening
export const NODE_URL = () => {
    return 'http://localhost:49995'; // For local development
    // return 'http://pzone.foreverjuniordev.com:49995'; // For deploying on a hosting service
}

export const parseCookie = (ca) => {
    let co = {};

    for (let i in ca) {
        let c = ca[i].trim().split('=');
        co[c[0]] = c[1];
    }
    
    return co;
}

const exist = (eid) => {
    return document.getElementById(eid)
}

const inView = (eid) => {
    if (document.getElementById(eid)) {
        let elemTop = document.getElementById(eid).offsetTop;
        let elemBottom = elemTop + document.getElementById(eid).offsetHeight;
        let docViewTop = document.body.scrollTop;
        let docViewBottom = docViewTop + window.innerHeight;
    
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    } else {
        return false
    }
}

export const resetSearch = () => {
    if (exist('search') && !inView('search') && !document.getElementById('search-box').classList.contains('search-fixed')) {
        document.getElementById('search-box').classList.remove('search-restore');
        document.getElementById('search-box').classList.add('search-fixed');
    }
    if (exist('search') && inView('search') && document.getElementById('search-box').classList.contains('search-fixed')) {
        document.getElementById('search-box').classList.remove('search-fixed');
        document.getElementById('search-box').classList.add('search-restore');
    }
}

export const resetPages = () => {
    if (exist('pages') && !inView('controls') && !document.getElementById('controls').classList.contains('controls-fixed')) {
        document.getElementById('controls').classList.add('controls-fixed')
    }
    if (exist('pages') && inView('pages')) {
        document.getElementById('controls').classList.remove('controls-fixed')
    }
}