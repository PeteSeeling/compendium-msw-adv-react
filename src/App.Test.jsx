import { screen, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import List from './components/List'

import App from './App'


 test('Should test to ensure a character, character quote and search button are displayed (components)', async () => {
        render(<List />);

        await screen.getByRole('textbox', {Name: /Bender/i})
        await screen.getByRole('textbox', {Quote: /A grim day for robot-kind. But we can always build more killbots./i})
        const searchButton = screen.getByText(/search/i, {selector: 'button'})
    })

    it('Should test the behavior of the app', async () => {
        render(<List />);

        const search = screen.getByLabelText(/Search/i)

        userEvent.type(search, 'Fry');

        return waitFor(() => {
            const result = screen.getByRole('textbox', {Name:/Fry/i})

            expect(result).toEqual('Fry')
        })
    })

    
