import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserName } from '../../services/slices/user-slice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserName);
  return <AppHeaderUI userName={userName} />;
};
