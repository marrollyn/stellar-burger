import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  getIngredientsSelector
} from '../../services/slices/ingredient-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */

  const ingredients = useSelector(getIngredientsSelector);
  const params = useParams();
  const ingredientData = ingredients.find(
    (element) => element._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
