import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import SignIn from "./components/Auth/SignIn.jsx";
import Product from "./components/page/Product/Product.jsx";
import Menu from "./components/page/Menu/Menu.jsx";
import Settings from "./components/page/Settings/Settings.jsx";
import TrainingOffers from "./components/page/TrainingOffers/TrainingOffers.jsx";
import Purpose from "./components/page/Purpose/Purpose";
import Recipes from "./components/page/Recipes/Recipes";
import RecipesAdd from "./components/page/Recipes/RecipeAdd";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="/training-offers" element={<TrainingOffers />} />
        <Route path="/menus" element={<Menu />} />
        <Route path="/product" element={<Product />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/purpose" element={<Purpose />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe-add" element={<RecipesAdd />} />
      </Route>

      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
    </>,
  ),
);

export default router;
