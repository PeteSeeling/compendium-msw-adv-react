import { screen, render, waitForElementToBeRemoved, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './components/List'
import { setupServer } from 'msw/node';
import { rest } from 'msw'
import { futuramaData } from './views/futuramaData';

const server = setupServer(
    rest.get('https://futuramaapi.herokuapp.com/api/quotes', (req, res, ctx) => {
        return res(ctx.json(futuramaData))
    })
);

describe('list', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());


 test('Should test to ensure a character, character quote and search button are displayed (components)', async () => {
        render(<List />);

        await screen.findByText(/Loading/i);
      waitForElementToBeRemoved(await screen.findByText(/Loading/i));

    screen.getByRole('textbox', {Name: /Bender/i})
     screen.getByRole('textbox', {Quote: /A grim day for robot-kind. But we can always build more killbots./i})

   
        const searchButton = await screen.getByText(/search/i, {selector: 'button'})
        expect(searchButton).toBeInTheDocument();
    })

    it('Should test the character fry returns after a user searches for fry', async () => {
        render(<List />);

        
        // waitForElementToBeRemoved(screen.findByText(/Loading/i));

        const search = screen.findByLabelText(/Search/i);
        const button = screen.findByLabelText(/button/i);

      userEvent.type(search, 'Fry');
      await userEvent.click(await screen.findAllByLabelText(/button/i))
     screen.findByText(/Fry/i)
  
       
        const result = await screen.findByLabelText(/character/i)
        expect(result.value).toEqual('Fry')
        })
        })

    
