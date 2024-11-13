import { setupWorker } from 'msw/node';
import { handlers } from './handlers';

// Set up the service worker with the mock handlers
export const worker = setupWorker(...handlers);
