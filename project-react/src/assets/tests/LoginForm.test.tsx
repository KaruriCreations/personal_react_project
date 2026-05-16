import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm Component', () => {
    it('renders email and password inputs', () => {
        render(<BrowserRouter><LoginForm /></BrowserRouter>);
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('submits login data and navigates on success', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ([{ email: 'test@test.com', password: 'password123' }])
        });

        render(<BrowserRouter><LoginForm /></BrowserRouter>);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/users?email=test@test.com');
            expect(mockNavigate).toHaveBeenCalledWith('/admin/product-form');
        });
    });

    it('shows error message on invalid credentials', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ([{ email: 'test@test.com', password: 'wrongpassword' }])
        });

        render(<BrowserRouter><LoginForm /></BrowserRouter>);

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
        });
    });
});
