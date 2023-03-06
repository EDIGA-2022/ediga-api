const expect = require('chai').expect;
const util = require('util');

function checkStatusCode(response, expectedStatusCode, message = '') {
    if (response.status !== expectedStatusCode) {
        console.log(message);
        console.log(`${response.req.method} ${response.req.path}`);
        console.log({ expected: expectedStatusCode, actual: response.status });
        console.log('actual body: ', util.inspect(response.body, false, null, true));
    }
    expect(response.status).to.eq(expectedStatusCode);
}

module.exports = {
    checkStatusCode,
};
