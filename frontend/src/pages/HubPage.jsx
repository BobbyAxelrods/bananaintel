import React from 'react';
import HubLayout from '../components/HubLayout';

const HubPage = ({ initialFilter = 'all' }) => {
  return <HubLayout initialFilter={initialFilter} />;
};

export default HubPage;

