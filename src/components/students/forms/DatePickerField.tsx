
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import FormField from './FormField';

interface DatePickerFieldProps {
  id: string;
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  required?: boolean;
  tooltip?: string;
  error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  label,
  date,
  onDateChange,
  required = false,
  tooltip,
  error
}) => {
  return (
    <FormField 
      id={id} 
      label={label} 
      required={required}
      tooltip={tooltip}
      error={error}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className={cn(
              "w-full justify-start text-left font-normal bg-background border border-input h-11",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-popover">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
};

export default DatePickerField;
