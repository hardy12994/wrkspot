import React from 'react';
import "../assets/css/countries.css";
import PaginationComponent from "./shared/pagination.component";

export default function CountriesComponent(props) {
  const {
    countryList,
    searchCountryName,
    searchCountryHandler,
    switchPageHandler,
    pageNumber,
    removeFilters,
    areMoreCountriesLeftToShow,
    totalCountryCount,
    pageSize,
    showAllCountriesHandler,
    areCountriesPopulatedInitially,
    selectPopulationFilterHandler,
    selectedPopulationFilter,
  } = props;

  const tableView = (
    <div>
      <table>
        <tr>
          <th>Country Name</th>
          <th>Code</th>
          <th>Capital</th>
          <th>Ph Code</th>
          <th>Population</th>
          <th>Flag</th>
        </tr>
        {countryList.length > 0 && countryList.map((countryData, index) => (
          <tr key={index}>
            <td>{countryData.name}</td>
            <td>{countryData.abbreviation}</td>
            <td>{countryData.capital}</td>
            <td>{countryData.phone}</td>
            <td>{countryData.population}</td>
            <td>{countryData.name}</td>
          </tr>
        ))}
      </table>
    </div>
  );

  return (
    <div id="country-section">
      <h4 id="heading">
        Countries Info
      </h4>
      <div id="filter">
        <input disabled={countryList.length === 0} value={searchCountryName} onChange={searchCountryHandler} placeholder='Search country...' />
        <select disabled={countryList.length === 0} placeholder='Population' value={selectedPopulationFilter} onChange={selectPopulationFilterHandler} name="Population" id="population">
          <option value={Infinity} disabled selected hidden>Population</option>
          <option value="1000000">&lt;1M</option>
          <option value="5000000">&lt;5M</option>
          <option value="10000000">&lt;10M</option>
        </select>
        <button disabled={!areCountriesPopulatedInitially} id="clear" onClick={removeFilters}>Clear</button>
        <button className='pull-right' id="get-countries-btn" onClick={showAllCountriesHandler}>
          Show All Countries
        </button>
      </div>
      {tableView}
      {countryList.length > 0 && 
        <PaginationComponent 
          pageNumber={pageNumber}
          totalCountryCount={totalCountryCount}
          areMoreCountriesLeftToShow={areMoreCountriesLeftToShow}
          pageSize={pageSize}
          switchPageHandler={switchPageHandler}
        />}
    </div>
  )
}