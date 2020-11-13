import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import Notebook from './';
import { BUTTON_CREATE_TEST_ID } from './constants';

describe('Testing contact form', () => {

    function fillFields(ctx, { name, email, phone }) {
        const nameInput = ctx.getByTestId('create-modal-name');
        const phoneInput = ctx.getByTestId('create-modal-phone');
        const emailInput = ctx.getByTestId('create-modal-email');

        fireEvent.change(nameInput, { target: { value: name }});
        fireEvent.change(phoneInput, { target: { value: phone }});
        fireEvent.change(emailInput, { target: { value: email }});
    }

    it('should display create new user modal', () => {
        const ctx = render(<Notebook />);

        const button = ctx.getByTestId(BUTTON_CREATE_TEST_ID);
        fireEvent.click(button);

        const modal = ctx.getByTestId('create-modal');

        expect(modal).toBeVisible();
    });

    it('should call submit when create new user modal', async () => {
        const ctx = render(<Notebook />);

        const button = ctx.getByTestId(BUTTON_CREATE_TEST_ID);
        fireEvent.click(button);

        const modal = ctx.getByTestId('create-modal');
        expect(modal).toBeVisible();

        fillFields(ctx, { name: 'User Teste', email: 'teste@teste.com', phone: '12345' });

        const submitBtn = ctx.getByTestId('create-modal-submit-btn');
        fireEvent.click(submitBtn);

        const newUser = ctx.getByTestId(`user-list-teste@teste.com`);
        expect(newUser).toBeInTheDocument();
    });

    it('should not call submit when create new user modal', async () => {
        const ctx = render(<Notebook />);

        const button = ctx.getByTestId(BUTTON_CREATE_TEST_ID);
        fireEvent.click(button);

        const modal = ctx.getByTestId('create-modal');
        expect(modal).toBeVisible();

        fillFields(ctx, { name: 'User Teste', email: undefined, phone: '12345' });

        const submitBtn = ctx.getByTestId('create-modal-submit-btn');
        fireEvent.click(submitBtn);

        const newUser = ctx.queryByTestId(`user-list-teste@teste.com`);
        expect(newUser).not.toBeInTheDocument();
    });

    it('should close create new user when clicks on cancel button', () => {
        const ctx = render(<Notebook />);

        const button = ctx.getByTestId(BUTTON_CREATE_TEST_ID);
        fireEvent.click(button);

        const modal = ctx.getByTestId('create-modal');
        expect(modal).toBeVisible();

        const cancelBtn = ctx.getByTestId('create-modal-cancel-btn');
        fireEvent.click(cancelBtn);

        expect(modal).not.toBeVisible();
    });
})
