/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import '@fontsource-variable/manrope/index.css';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ColorModeProvider } from './components/ui/color-mode.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';

const system = createSystem(defaultConfig, {
  globalCss: {
    ':root': {
      '--primary-purple': '#6251DD',
      '--subtle-purple': '#F4F4FF',
      '--dark-color': '#090937',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Manrope, sans-serif' },
        body: { value: 'Manrope, sans-serif' },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
);
