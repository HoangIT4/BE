import React, { useState } from 'react';
import { Tabs, Tab, Paper, Box } from '@mui/material';
import CategoryTable from './CategoryTable';
import BrandTable from './BrandTable';


import SettingTable from './SettingTable'; 

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Tabs */}
      <Paper elevation={3}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Category" />
          <Tab label="Brand" />
          <Tab label="Setting" /> {/* New Tab for Settings */}
        </Tabs>
      </Paper>

      {/* Show Content Based on Active Tab */}
      <Box sx={{ marginTop: '20px' }}>
        {activeTab === 0 && <CategoryTable />}
        {activeTab === 1 && <BrandTable />}
        {activeTab === 2 && <SettingTable />} {/* Render SettingTable */}
      </Box>
    </Box>
  );
};

export default Settings;
