// Filter.jsx

const Filter = ({ search, handleSearchChange }) => {
  return (
    <div>
      filter shown with a 
      <input 
        value={search} 
        onChange={handleSearchChange} 
      />
    </div>
  );
};

export default Filter;