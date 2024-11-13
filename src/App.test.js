import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('check API running', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/submit/i));
  await waitFor(() => screen.getByText(/Successfully Submitted!/i));
  expect(screen.getByText(/Successfully Submitted!/i)).toBeInTheDocument();
});
