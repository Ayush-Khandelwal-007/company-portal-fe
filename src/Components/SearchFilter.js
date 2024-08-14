import React, { useState, useEffect } from 'react';
import { Input, Button, Tag } from 'antd';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

const SearchFilter = () => {
  const [inputValue, setInputValue] = useState('');
  const [filtersList, setFiltersList] = useState(() => JSON.parse(localStorage.getItem('filtersList')) || []);

  useEffect(() => {
    localStorage.setItem('filtersList', JSON.stringify(filtersList));
  }, [filtersList]);

  const handleAdd = () => {
    if (!filtersList.includes(inputValue) && inputValue) {
      setFiltersList(prev => {
        const newFiltersList = [...prev, inputValue];
        localStorage.setItem('filtersList', JSON.stringify(newFiltersList));
        window.dispatchEvent(new Event("filter-storage"));
        return newFiltersList;
      });
      setInputValue('');
    }
  };
  
  const handleRemove = (filter) => {
    setFiltersList(prev => {
      const newFiltersList = prev.filter(item => item !== filter);
      localStorage.setItem('filtersList', JSON.stringify(newFiltersList));
      return newFiltersList;
    });
    window.dispatchEvent(new Event("filter-storage"));
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter">
        <Input
          placeholder="Add Skills to filter"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <Button type="primary" onClick={handleAdd} icon={<PlusCircleOutlined />}>
          Add
        </Button>
      </div>
      <div className="filters-display">
        {filtersList.map((filter, index) => (
          <Tag key={filter} closeIcon={<CloseOutlined />} onClose={() => handleRemove(filter)}>
            {filter.toUpperCase()}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;