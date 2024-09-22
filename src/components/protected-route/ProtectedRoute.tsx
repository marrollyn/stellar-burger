import { Navigate, useLocation } from 'react-router';
import { useSelector } from '../../services/store';
import { getAuthChecked, getUser } from '../../services/slices/user-slice';
import { Preloader } from '../ui/preloader/preloader';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: TProtectedRouteProps) => {
  const isAuthChecked = useSelector(getAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <ProtectedRoute onlyUnAuth component={component} />
);
