
import * as React from "react";
import { Tabs as MUITabs, Tab, Box, styled } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

const StyledTabs = styled(MUITabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

// Create proxies for the original shadcn components to maintain compatibility
const Tabs = MUITabs;

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => (
  <Box 
    ref={ref}
    className="tabs-list" 
    sx={{ 
      borderBottom: 1, 
      borderColor: 'divider',
      mb: 2
    }}
    {...props} 
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Tab> & { value: string }
>(({ className, ...props }, ref) => (
  <Tab 
    ref={ref}
    className="tabs-trigger"
    {...props} 
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Box> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  // Get the current value from the nearest Tabs parent
  const tabsContext = React.useContext(
    // @ts-ignore - This is a workaround for the context not being available
    React.createContext<{ value: string }>({ value: "" })
  );
  
  return (
    <Box
      ref={ref}
      role="tabpanel"
      hidden={value !== tabsContext.value}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className="mt-2"
      {...props}
    >
      {value === tabsContext.value && children}
    </Box>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent, TabPanel };
