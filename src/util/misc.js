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

// <Link to={`/users/${user.id}`}>{user.name}</Link>

// .env NODE_PATH=src

const http = require('http');
const httpProxy = require('http-proxy');
// Reverse proxy for the surrogate server to consume
const reverseProxy = httpProxy.createProxyServer();
// Actual URL of the selfcare server
const targetUrl = 'http://10.50.30.121:8200/';
// Surrogate server local listening port
const port = '5050';

// Must set CORS headers to avoid CORB in Chrome (doesn't work in Firefox)
reverseProxy.on('proxyRes', (proxyRes, req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'application/json');
});

// http.on

// Surrogate server for local dev to access
const surrogate = http.createServer((req, res) => {
  console.log();
  console.log(`-- Request received: ${new Date()}`);
  console.log(req.url);

  console.log('RAW Response from the target', JSON.stringify(req.headers, true, 2));
  
  if (req.method === 'OPTIONS') {
    console.log('1. ', req.method);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers': 'application/json',
    });
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    // res.setHeader('Access-Control-Allow-Headers', 'application/json');
    res.end();
  } else {
    console.log('2. ', req.method);
    /**
     * Must set method to what you need here. Since this proxy
     * relays requests from the browser, the incoming method is
     * still OPTIONS which will in turn be sent to the proxy
     * and causing 500 errors.
     */
    req.method = 'GET';
    // Headers are not send through, so they must be set
    req.headers = {
      'ocs-client-id': 'mocca',
      'ocs-user-id': 'mocca_admin',
    };
    // console.log('RAW Response from the target', JSON.stringify(req.headers, true, 2));
    // console.log(req.method);

    // Using 'web' mode to relay the requests
    reverseProxy.web(req, res, { target: targetUrl });
  }
});

surrogate.listen(port);

console.log(`-- Listening on port ${port}`);
console.log();
