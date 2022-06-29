// test('should first', () => { second })
import store from '../redux/store'
import App from '../App'
import { setupServer } from 'msw/lib/node';
import { screen, render, waitForElementToBeRemoved, waitFor } from '../../test/test-utils'
import { rest } from 'msw';
import { getCartItems } from 'redux/features/cart/cartSlice';


const initialCartItems = [
    {
        id: 'rec1JZlfCIBOPdcT2',
        title: 'Samsung Galaxy S8',
        price: '399.99',
        img: 'https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png',
        amount: 1,
    },
    {
        id: 'recB6qcHPxb62YJ75',
        title: 'google pixel',
        price: '499.99',
        img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
        amount: 1,
    },
    {
        id: 'recdRxBsE14Rr2VuJ',
        title: 'Xiaomi Redmi Note 2',
        price: '699.99',
        img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
        amount: 1,
    },
    {
        id: 'recwTo160XST3PIoW',
        title: 'Samsung Galaxy S7',
        price: '599.99 ',
        img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
        amount: 1,
    },
];

const server = setupServer(
    rest.get('https://course-api.com/react-useReducer-cart-project', (req, res, ctx) => {
        return res(ctx.json(
            [
                {
                    id: 'rec1JZlfCIBOPdcT2',
                    title: 'Samsung Galaxy S8',
                    price: '399.99',
                    img: 'https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png',
                    amount: 1,
                },
                {
                    id: 'recB6qcHPxb62YJ75',
                    title: 'google pixel',
                    price: '499.99',
                    img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
                    amount: 1,
                },
                {
                    id: 'recdRxBsE14Rr2VuJ',
                    title: 'Xiaomi Redmi Note 2',
                    price: '699.99',
                    img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
                    amount: 1,
                },
                {
                    id: 'recwTo160XST3PIoW',
                    title: 'Samsung Galaxy S7',
                    price: '599.99 ',
                    img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
                    amount: 1,
                },
            ]
        ))
    })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
// afterEach(() => server.resetHandlers())


describe('Cart redux state tests', () => {
    it('Should initially set cart to an empty object', () => {
        const state = store.getState().cart
        expect(state.cartItems).toEqual([])
    })
})

// describe('App page frontend tests', () => {
//     it('Should initially loading state', () => {
//         // const state = store.getState().cart
//         const { debug } = render(<App />);
//         debug();
//         expect(screen.getByText(/loading/i).innerHTML).toBeInTheDocument
//     })
// })

describe('App page tests', () => {
    beforeEach(async () => {
        render(<App />);
        await waitForElementToBeRemoved(() => screen.getByText(/loading/i)).catch(err =>
            console.log(err),
        )
        await waitForElementToBeRemoved(() => screen.getByText(/is currently empty/i)).catch(err =>
            console.log(err),
        )

        expect(screen.queryByText(/Total/i)).toBeInTheDocument
        //     .then(() => {
        //     console.log("element no longer in the dom")
        // })
        // await waitFor(() => {
        //     expect(screen.queryByText(/is currently empty/i)).not.toBeInTheDocument()
        // })
        // expect(screen.queryByText(/Total/i)).toBeInTheDocument

    })
    

    it('Should be able to fetch the cart list', async () => {
        const result = await store.dispatch(getCartItems())
        const data = result.payload

        console.log("display cart", data)

        expect(result.type).toBe('cart/getCartItems/fulfilled')
        expect(data[0].price).toEqual(initialCartItems[0].price)

        const state = store.getState().cart.cartItems
        console.log("display state", state)
        expect(state).toEqual(initialCartItems)
    })

    // it('Should initially loading state', () => {
    //     expect(screen.queryByText(/Total/i)).toBeInTheDocument
    //     // const state = store.getState().cart

    //     // expect(screen.getByText(/loading/i).innerHTML).toBeInTheDocument
    //     // const textOnScreen = screen.getByText(/loading/i)
    //     // expect(screen.queryByText(/loading/i)).toBeInTheDocument()
    //     // screen.getBy()
    //     // expect(screen.queryByText(/loading/i)).toBeInTheDocument()

    // })
})

// describe('cart redux state/slice tests', () => {
//     // beforeAll(() => {
//     //     mockNetworkResponse()
//     // })
//     it('Should be able to fetch the cart list', async () => {
//         const result = await store.dispatch(getCartItems())
//         const data = result.payload

//         console.log("display cart", data)

//         expect(result.type).toBe('cart/getCartItems/fulfilled')
//         expect(data[0].price).toEqual(initialCartItems[0].price)

//         const state = store.getState().cart.cartItems
//         console.log("display state", state)
//         expect(state).toEqual(initialCartItems)
//     })
// })