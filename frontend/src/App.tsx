import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllListings from './pages/AllListings';
import PropertyDetail from './pages/PropertyDetail';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const listingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/listings', component: AllListings });
const propertyDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/listings/$id', component: PropertyDetail });
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutUs });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact });
const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: AdminDashboard });
const notFoundRoute = createRoute({ getParentRoute: () => rootRoute, path: '*', component: NotFound });

const routeTree = rootRoute.addChildren([
  homeRoute,
  listingsRoute,
  propertyDetailRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
