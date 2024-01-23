import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Header';
import { Box } from 'grommet';
import { BodyContainer } from 'components/BodyContainer';
import { ActionModals } from 'components/ActionModals';
import { Main } from 'pages/main';

function App() {
  return (
    <Box
      fill={true}
      pad={{ horizontal: 'medium', top: 'xlarge', bottom: 'medium' }}
      style={{ height: '100%' }}
    >
      {/* <Header /> */}
      <BodyContainer
        justify="start"
        align="center"
      >
        <Box
          fill={true}
          style={{
            maxWidth: 800
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            {/* <Route path="/" element={<InscriptionHistory />} /> */}
          </Routes>
        </Box>
      </BodyContainer>
      <ActionModals />
    </Box>
  );
}

export default App;
