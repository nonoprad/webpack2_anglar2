import 'angular';

describe("test", function () {

    var etape;
    beforeEach(etape = module("etapesDirective"));




    it("First test", function () {
        etape.scrollTo(1);
        expect(true).toBe(true);

    });
    it("shouldBeOk", function(){
        expect(false).toBe(false);
    })
});