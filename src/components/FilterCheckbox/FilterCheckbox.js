import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <form className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="short-movies"
      />
      <p className="filter-checkbox__text">Короткометражки</p>
    </form>
  );
}

export default FilterCheckbox;
