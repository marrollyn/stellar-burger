import {
  ConstructorPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  Feed
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useDispatch, useSelector } from '../../services/store';
import { AppHeader, IngredientDetails } from '@components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import {
  ProtectedRoute,
  OnlyAuth,
  OnlyUnAuth
} from '../protected-route/ProtectedRoute';
import { useEffect } from 'react';
import {
  fetchIngredients,
  getIngredientsSelector
} from '../../services/slices/ingredient-slice';
import { getUser, checkUserAuth } from '../../services/slices/user-slice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const ingredients = useSelector(getIngredientsSelector);
  function goBack() {
    navigate(-1);
  }
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    dispatch(checkUserAuth());
  }, []);
  // const ingredients = useSelector(getIngredientsSelector);
  // console.log(ingredients);
  return (
    // <div className={styles.app}>
    //   <AppHeader />
    //   <Routes location={backgroundLocation || location}>
    //     <Route path='/' element={<ConstructorPage />} />
    //     <Route path='/login' element={<Login />} />
    //     <Route path='/register' element={<Register />} />
    //     <Route
    //       path='/forgot-password'
    //       element={<OnlyUnAuth component={<ForgotPassword />} />
    //       }
    //     />
    //     <Route
    //       path='/reset-password'
    //       element={
    //         <ProtectedRoute>
    //           <ResetPassword />
    //         </ProtectedRoute>
    //       }
    //     />
    //     <Route
    //       path='/profile'
    //       element={
    //         <ProtectedRoute>
    //           <Profile />
    //         </ProtectedRoute>
    //       }
    //     />
    //     <Route
    //       path='/profile/orders'
    //       element={
    //         <ProtectedRoute>
    //           <ProfileOrders />
    //         </ProtectedRoute>
    //       }
    //     />
    //     {/* <Route path='*' element={<NotFound404 />} />
    //     <Route
    //       path='/feed/:number'
    //       element={
    //         <Modal title={''} onClose={goBack}>
    //           <OrderInfo />
    //         </Modal>
    //       }
    //     />
    //     <Route
    //       path='/ingredients/:id'
    //       element={
    //         <Modal title={'Детали ингридиента'} onClose={() => navigate(-1)}>
    //           <IngredientDetails />
    //         </Modal>
    //       }
    //     />
    //     <Route
    //       path='/profile/orders/:number'
    //       element={
    //         <Modal title={''} onClose={goBack}>
    //           <ProtectedRoute>
    //             <OrderInfo />
    //           </ProtectedRoute>
    //         </Modal>
    //       }
    //     /> */}
    //     {backgroundLocation && (
    //       <Routes>
    //         <Route
    //           path='/feed/:number'
    //           element={
    //             <Modal title={''} onClose={goBack}>
    //               <OrderInfo />
    //             </Modal>
    //           }
    //         />
    //         <Route
    //           path='/ingredients/:id'
    //           element={
    //             <Modal
    //               title={'Детали ингридиента'}
    //               onClose={() => navigate(-1)}
    //             >
    //               <IngredientDetails />
    //             </Modal>
    //           }
    //         />
    //         <Route
    //           path='/profile/orders/:number'
    //           element={
    //             <Modal title={''} onClose={goBack}>
    //               <ProtectedRoute>
    //                 <OrderInfo />
    //               </ProtectedRoute>
    //             </Modal>
    //           }
    //         />
    //       </Routes>
    //     )}
    //   </Routes>
    // </div>
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={goBack}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route
          path='/profile/orders/:number'
          element={<OnlyAuth component={<OrderInfo />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#0${location.pathname.match(/\d+/)}`}
                onClose={goBack}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={goBack}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <OnlyAuth
                component={
                  <Modal
                    title={`#0${location.pathname.match(/\d+/)}`}
                    onClose={goBack}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
