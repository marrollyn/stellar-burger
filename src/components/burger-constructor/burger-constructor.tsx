import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getConstructorItems,
  clearConstructor
} from '../../services/slices/constructor-slice';
import {
  getUserOrders,
  getNewOrder,
  getOrderRequest,
  clearNewOrder,
  fetchNewOrder
} from '../../services/slices/user-order-slice';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const constructorItems = useSelector(getConstructorItems);
  const user = useSelector(getUser);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getNewOrder);

  useEffect(() => {
    if (constructorItems.bun && constructorItems.ingredients) {
      orderItems = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
    }
  }, [constructorItems]);

  let orderItems: string[] = [];

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients) {
      dispatch(fetchNewOrder(orderItems));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearNewOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
