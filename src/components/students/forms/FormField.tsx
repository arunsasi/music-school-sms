
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  colSpan?: "full" | "half";
  required?: boolean;
  tooltip?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  id, 
  label, 
  children, 
  className,
  colSpan = "half",
  required = false,
  tooltip,
  error
}) => {
  return (
    <div className={cn(
      "space-y-2 font-inter", 
      colSpan === "full" ? "md:col-span-2" : "",
      className
    )}>
      <div className="flex items-center gap-1">
        <Label htmlFor={id} className="font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {children}
      
      {error && (
        <p className="text-xs text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;
