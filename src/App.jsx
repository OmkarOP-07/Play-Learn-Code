import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import Learn from './components/Learn.jsx';
import JavaLearning from './Cources/java.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PythonLearning from './Cources/python.jsx';
import PrintingOutput from './Java/Beginner/printing-output.jsx';
import VariableGamePage from './Java/Variables/variables.jsx';
import ArrayGamePage from './Java/Arrays/array.jsx';
import VariablesGamePage from './Java/Variables/variables.jsx';
import OOPD from './Java/OOPS/oopd.jsx';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route
        element={<Layout user={user} />}
        errorElement={<ErrorBoundary />}
      >   
        <Route
          path="/"
          element={<Home user={user} />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/python"
          element={user ? <PythonLearning /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/learn"
          element={user ? <Learn /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java"
          element={user ? <JavaLearning /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Beginner/printing-output"
          element={user ? <PrintingOutput /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Arrays/array"
          element={user ? <ArrayGamePage /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Variables/variables"
          element={user ? <VariablesGamePage /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/OOP/oopd"
          element={user ? <OOPD /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />


      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
      },
    }
  );

  return <RouterProvider router={router} />;
}

export default App; 

//hii