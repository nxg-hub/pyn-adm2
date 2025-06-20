import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { searchIndex } from '../../utilities/searchIndex';
import { Search } from 'lucide-react';

export default function GlobalSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === '') {
      setShowDropdown(false);
      setResults([]);
      return;
    }

    const matches = searchIndex.filter(item =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
    setResults(matches);
    setShowDropdown(true);
  }, [query]);

  const handleSelect = (path) => {
    navigate(path);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="relative ml-auto w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search pages..."
        className="pl-8"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showDropdown && (
        <div className="absolute top-full mt-1 w-full bg-black shadow-md border rounded-md z-50">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.path)}
                className="p-2 hover:bg-gray-800 cursor-pointer"
              >
                <span className="font-medium">{item.label}</span>
                <span className="block text-xs text-gray-500">Page</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">No matches</div>
          )}
        </div>
      )}
    </div>
  );
}
