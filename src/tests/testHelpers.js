const expect = require('chai').expect;
const util = require('util');

function checkStatusCode(response, expectedStatusCode, message = '') {
    if (response.statusCode !== expectedStatusCode) {
        console.log(message);
        console.log(`${response.req.method} ${response.req.path}`);
        console.log({ expected: expectedStatusCode, actual: response.statusCode });
        console.log('actual body: ', util.inspect(response.body, false, null, true));
    }
    expect(response.statusCode).to.eq(expectedStatusCode);
}

module.exports = {
    checkStatusCode,
};
