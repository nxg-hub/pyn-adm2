import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SearchFilterBar = ({ searchQuery, onSearchChange, filters = [] }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="ml-auto flex flex-col gap-2 w-full max-w-xl">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-black p-4 border rounded-md shadow-sm">
          {filters.map(({ label, name, options, value, onChange }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium mb-1">{label}</label>
              <select
                value={value}
                onChange={(e) => {onChange(e.target.value);
                            setShowFilters(false)
                  }}
                className="border rounded bg-black p-2 text-sm"
              >
                <option value="">All</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
               {opt
               .toLowerCase()
               .split('_')
               .map(word => word[0].toUpperCase() + word.slice(1))
               .join(' ')} 
                        </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
