import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getUserOrders,
  fetchGetOrders
} from '../../services/slices/user-order-slice';
import { useSelector, useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(fetchGetOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
