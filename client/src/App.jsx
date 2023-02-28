import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Add from "./pages/Add/Add";
import Gig from "./pages/Gig/Gig";
import Gigs from "./pages/Gigs/Gigs";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Message from "./pages/Message/Message";
import Messages from "./pages/Messages/Message";
import MyGigs from "./pages/MyGigs/MyGigs";
import Orders from "./pages/Orders/Order";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gig/:id" element={<Gig />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/mygigs" element={<MyGigs />} />
        <Route path="/add" element={<Add />} />
        <Route path="/messages" element={<Messages />} />{" "}
        <Route path="/message/:id" element={<Message />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
