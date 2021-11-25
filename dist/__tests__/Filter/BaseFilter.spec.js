"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlTagsFilter_1 = __importDefault(require("../../src/Filter/HtmlTagsFilter"));
const BaseFilter_1 = __importDefault(require("../../src/Filter/BaseFilter"));
const PunctuationFilter_1 = __importDefault(require("../../src/Filter/PunctuationFilter"));
const WhitespaceFilter_1 = __importDefault(require("../../src/Filter/WhitespaceFilter"));
describe('Testing BaseFilter class', () => {
    test('Adding a child filter', () => {
        const filter = new BaseFilter_1.default();
        //The filter doesn't have children
        expect(filter.count()).toEqual(0);
        const child = new HtmlTagsFilter_1.default();
        filter.addChild(child);
        //The filter now has a child
        expect(filter.count()).toEqual(1);
        const children = filter.getChildren();
        //Let's be sure that the only child is the filter we added earlier
        expect(children).toContain(child);
    });
    test('Child must be applied in the order of addition', () => {
        const filter = new BaseFilter_1.default();
        const child1 = new HtmlTagsFilter_1.default();
        filter.addChild(child1);
        const child2 = new PunctuationFilter_1.default();
        filter.addChild(child2);
        const child3 = new WhitespaceFilter_1.default();
        filter.addChild(child3);
        const children = filter.getChildren();
        expect(children[0]).toEqual(child1);
        expect(children[1]).toEqual(child2);
        expect(children[2]).toEqual(child3);
    });
    test('Removing a child', () => {
        const filter = new BaseFilter_1.default();
        const child = new HtmlTagsFilter_1.default();
        expect(filter.count()).toEqual(0);
        filter.addChild(child);
        expect(filter.count()).toEqual(1);
        filter.removeChild(child);
        expect(filter.count()).toEqual(0);
    });
    test('Each child filter must be applied once', () => {
        const base = new BaseFilter_1.default();
        const child1 = new HtmlTagsFilter_1.default();
        const child2 = new PunctuationFilter_1.default();
        const filter1 = jest.fn();
        const filter2 = jest.fn();
        //Attach mock function
        child1.filter = filter1;
        child2.filter = filter2;
        //Add as children to base
        base.addChild(child1);
        base.addChild(child2);
        //Run the base filter method
        base.filter('Some text');
        //Check the number of calls
        expect(filter1.mock.calls.length).toEqual(1);
        expect(filter2.mock.calls.length).toEqual(1);
    });
});
//# sourceMappingURL=BaseFilter.spec.js.map