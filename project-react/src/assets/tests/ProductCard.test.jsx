import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { describe, it, expect, vi } from 'vitest';

describe('ProductCard Component', () => {
    const defaultProps = {
        id: "1",
        name: "Test Product",
        description: "Test Description",
        price: "100"
    };

    it('renders product details correctly', () => {
        render(<ProductCard {...defaultProps} />);
        
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('KSH 100')).toBeInTheDocument();
    });

    it('renders edit button if onEdit is provided', () => {
        const handleEdit = vi.fn();
        render(<ProductCard {...defaultProps} onEdit={handleEdit} />);
        
        const button = screen.getByRole('button', { name: /edit/i });
        expect(button).toBeInTheDocument();
        
        fireEvent.click(button);
        expect(handleEdit).toHaveBeenCalledWith("1");
    });

    it('does not render edit button if onEdit is not provided', () => {
        render(<ProductCard {...defaultProps} />);
        expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
    });
});
