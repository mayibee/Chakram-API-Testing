var rewire = require('rewire'),
    sinon = require('sinon'),
    chakram = rewire('./../lib/chakram.js'),
    expect = chakram.expect;


describe("User Warnings", function() {
    var consoleErrorStub;
    
    before(function () {
        consoleErrorStub = sinon.stub();
        chakram.__set__({
            console: {
                error: consoleErrorStub
            }
        });
    });
    
    it("should warn user about unrun tests", function () {
        var request = chakram.get("http://httpbin.org/status/200");
        expect(request).to.have.status(400);
        return request;
    });
    
    it("should warn user about unrun tests even when 'it' is synchronous", function() {
        var request = chakram.get("http://httpbin.org/status/200");
        expect(request).to.have.status(400);
    });
    
    after(function() {
        expect(consoleErrorStub.callCount).to.equal(2);
    });
});