"use strict";
let _ = require("lodash");
let chai = require("chai");
let sinon = require("sinon");
let sinonChai = require("sinon-chai");
let expect = chai.expect;
chai.use(sinonChai);

const main = require("../lib/main.js");


describe("The conversion between Zip code and barcode", function(){
    sinon.spy(console, 'log');

    it("When the input is a five-digit zip code", function(){
        let input = '95713';
        let result = main(input);
        let expect_string = '||:|:::|:|:|:::|:::||::||::|:|:|';

        expect(expect_string).to.equal(result);
    });

    it("When the input is a ten-digit zip code", function(){
        let input = '95713-2011';
        let result = main(input);
        let expect_string = '||:|:::|:|:|:::|:::||::||:::|:|||::::::||:::||:::|||';

        expect(expect_string).to.equal(result);
    });

    it("When the input is a five-digit barcode", function(){
        let input = '||:|:::|:|:|:::|:::||::||::|:|:|';
        let result = main(input);
        let expect_string = '95713';

        expect(expect_string).to.equal(result);
    });

    it("When the input is a ten-digit barcode", function(){
        let input = '||:|:::|:|:|:::|:::||::||:::|:|||::::::||:::||:::|||';
        let result = main(input);
        let expect_string = '95713-2011';

        expect(expect_string).to.equal(result);
    });
});