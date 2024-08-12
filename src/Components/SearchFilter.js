import React from 'react';
import { Input, Button } from 'antd';

const SearchFilter = () => {
  return (
    <div className="search-filter">
      <Input placeholder="Search profiles" style={{ width: 300 }} />
      <Button type="primary">Search</Button>
    </div>
  );
};

export default SearchFilter;