import { db } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  doc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";

export const ProjectContext = createContext({
  addOffer: () => {},
  getUser: () => {},
  addUserProduct: () => {},
  meal: "",
  trainingOffer: "",
  recipe: "",
});

export const ProjectContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [trainingOffer, setTrainingOffer] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [meal, setMeal] = useState("");
  const [loading, setLoading] = useState(false);

  const addOffer = useCallback(async (linkMovie, title) => {
    try {
      const offerRef = doc(collection(db, "trainingOffer"));

      await setDoc(offerRef, { link: linkMovie, title: title });
      getOffer();
    } catch (e) {}
    console.log(e);
  }, []);

  const getOffer = async () => {
    try {
      const offerRef = collection(db, "trainingOffer");
      setLoading(true);
      const data = await getDocs(offerRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoading(false);
      setTrainingOffer(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async (products = "products") => {
    try {
      const productsRefCollection = collection(db, products);
      setLoading(true);
      const data = await getDocs(productsRefCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoading(false);
      setProduct(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  const getRecipe = async (recipes = "recipes") => {
    try {
      const recipesRefCollection = collection(db, recipes);
      setLoading(true);
      const data = await getDocs(recipesRefCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoading(false);
      setRecipe(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = async (id) => {
    const docRef = doc(db, "recipes", id);
    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
    await getRecipe();
  };

  // Add a new document in collection "cities"
  const addProduct = useCallback(async (data) => {
    let nutritionalValue =
      data.nutritionalValue === "porcja" ? data.portion : data.nutritionalValue;
    delete data.portion;
    const newProductRef = doc(collection(db, "products"));
    data.nutritionalValue = nutritionalValue;
    await setDoc(newProductRef, data);
    await getProducts();
  }, []);
  const addUserProduct = async (data, userID, selectData, meal) => {
    const date = new Date();
    const newProduct = {
      ...data,
      createdAT: date,
      selectDate: selectData,
      type: meal,
      pid: uuidv4(),
    };
    const productRef = doc(db, "users", userID);

    await updateDoc(productRef, {
      product: arrayUnion(newProduct),
    });
  };

  const addRecipe = async (data) => {
    const newRecipeRef = doc(collection(db, "recipes"));
    await setDoc(newRecipeRef, data);
    await getRecipe();
  };

  useEffect(() => {
    getProducts().catch(console.error);
    getRecipe().catch(console.error);
  }, [addProduct]);

  useEffect(() => {
    getOffer();
  }, [addOffer]);

  const addMeals = useCallback((name) => {
    setMeal(name);
  }, []);

  const sumItemProduct = (selectDate, item) => {
    const fatsDay = filterProduct(selectDate, false);
    if (fatsDay) {
      const amountFatsDay = fatsDay.reduce(
        (accumulator, currentValue) => +accumulator + +currentValue.data[item],
        0,
      );
      return amountFatsDay;
    } else {
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        product,
        loading,
        addProduct,
        addUserProduct,
        addMeals,
        sumItemProduct,
        meal,
        category,
        addOffer,
        trainingOffer,
        addRecipe,
        recipe,
        deleteRecipe,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const UseProjectContext = () => {
  return useContext(ProjectContext);
};
