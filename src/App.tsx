import { BrowserRouter } from 'react-router';
import { MainRouter } from './pages/router';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { APIResponseError } from 'endpoint-client';
import './style.css';
import ScrollToTop from './components/deprecated/ScrollTop/ScrollTop';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof APIResponseError) {
        if (error.body.code === 'invalid_token') {
          localStorage.removeItem('accessToken');
          window.location.href = '/';
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
        <ScrollToTop />
        <MainRouter />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
