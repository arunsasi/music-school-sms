
import * as React from "react";
import { 
  Tabs as MUITabs, 
  Tab as MUITab, 
  Box,
  styled
} from "@mui/material";

// Create a context to hold the value and onChange handler
interface TabsContextType {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

// Custom styled Tab with proper TypeScript compatibility
const StyledTab = styled(MUITab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  fontSize: '0.875rem',
  fontWeight: 500,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const Tabs = React.forwardRef<
  HTMLDivElement,
  {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    children: React.ReactNode;
  }
>(({ defaultValue, value, onValueChange, className, children, ...props }, ref) => {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    onValueChange?.(newValue);
  };

  // Update controlled value
  React.useEffect(() => {
    if (value !== undefined) {
      setTabValue(value);
    }
  }, [value]);

  return (
    <TabsContext.Provider
      value={{
        value: tabValue,
        onChange: handleChange,
      }}
    >
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  
  if (!context) {
    throw new Error("TabsList must be used within a Tabs component");
  }

  return (
    <Box ref={ref} className={className} sx={{ borderBottom: 1, borderColor: 'divider' }} {...props}>
      <MUITabs 
        value={context.value} 
        onChange={context.onChange}
        aria-label="tabs"
      >
        {children}
      </MUITabs>
    </Box>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  { value: string, children: React.ReactNode, className?: string }
>(({ value, children, className, ...props }, ref) => {  
  return (
    <StyledTab
      label={children}
      value={value}
      className={className}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }
  
  return (
    <div
      ref={ref}
      role="tabpanel"
      hidden={value !== context.value}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={className}
      {...props}
    >
      {value === context.value && children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
