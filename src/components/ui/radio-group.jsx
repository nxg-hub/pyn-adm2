// components/ui/radio-group.jsx
import React from "react";

export function RadioGroup({ value, onChange, children, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { selectedValue: value, onSelect: onChange })
      )}
    </div>
  );
}

export function RadioGroupItem({ value, children, selectedValue, onSelect }) {
  const checked = selectedValue === value;

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="accent-blue-600"
      />
      <span>{children}</span>
    </label>
  );
}
