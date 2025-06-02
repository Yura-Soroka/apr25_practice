import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductFilter } from './components/ProductFilter';
import { ProductList } from './components/ProductList';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    categ => categ.id === product.categoryId,
  );

  const users = usersFromServer.find(user => user.id === category.ownerId);

  return {
    ...product,
    category,
    users,
  };
});

export const App = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [queary, setQueary] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredProductsWithPerson = selectedPerson
    ? products.filter(item => item.users.id === selectedPerson.id)
    : products;

  const handleCategoryClick = categoryId => {
    setSelectedCategories(currentSelected => {
      if (currentSelected.includes(categoryId)) {
        return currentSelected.filter(id => id !== categoryId);
      }

      return [...currentSelected, categoryId];
    });
  };

  let filteredProductsWithCategories;

  if (selectedCategories.length > 0) {
    filteredProductsWithCategories = filteredProductsWithPerson.filter(item => {
      return selectedCategories.includes(item.categoryId);
    });
  } else {
    filteredProductsWithCategories = filteredProductsWithPerson;
  }

  const finalFilteredProducts = filteredProductsWithCategories.filter(item => {
    return item.name.toLowerCase().includes(queary.toLowerCase());
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>
        <ProductFilter
          selectedPerson={selectedPerson}
          setSelectedPerson={setSelectedPerson}
          queary={queary}
          setQueary={setQueary}
          selectedCategories={selectedCategories}
          handleCategoryClick={handleCategoryClick}
          setSelectedCategories={setSelectedCategories}
        />
        <ProductList finalFilteredProducts={finalFilteredProducts} />
      </div>
    </div>
  );
};
