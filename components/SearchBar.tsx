'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = (e.currentTarget.querySelector('input') as HTMLInputElement)?.value;
    if (searchInput) {
      window.location.href = `/listings?location=${encodeURIComponent(searchInput.toLowerCase())}`;
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <form onSubmit={handleSubmit}>
          <div className="input-group input-group-lg mb-4" style={{ boxShadow: 'var(--shadow-md)' }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter city, neighborhood, or base name"
              style={{ 
                height: '60px',
                fontSize: '1.1rem',
                borderRadius: '12px 0 0 12px',
                border: '1px solid var(--medium-pink)'
              }}
            />
            <button 
              type="submit"
              className="btn px-4"
              style={{ 
                height: '60px',
                borderRadius: '0 12px 12px 0',
                fontSize: '1.1rem',
                backgroundColor: 'var(--primary-pink)',
                color: 'white',
                border: 'none'
              }}
            >
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
