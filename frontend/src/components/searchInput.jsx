import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/search.svg";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  min-width: 350px;
  border: 1px solid #ddd;
  &:focus-within {
    border: 1px solid #000;
  }
  &:hover {
    border: 1px solid #000;
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: #fff;
  font-size: 14px;
  color: #000;
`;

const SearchIconWrapper = styled.img`
  padding: 10px;
  height: 20px;
  width: 20px;
`;

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  };
};
const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce function
  const debounceSearch = debounce(() => onSearch(searchTerm), 500);

  useEffect(() => {
    if (searchTerm) {
      debounceSearch();
    } else {
      onSearch(""); // Reset the filter if the search term is empty
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchWrapper>
      <SearchIconWrapper src={SearchIcon} alt="Search" />
      <StyledInput
        type="text"
        placeholder="Search by name, email, gender, role, or team"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </SearchWrapper>
  );
};

export default SearchInput;
