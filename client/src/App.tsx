import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { StrictMode } from 'react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ColorModeProvider } from './components/ui/color-mode';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BookDetails from './pages/BookDetails';
import ProtectedRoute from './layouts/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext/AuthContextProvider';
import AdminOnlyRoute from './layouts/AdminOnlyRoute';
import Dashboard from './pages/Dashboard';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  return (
    <StrictMode>
      <ChakraProvider value={system}>
        <ColorModeProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AuthContextProvider>
                <Routes>
                  <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                      <Route path="books/:id" element={<BookDetails />} />
                    </Route>

                    <Route element={<AdminOnlyRoute />}>
                      <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                  </Route>
                </Routes>
              </AuthContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </StrictMode>
  );
}

export default App;
