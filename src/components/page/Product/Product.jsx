import { ButtonFill, ButtonSelectFilter } from "../../UI/Button.jsx";
import TableProduct from "../../TableProduct.jsx";
import Input from "../../UI/Input.jsx";
import Modal from "../../Modal.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormProduct from "../../FormProduct.jsx";
import { UseProjectContext } from "../../../context/ProjectContext";
import { filterProductCategory, searchProduct } from "../../../helpers/helpers";
const Product = ({
  onSelect,
  selectDate,
  onShow,
  isRecipe,
  onSelectRecipe,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const { product, loading } = UseProjectContext();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const handleOpenModal = () => {
    setIsOpen((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    setFilteredProduct(searchProduct(product, search));
  }, [search]);

  useEffect(() => {
    setFilteredProduct(filterProductCategory(product, searchCategory));
  }, [searchCategory]);

  const handleChangeSearch = (e) => {
    let searchValue = e.target.value;
    setSearch(searchValue);
  };
  const handleSelectCategory = (e) => {
    let searchValue = e.target.value;
    setSearchCategory(searchValue);
  };
  return (
    <section className="mt-4">
      <div className="flex flex-col w-full sm:flex-row sm:max-w-xl sm:justify-between  ">
        <div className="sm:w-3/6 mb-4 mt-10">
          <Input
            placeholder="Szukaj produktu"
            onChange={handleChangeSearch}
            value={search}
          />
        </div>
        <div className="sm:mt-10">
          <ButtonSelectFilter
            onChange={handleSelectCategory}
            options={[
              { label: "Owoc", value: "Owoc" },
              { label: "Mięso", value: "Mięso" },
              { label: "Warzywa", value: "Warzywa" },
              { label: "Sery", value: "Sery" },
              { label: "Przekąski", value: "Przekąski" },
            ]}
            label="Filtruj"
          />
        </div>
      </div>

      <TableProduct
        items={filteredProduct.length > 0 ? filteredProduct : product}
        isLoading={loading}
        isSelect={onSelect}
        isSelectDate={selectDate}
        onShow={onShow}
        isRecipe={isRecipe}
        onSelectRecipe={onSelectRecipe}
      />
      <div className="grid grid-cols-2 gap-2  mt-4 mx-auto">
        <ButtonFill isOpen={handleOpenModal}>Dodaj produkt</ButtonFill>
        <Link to="/recipes">
          <ButtonFill>Dodaj potrawę</ButtonFill>
        </Link>
      </div>
      <Modal open={isOpen} onCloseModal={handleOpenModal}>
        <FormProduct />
      </Modal>
    </section>
  );
};

export default Product;
