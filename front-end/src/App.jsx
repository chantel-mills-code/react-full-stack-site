import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';
import Layout from './Layout';

const routes = [{
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/articles',
      element: <ArticleListPage />
    },
    {
      path: '/articles/:name',
      element: <ArticlePage />
    }
  ]
}];

const router = createBrowserRouter(routes);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
