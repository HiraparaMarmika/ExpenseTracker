import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout'
import HomePage from './pages/HomePage'
import AddExpensePage from './pages/AddExpensePage'
import ExpenseDetails from './components/ExpenseDetails'
import LoginPage from './pages/LoginPage'
import PrivateRoutes from './auth/PrivateRoutes'
import ExpenseItemsPage from './pages/ExpenseItemsPage'

function App() {
  const router = createBrowserRouter([{path:'/',element:<PrivateRoutes><Layout/></PrivateRoutes>,children:[{path:'/',element:<HomePage/>},{path:'/add-expense',element:<AddExpensePage/>},{path:'/expenseDetails/:id',element:<ExpenseDetails/>},{path:'/expense-items',element:<ExpenseItemsPage/>}]},{path:'/login',element:<LoginPage/>}])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
