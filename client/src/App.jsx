// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Add from "./pages/Add/Add";
// import Gig from "./pages/Gig/Gig";
// import Gigs from "./pages/Gigs/Gigs";
// import Home from "./pages/Home/Home";
// import Layout from "./pages/Layout/Layout";
// import ProtectedRoutes from "./pages/Layout/ProtectedRoute";
// import Login from "./pages/Login-Register/Login";
// import Register from "./pages/Login-Register/Register";
// import MyGigs from "./pages/MyGigs/MyGigs";
// import NotFound from "./pages/NotFound/NotFound";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<ProtectedRoutes />}>
//           <Route element={<Layout />}>
//             <Route path="*" element={<NotFound />} />
//             <Route path="/" element={<Home />} />
//             <Route path="/gigs" element={<Gigs />} />
//             <Route path="/gig/:id" element={<Gig />} />
//             <Route path="/myGigs" element={<MyGigs />} />
//             <Route path="/add" element={<Add />} />
//           </Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/Loading/Loading";

const Add = lazy(() => import("./pages/Add/Add"));
const Gig = lazy(() => import("./pages/Gig/Gig"));
const Gigs = lazy(() => import("./pages/Gigs/Gigs"));
const Home = lazy(() => import("./pages/Home/Home"));
const Layout = lazy(() => import("./pages/Layout/Layout"));
const Login = lazy(() => import("./pages/Login-Register/Login"));
const MyGigs = lazy(() => import("./pages/MyGigs/MyGigs"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const ProtectedRoutes = lazy(() => import("./pages/Layout/ProtectedRoute"));
const Register = lazy(() => import("./pages/Login-Register/Register"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/gigs" element={<Gigs />} />
              <Route path="/gig/:id" element={<Gig />} />
              <Route path="/myGigs" element={<MyGigs />} />
              <Route path="/add" element={<Add />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
