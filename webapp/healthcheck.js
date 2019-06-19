const http = require('http');

const options = {
    // host: process.env.VUE_WEBAPP_HOST,
    // port: process.env.VUE_WEBAPP_PORT,
    host: 'localhost',
    port: '8080',
    timeout: 1000,
};

// process.log(process.env.VUE_WEBAPP_HOST, process.env.VUE_WEBAPP_PORT);

const healthCheck = http.request(options, (res) => {
    // console.log('12312312312312');
    // console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
    if (res.statusCode === 200) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});
// console.log(healthCheck);
healthCheck.on('error', (errorListener) => {
    // console.error(['ERROR', errorListener]);
    process.exit(1);
});

healthCheck.end();

export default healthCheck;
