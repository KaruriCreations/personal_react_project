import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { describe, it, expect, vi } from 'vitest';

describe('SearchBar Component', () => {
    const fetchedProducts = [
        { id: "1", name: "Apple", price: 100 },
        { id: "2", name: "Banana", price: 50 },
        { id: "3", name: "Cherry", price: 150 }
    ];

    it('filters products correctly based on search term', () => {
        const setFilteredProducts = vi.fn();
        render(<SearchBar fetchedProducts={fetchedProducts} setFilteredProducts={setFilteredProducts} />);
        
        const input = screen.getByPlaceholderText('Search products...');
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'app' } });
        fireEvent.click(button);

        expect(setFilteredProducts).toHaveBeenCalledWith([{ id: "1", name: "Apple", price: 100 }]);
    });

    it('returns all products when search term is empty', () => {
        const setFilteredProducts = vi.fn();
        render(<SearchBar fetchedProducts={fetchedProducts} setFilteredProducts={setFilteredProducts} />);
        
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);

        expect(setFilteredProducts).toHaveBeenCalledWith(fetchedProducts);
    });
});
