
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  colSpan?: "full" | "half";
}

const FormField: React.FC<FormFieldProps> = ({ 
  id, 
  label, 
  children, 
  className,
  colSpan = "half" 
}) => {
  return (
    <div className={cn(
      "space-y-2", 
      colSpan === "full" ? "md:col-span-2" : "",
      className
    )}>
      <Label htmlFor={id} className="font-medium">{label}</Label>
      {children}
    </div>
  );
};

export default FormField;
