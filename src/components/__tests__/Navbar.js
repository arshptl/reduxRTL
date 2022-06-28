// import { render } from '@testing-library/react'
import { render } from '../../../test/test-utils';
import { Provider } from 'react-redux';
import Navbar from '../Navbar';

import store from '../../redux/store'
test('should first', () => {
    const { debug } = render(
        <Provider store={store}>
            <Navbar />
        </Provider>
    )
    debug()
})