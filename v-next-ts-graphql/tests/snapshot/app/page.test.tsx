import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from '@/app/page';

test('matches snapshot', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
