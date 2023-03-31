import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "../../ultis/ScrollToTop";
const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  );
};

export default Layout;
