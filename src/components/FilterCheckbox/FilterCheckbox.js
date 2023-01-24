import "./FilterCheckbox.css";

function FilterCheckbox({ checked, handleCheckbox }) {
  return (
    <form className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="short-movies"
        checked={checked}
        onChange={handleCheckbox}
      />
      <p className="filter-checkbox__text">Короткометражки</p>
    </form>
  );
}

export default FilterCheckbox;
