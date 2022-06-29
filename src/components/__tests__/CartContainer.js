import { render, waitFor } from '../../../test/test-utils'
import CartContainer from 'components/CartContainer'


describe('Test cart container', () => {
    it('all items in cart display properly', () => {
        const { debug } = render(<CartContainer />)
        debug()
    })
})