const Filter = ({ onFilterChange }) => {
  return (
    <div className="filterContainer">
      <label>
        Filter by type:
        <select className='selectContainer' onChange={(e) => onFilterChange(e.target.value)}>
          <option value=''>All</option>
          <option value='fire'>Fire</option>
          <option value='water'>Water</option>
          <option value='electric'>Electric</option>
          <option value='normal'>Normal</option>
          <option value='fighting'>Fighting</option>
          <option value='flying'>Flying</option>
          <option value='poison'>Poison</option>
          <option value='ground'>Ground</option>
          <option value='rock'>Rock</option>
          <option value='bug'>Bug</option>
          <option value='ghost'>Ghost</option>
          <option value='steel'>Steel</option>
          <option value='psychic'>Psychic</option>
          <option value='ice'>Ice</option>
          <option value='dragon'>Dragon</option>
          <option value='dark'>Dark</option>
          <option value='fairy'>Fairy</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
