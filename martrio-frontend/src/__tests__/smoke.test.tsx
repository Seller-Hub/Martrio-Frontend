import { render, screen } from '@testing-library/react';

// Replace this later with real component/page tests:
function Hello() {
  return <h1>Martrio</h1>;
}

test('renders Hello', () => {
  render(<Hello />);
  expect(screen.getByText('Martrio')).toBeInTheDocument();
});
