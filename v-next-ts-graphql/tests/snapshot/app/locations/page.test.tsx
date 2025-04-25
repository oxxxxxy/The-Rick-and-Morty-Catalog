import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Locations from '@/app/locations/page';

test('matches snapshot', () => {
  const { container } = render(<Locations />);
  expect(container).toMatchSnapshot();
});

