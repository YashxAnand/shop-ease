import React from "react";

const Searchbar = () => {
  return (
    <div className='input-group  search-bar'>
      <input type='text' placeholder='Search...' className='form-control' />
      <div className='input-group-append'>
        <div className='btn btn-warning'>
          <span className='fa fa-search fa-lg'></span>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
