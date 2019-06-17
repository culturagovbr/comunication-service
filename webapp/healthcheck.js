const http = require('http');

const options = {
    host: process.env.VUE_WEBAPP_HOST,
    port: process.env.VUE_WEBAPP_PORT,
    timeout: 2000,
};

console.log(process.env.VUE_WEBAPP_HOST, process.env.VUE_WEBAPP_PORT);

const healthCheck = http.request(options, (res) => {
    console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
    if (res.statusCode === 200) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});

healthCheck.on('error', (errorListener) => {
    console.error(['ERROR', errorListener]);
    process.exit(1);
});

healthCheck.end();
