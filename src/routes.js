import { lazy } from 'react';

// Define your routes as an array of objects
export const appRoutes = [
  // Main Components
  { path: '/', component: lazy(() => import('./components/Home')) },
  { path: '/login', component: lazy(() => import('./components/Login')) },
  { path: '/otp-login', component: lazy(() => import('./components/OTPLogin')) },
  { path: '/signup', component: lazy(() => import('./components/SignUp')) },
  { path: '/profile', component: lazy(() => import('./components/Profile')) },
  { path: '/learn', component: lazy(() => import('./components/Learn')) },
  { path: '/ai', component: lazy(() => import('./components/Ai')) },
  { path: '/CertGen', component: lazy(() => import('./components/CertGen')) },
  
  // Python Course
  { path: '/python', component: lazy(() => import('./Cources/python')) },

  // Java Course & Topics
  { path: '/Java', component: lazy(() => import('./Cources/java')) },
  { path: '/Java/Beginner/printing-output', component: lazy(() => import('./Java/Beginner/printing-output')) },
  { path: '/Java/Beginner/basic-syntax', component: lazy(() => import('./Java/Beginner/basic-syntax')) },
  { path: '/Java/Variables/data-types', component: lazy(() => import('./Java/Variables/data-types')) },
  { path: '/Java/Variables/variables', component: lazy(() => import('./Java/Variables/variables')) },
  { path: '/Java/Variables/type-casting', component: lazy(() => import('./Java/Variables/type-casting')) },
  { path: '/Java/Conditionals/if-else', component: lazy(() => import('./Java/Conditionals/if-else')) },
  { path: '/Java/Conditionals/switch', component: lazy(() => import('./Java/Conditionals/switch')) },
  { path: '/Java/Loops/for-loop', component: lazy(() => import('./Java/Loops/for-loop')) },
  { path: '/Java/Loops/while-loop', component: lazy(() => import('./Java/Loops/while-loop')) },
  { path: '/Java/Arrays/array', component: lazy(() => import('./Java/Arrays/array')) },
  { path: '/Java/Collections/ArrayGame', component: lazy(() => import('./Java/Collections/ArrayGame')) },
  { path: '/Java/Collections/HashMapGame', component: lazy(() => import('./Java/Collections/HashMapGame')) },
  { path: '/Java/Exception/exception', component: lazy(() => import('./Java/Exception/exceptions')) },
  { path: '/Java/OOPS/ClassesAndObjects', component: lazy(() => import('./Java/OOPS/ClassesAndObjects')) },
  { path: '/Java/OOPS/Constructors', component: lazy(() => import('./Java/OOPS/Constructors')) },
  { path: '/Java/OOPS/inheritance', component: lazy(() => import('./Java/OOPS/Inheritance')) },
  { path: '/Java/OOPS/encapsulation', component: lazy(() => import('./Java/OOPS/encapsulation')) },
  { path: '/Java/OOPS/MultilevelInheritance', component: lazy(() => import('./Java/OOPS/MultilevelInheritanceGame')) },
  { path: '/Java/OOPS/HybridInheritanceGame', component: lazy(() => import('./Java/OOPS/HybridInheritanceGame')) },
  { path: '/Java/OOPS/HierarchicalInheritanceGame', component: lazy(() => import('./Java/OOPS/HierarchicalInheritanceGame')) },
];