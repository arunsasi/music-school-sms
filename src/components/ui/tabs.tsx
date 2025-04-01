
import * as React from "react";
import { Box, Tab as MUITab, Tabs as MUITabs } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

// Create a context to hold the value and onChange handler
interface TabsContextType {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

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
  React.ComponentPropsWithoutRef<typeof MUITab> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  // Create a label from children if they're simple text
  const label = typeof children === 'string' ? children : undefined;
  
  return (
    <MUITab
      ref={ref}
      className={className}
      label={label || children}
      value={value}
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

export { Tabs, TabsList, TabsTrigger, TabsContent, TabPanel };
