/**
 * @jest-environment jsdom
 */


const { formHandler } = require("../client/js/formHandler")

describe(' formHandler is successful', ()=> {
  it ('returns something', () => {
        expect( formHandler).toBeDefined();
    })
})