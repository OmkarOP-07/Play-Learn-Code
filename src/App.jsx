import React from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { JavaPointsProvider } from "./Java/JavaPointsContext.jsx";
import { appRoutes } from './routes'; // Import your new routes config

import Layout from './components/Layout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  const lenis = useLenis((lenis) => {});

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<Layout />}
        errorElement={<ErrorBoundary />}
      >
        {/* Map over the routes array to generate Route components */}
        {appRoutes.map((route, index) => {
          const Component = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Component />}
              errorElement={<ErrorBoundary />}
            />
          );
        })}
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
      },
    }
  );

  return (
    <ReactLenis root>
      <AuthProvider>
        <JavaPointsProvider>
          <RouterProvider router={router} />
        </JavaPointsProvider>
      </AuthProvider>
    </ReactLenis>
  );
}

export default App;