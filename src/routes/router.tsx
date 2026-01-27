import { AuthProvider } from '@/contexts/auth/auth-provider';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { ProtectedRoute } from './middleware/protected-route';
import { PublicRoute } from './middleware/public-route';

import Auth from '@/pages/auth/index';
import Customer from '@/pages/customer/index';
import Dashboard from '@/pages/dashboard/index';
import Order from '@/pages/order/index';
import Product from '@/pages/product/index';
import Report from '@/pages/report/index';
import Setting from '@/pages/setting/index';
import MainLayout from '@/components/layout/MainLayout';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route index path="/" element={<Auth />} />
            <Route path="register" element={<Auth />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="dashboard">
                <Route index element={<Dashboard />} />
              </Route>

              <Route path="product">
                <Route index element={<Product />} />
                <Route path=":act" element={<Product />} />
                <Route path=":act/:productId" element={<Product />} />
              </Route>

              <Route path="order">
                <Route index element={<Order />} />
                <Route path=":act" element={<Order />} />
                <Route path=":act/:orderId" element={<Order />} />
              </Route>

              <Route path="customer">
                <Route index element={<Customer />} />
                <Route path=":act" element={<Customer />} />
                <Route path=":act/:customerId" element={<Customer />} />
              </Route>

              <Route path="report">
                <Route index element={<Report />} />
                <Route path=":act" element={<Report />} />
                <Route path=":act/:reportId" element={<Report />} />
              </Route>

              <Route path="setting">
                <Route index element={<Setting />} />
                <Route path=":act" element={<Setting />} />
                <Route path=":act/:settingId" element={<Setting />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
