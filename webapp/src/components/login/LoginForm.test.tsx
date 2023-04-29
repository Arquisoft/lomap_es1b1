import LoginForm from "../login/LoginForm";
import { fireEvent, render, screen } from '@testing-library/react';
import * as login from "../login/LoginForm";

describe('LoginForm', () => {
    it('should render select and text field', () => {
        render(<LoginForm isOpen onClose={() => { }} />);

        expect(screen.getByText("LoginForm.login"));

        const select = screen.getByRole('slcRole');
        expect(select).toBeInTheDocument();

        fireEvent.click(select);

        const textField = screen.getByRole('txtRole');
        expect(textField).toBeInTheDocument();
    });
});