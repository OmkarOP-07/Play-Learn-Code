import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import OTPLogin from './components/OTPLogin.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import Learn from './components/Learn.jsx';
import JavaLearning from './Cources/java.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PythonLearning from './Cources/python.jsx';
import PrintingOutput from './Java/Beginner/printing-output.jsx';
import ArrayGamePage from './Java/Arrays/array.jsx';
import DataTypesGamePage from './Java/Variables/data-types.jsx';
import BasicSyntax from './Java/Beginner/basic-syntax.jsx';
import VariablesGamePage from './Java/Variables/variables.jsx';
import TypeCastingGamePage from './Java/Variables/type-casting.jsx';
import IfElseGamePage from './Java/Conditionals/if-else.jsx';
import SwitchStatements from './Java/Conditionals/switch.jsx';
import ForLoopGamePage from './Java/Loops/for-loop.jsx';
import WhileLoopGamePage from './Java/Loops/while-loop.jsx';
import Exceptions from './Java/Exception/exceptions.jsx';
import ClassesAndObjects from './Java/OOPS/ClassesAndObjects.jsx';
import Inheritance from './Java/OOPS/Inheritance.jsx';
import Encapsulation from './Java/OOPS/encapsulation.jsx';
import Ai from './components/Ai.jsx';
import ArrayGame from './Java/Collections/ArrayGame.jsx';
import HashMapGame from './Java/Collections/HashMapGame.jsx'; 
import Constructors from './Java/OOPS/Constructors.jsx';
import MultilevelInheritance from './Java/OOPS/MultilevelInheritanceGame.jsx';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<Layout />}
        errorElement={<ErrorBoundary />}
      >   
        <Route
          path="/"
          element={<Home />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/python"
          element={<PythonLearning />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/login"
          element={<Login />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/otp-login"
          element={<OTPLogin />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/profile"
          element={<Profile />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/learn"
          element={<Learn />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java"
          element={<JavaLearning />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Beginner/printing-output"
          element={<PrintingOutput />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Arrays/array"
          element={<ArrayGamePage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Beginner/basic-syntax"
          element={<BasicSyntax />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Variables/data-types"
          element={<DataTypesGamePage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Variables/variables"
          element={<VariablesGamePage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Variables/type-casting"
          element={<TypeCastingGamePage />}
          errorElement={<ErrorBoundary />}
        /> 
        <Route
          path="/Java/Conditionals/if-else"
          element={<IfElseGamePage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Conditionals/switch"
          element={<SwitchStatements />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Loops/for-loop"
          element={<ForLoopGamePage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Loops/while-loop"
          element={<WhileLoopGamePage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Exception/exception"
          element={<Exceptions />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/OOPS/inheritance"
          element={<Inheritance />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/OOPS/encapsulation"
          element={<Encapsulation />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/OOPS/ClassesAndObjects"
          element={<ClassesAndObjects />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Collections/ArrayGame"
          element={user ? <ArrayGame /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/Collections/HashMapGame"
          element={user ? <HashMapGame /> : <Navigate to="/login" />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/ai"
          element={<Ai />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/OOPS/constructors"
          element={<Constructors />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/Java/OOPS/multilevel-inheritance"
          element={<MultilevelInheritance />}
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

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App; 

//hii