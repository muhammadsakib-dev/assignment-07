import React from 'react';

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const Navbar = async () => {
    const NavCategoryFetch = async () => {
        const response = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
        const data = await response.json();
        return data;
    }

    const data = await NavCategoryFetch();

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 max-w-7xl mx-auto px-4 py-4 lg:px-8 lg:py-6">
            {data.map((category: Category) => (
                <div key={category.id}>
                    <h2>{category.nameBn}</h2>
                </div>
            ))}
        </div>
    );
};

export default Navbar;