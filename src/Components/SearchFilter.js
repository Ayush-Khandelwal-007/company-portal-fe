import React, { useState } from 'react';
import { Input, Button, Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const SearchFilter = () => {
  const [inputValue, setInputValue] = useState('');
  const [filtersList, setFiltersList] = useState(() => JSON.parse(localStorage.getItem('filtersList')) || []);

  const updateLocalStorage = (newFiltersList) => {
    localStorage.setItem('filtersList', JSON.stringify(newFiltersList));
    window.dispatchEvent(new Event("filter-storage"));
  };

  const handleAdd = () => {
    if (!filtersList.includes(inputValue) && inputValue) {
      const newFiltersList = [...filtersList, inputValue];
      updateLocalStorage(newFiltersList);
      setFiltersList(newFiltersList);
      setInputValue('');
    }
  };

  const handleRemove = (filter) => {
    const newFiltersList = filtersList.filter(item => item !== filter);
    updateLocalStorage(newFiltersList);
    setFiltersList(newFiltersList);
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter">
        <Input
          placeholder="Add Skills to filter"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <Button type="primary" onClick={handleAdd} icon={<PlusCircleOutlined />}>
          Add
        </Button>
      </div>
      <div className="filters-display">
        {filtersList.map(filter => (
          <Tag key={filter} closable onClose={() => handleRemove(filter)}>
            {filter.toUpperCase()}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;