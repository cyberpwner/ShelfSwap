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
import NotFound from './pages/NotFound';
import CreateUserPage from './pages/CreateUserPage';
import EditUser from './pages/EditUser';

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
                      <Route path="dashboard">
                        <Route index element={<Dashboard />} />
                        <Route path="users/create" element={<CreateUserPage />} />
                        <Route path="users/:id" element={<EditUser />} />
                      </Route>
                    </Route>
                  </Route>

                  <Route path="*" element={<NotFound />} />
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
