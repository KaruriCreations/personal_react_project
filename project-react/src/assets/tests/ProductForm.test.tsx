import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from '../components/ProductForm';
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

describe('ProductForm Component', () => {
    it('renders form inputs correctly', () => {
        render(<BrowserRouter><ProductForm /></BrowserRouter>);
        expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument();
    });

    it('submits form data successfully', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ id: 1, name: 'Test' })
        });

        render(<BrowserRouter><ProductForm /></BrowserRouter>);

        fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'Test Product' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '100' } });

        fireEvent.click(screen.getByRole('button', { name: /add product/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/electronics', expect.any(Object));
            expect(mockNavigate).toHaveBeenCalledWith('/admin/product-form');
        });
    });
});
