var proxyMiddleware = require('http-proxy-middleware');

module.exports = {
    server: {
        middleware: {
            1: proxyMiddleware('/SLSCRM_LeadsDataServices_21320_AIOLAX', {
                target: 'http://sandbox.multiclicksistemas.net/SLSCRM_LeadsDataServices_21320_AIOLAX',
                changeOrigin: true
            })

        }
    }
};
