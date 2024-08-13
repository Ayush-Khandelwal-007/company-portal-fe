import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchFilter = () => {
  return (
    <div className="search-filter">
      <Input placeholder="Add Skills to filter"/>
      <Button type="primary" onClick={() => {}} icon={<SearchOutlined/>}>Apply</Button>
    </div>
  );
};

export default SearchFilter;