import { screen } from "@testing-library/react";
import Sign from "./Sign";


describe('Sign up', () => {

    test('enter email field', () => {
        render(<Sign />)

        const email = screen.getByLabelText('Enter Email', { exact: true });
        expect(email).toBeInTheDocument();
        
    });

    test('enter password field', () => {
        render(<Sign />)

        const pass = screen.getByLabelText('Enter password', { exact: false });
        expect(pass).toBeInTheDocument();
        
    });

    test('render Submit clicked are not', () => {
        render(<Sign />)

        const submitButton = screen.getByText('Submit', { exact: true });
        expect(submitButton).toBeInTheDocument();
        
    })
    
})

