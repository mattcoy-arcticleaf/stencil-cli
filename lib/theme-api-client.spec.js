'use strict';

const Code = require('code');
const Lab = require('@hapi/lab');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const expect = Code.expect;
const themeApiClient = require('./theme-api-client');
const it = lab.it;
const sinon = require('sinon');

describe('theme-api-client', () => {
	describe('printErrorMessages()', () => {
        let consoleLogStub;

        lab.before(() => {
            consoleLogStub = sinon.stub(console, 'log');
    	});

		lab.after(() => {
		    console.log.restore();
		});

	    it('should log unknown error and return if input is not an array', () => {
	        expect(themeApiClient.printErrorMessages("string")).to.be.equal(false);
	        expect(consoleLogStub.calledOnce).to.be.equal(true);

	        consoleLogStub.resetHistory();

	        expect(themeApiClient.printErrorMessages({ "key": "value" })).to.be.equal(false);
	        expect(consoleLogStub.calledOnce).to.be.equal(true);

			consoleLogStub.resetHistory();

			expect(themeApiClient.printErrorMessages(null)).to.be.equal(false);
			expect(consoleLogStub.calledOnce).to.be.equal(true);
	    });

	    it('should log error message for each error in the array', () => {
			consoleLogStub.resetHistory();
            const arrayInput = [{"message": "first_error"}, {"message": "2nd_error"}];

            expect(themeApiClient.printErrorMessages(arrayInput)).to.be.equal(true);
			expect(consoleLogStub.calledThrice).to.be.equal(true);
	    });

	    it('should skip non object elements in the input array', () => {
			consoleLogStub.resetHistory();
            const arrayInput = [{"message": "first_error"}, "string", {"message": "2nd_error"}];

            expect(themeApiClient.printErrorMessages(arrayInput)).to.be.equal(true);
			expect(consoleLogStub.calledThrice).to.be.equal(true);
	    });
    });
 });
