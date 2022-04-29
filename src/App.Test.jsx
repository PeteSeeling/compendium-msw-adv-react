import { screen, render} from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import List from './components/List'
import { rest } from 'msw'

import App from './App'

describe('Component and Behavior Tests', () =>{
 test('Should test to ensure a character, character quote and search button are displayed (components)', async () => {
        render(<List />);

        await screen.getByRole('textbox', {Name: /Bender/i})
        await screen.getByRole('textbox', {Quote: /A grim day for robot-kind. But we can always build more killbots./i})
        const searchButton = screen.getByText(/search/i, {selector: 'button'})
    })

    it('Should test the character fry returns after a user searches for fry', async () => {
        render(<List />);

        const search = screen.getByLabelText(/Search/i);
        const button = screen.getByLabelText(/button/i);

        userEvent.type(search, 'Fry');
        userEvent.click(button);
     
        
        const result = await screen.getByLabelText(/character/i)
      

            expect(result.value).toEqual('Fry')
        })

    })
    
