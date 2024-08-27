import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUser, fetchGetUser } from '../../services/slices/user-slice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  return <AppHeaderUI userName={user?.name} />;
};
