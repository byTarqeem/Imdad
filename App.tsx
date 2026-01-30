
import React, { useState } from 'react';
import { UserRole } from './types.ts';
import Layout from './components/Layout.tsx';
import LandingPage from './components/LandingPage.tsx';
import InstitutionView from './components/InstitutionView.tsx';
import CompanyView from './components/CompanyView.tsx';
import StudentView from './components/StudentView.tsx';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('GUEST');

  const renderContent = () => {
    switch (role) {
      case 'INSTITUTION':
        return <InstitutionView />;
      case 'RECYCLING_COMPANY':
        return <CompanyView />;
      case 'STUDENT':
        return <StudentView />;
      default:
        return <LandingPage setRole={setRole} />;
    }
  };

  return (
    <Layout role={role} setRole={setRole}>
      {renderContent()}
    </Layout>
  );
};

export default App;
