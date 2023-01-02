import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Header from 'components/Header/Header';

const queryClient = new QueryClient();

const App = (props) => {

  return (
    <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Suspense fallback={<p>Loading...</p>}>
            <Header />
            <Outlet />
          </Suspense>
        </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App;