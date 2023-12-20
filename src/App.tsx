import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { Box } from 'grommet';
import { BodyContainer } from 'components/BodyContainer';
import { ActionModals } from 'components/ActionModals';
import { Inscription } from 'pages/Inscription';

function App() {
  return (
    <Box
      fill={true}
      pad={{ horizontal: 'medium', bottom: 'medium' }}
      style={{ height: '100%', position: 'fixed', overflow: 'hidden' }}
      gap="20px"
    >
      <Header />
      <BodyContainer
        justify="center"
        align="center"
      >
        <Box style={{
          maxWidth: 800
        }}>
        <Routes>
          <Route path="/" element={<Inscription />} />
        </Routes>
        </Box>
      </BodyContainer>
      <ActionModals />
    </Box>
  );
}

export default App;
