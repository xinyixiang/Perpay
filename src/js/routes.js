
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import CatalogPage from '../pages/catalog';
import SettingsPage from '../pages/settings';

import NotFoundPage from '../pages/404';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
