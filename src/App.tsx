import { BrowserRouter } from 'react-router-dom';
import { MainRouter } from './pages/router';
import { Toaster } from './components/ui/sonner';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryCache, QueryClientProvider } from '@tanstack/react-query';
import { APIResponseError } from 'endpoint-client';
import './style.css';

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
      <RecoilRoot>
        <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
          <MainRouter />
          <Toaster />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
