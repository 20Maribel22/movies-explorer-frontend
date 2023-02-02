import "./FilterCheckbox.css";

function FilterCheckbox({ filtercheckbox, handleCheckbox }) {
  return (
    <form className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="shorts"
        checked={filtercheckbox}
        onChange={handleCheckbox}
      />
      <p className="filter-checkbox__text">Короткометражки</p>
    </form>
  );
}

export default FilterCheckbox;
