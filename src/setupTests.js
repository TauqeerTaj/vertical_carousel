// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';
import { worker } from './mocks/browser'; // Import worker

// Start the MSW worker before tests
beforeAll(() => worker.start());

// Reset the handlers after each test (optional but recommended)
afterEach(() => worker.resetHandlers());

// Clean up after the tests are finished
afterAll(() => worker.stop());
