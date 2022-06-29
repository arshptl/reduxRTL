// import { render } from '@testing-library/react'
import { render, screen, within, waitFor } from '../../../test/test-utils';
import Navbar from '../Navbar';
import { setupServer } from 'msw/node'
import { rest } from 'msw';

test('Navbar with title and cart icon which shows text related to total items inside it', async () => {
    const { debug } = render(<Navbar />)
    screen.getByRole('heading', {
        name: /redux toolkit/i
    })
    
    const navigation = screen.getByRole('navigation');
    await waitFor(() => within(navigation).getByText(/0/));
    debug()
})