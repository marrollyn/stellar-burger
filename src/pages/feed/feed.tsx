import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedOrders, fetchFeeds } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeedOrders);
  console.log(orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeeds());
    }
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
