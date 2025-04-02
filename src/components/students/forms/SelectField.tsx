
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import FormField from './FormField';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  required?: boolean;
  tooltip?: string;
  error?: string;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  required = false,
  tooltip,
  error,
  placeholder
}) => {
  return (
    <FormField 
      id={id} 
      label={label} 
      required={required} 
      tooltip={tooltip}
      error={error}
    >
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger 
          id={id}
          className="bg-background border border-input h-11 w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-popover text-popover-foreground">
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
};

export default SelectField;
