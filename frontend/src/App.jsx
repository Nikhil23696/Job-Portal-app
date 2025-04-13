import { lazy } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './Component/Admin/ProtectedRoute';

const Signup = lazy(() => import('./Component/Register/Signup'));
const Login = lazy(() => import('./Component/Register/Login'));
const Home = lazy(() => import('./Component/Home/Home'));
const JobDetails = lazy(() => import('./Component/ApplyJob/JobDetails'));
const Navbar = lazy(() => import('./Component/Home/Navbar'));
const AppliedJob = lazy(() => import('./Component/ApplyJob/AppliedJob'));
const Profile = lazy(() => import('./Component/UserProfile/Profile'));
const CreateJob = lazy(() => import('./Component/Admin/CreateJob'))
const Applicant = lazy(() => import('./Component/Admin/Applicant'));
const Admin = lazy(() => import('./Component/Admin/Admin'));
const AllJobs = lazy(() => import('./Component/Admin/AllJobs'));
const Browse = lazy(() => import('./Component/Browse/Browse'));

function App() {
  return (
    <BrowserRouter>
      <Mainlayout />
    </BrowserRouter>
  )
}
function Mainlayout() {
  const location = useLocation();
  const hide = location.pathname.startsWith('/signup')

  return (
    <>
      {!hide && <Navbar />}

      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/job/:id' element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
        <Route path='applied/job' element={<ProtectedRoute><AppliedJob /></ProtectedRoute>} />
        <Route path='profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/browse' element={<ProtectedRoute><Browse /></ProtectedRoute>} />
        <Route path='/admin/' element={<Admin />}>
          <Route path='job/new' element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
          <Route path='applicants' element={<ProtectedRoute><Applicant /></ProtectedRoute>} />
          <Route path='jobs/all' element={<ProtectedRoute><AllJobs /></ProtectedRoute>} />
        </Route>
      </Routes>

    </>
  )
}

export default App
