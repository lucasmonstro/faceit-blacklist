import { faceitIDToken } from '../auth/__mocks__/faceit';
module.exports = { decode: jest.fn(() => faceitIDToken) };