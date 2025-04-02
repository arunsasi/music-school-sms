
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  colSpan?: "full" | "half";
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ 
  id, 
  label, 
  children, 
  className,
  colSpan = "half",
  required = false
}) => {
  return (
    <div className={cn(
      "space-y-2 font-inter", 
      colSpan === "full" ? "md:col-span-2" : "",
      className
    )}>
      <Label htmlFor={id} className="font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
};

export default FormField;
