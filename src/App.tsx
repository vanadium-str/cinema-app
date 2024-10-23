import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
