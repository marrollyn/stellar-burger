import { Navigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from '../../services/store';
import { getAuthChecked, getUser } from '../../services/slices/user-slice';
import { Preloader } from '../ui/preloader/preloader';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
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

  return children;
};

// //чтобы пропускать только авторизованных пользователей
// export const OnlyAuth = ProtectedRoute;
// //чтобы пропускать только неавторизованных
// export const OnlyUnAuth = ({children }: { children: React.JSX.Element }) => (
//   <ProtectedRoute onlyUnAuth children={children} />
// );
