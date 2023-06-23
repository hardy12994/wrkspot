import React from "react";
import { connect } from 'react-redux';

import * as CountriesActions from '../actions/countries.actions';
import * as PaginationActions from '../actions/pagination.actions';
import CountriesComponent from "../components/countries.component";
// import { debounce } from "../helpers/utility";

class CountriesContainer extends React.Component {
  state= {
    searchCountryName: "",
    selectedPopulationFilter: Infinity,
    areCountriesPopulatedInitially: false,
  }

  showAllCountriesHandler = () => {
    this.props.getCountries({
      countryName: this.state.searchCountryName,
      pageNumber: this.props.pageNumber,
      pageSize: this.props.pageSize,
      population: this.state.selectedPopulationFilter,
    });
    this.setState({ areCountriesPopulatedInitially: true });
  }

  selectPopulationFilterHandler = (event) => {
    const { value } = event.target;

    this.setState({
      selectedPopulationFilter: Number(value),
    });
    this.props.setPageNumberAction(1);
    this.props.getCountries({
      countryName: this.state.searchCountryName,
      population: Number(value),
      pageNumber: 1,
      pageSize: this.props.pageSize,
    });
  }

  removeFilters = () => {
    this.setState({
      searchCountryName: "",
      selectedPopulationFilter: Infinity,
    });
    this.props.setPageNumberAction(1);
    this.props.getCountries({
      countryName: '',
      pageNumber: 1,
      population: Infinity,
      pageSize: this.props.pageSize,
    })
  }

  switchPageHandler = (step) => {
    const newPageNumber = this.props.pageNumber + step;
    this.props.setPageNumberAction(newPageNumber);

    this.props.getCountries({
      countryName: this.state.searchCountryName,
      pageNumber: newPageNumber,
      pageSize: this.props.pageSize,
      population: this.state.selectedPopulationFilter,
    });
  }

  searchCountryHandler = (event) => {
    const { value : searchCountryName } = event.target;
    this.setState({ searchCountryName });

    this.props.getCountries({
      countryName: searchCountryName,
      pageNumber: this.props.pageNumber,
      pageSize: this.props.pageSize,
      population: this.state.selectedPopulationFilter,
    });
  }

  render() {
    const props = {
      countryList: this.props.countryList,
      searchCountryName: this.state.searchCountryName,
      searchCountryHandler: this.searchCountryHandler,
      switchPageHandler: this.switchPageHandler,
      removeFilters: this.removeFilters,
      showAllCountriesHandler: this.showAllCountriesHandler,
      selectPopulationFilterHandler: this.selectPopulationFilterHandler,
      pageNumber: this.props.pageNumber,
      totalCountryCount: this.props.totalCountryCount,
      areMoreCountriesLeftToShow: this.props.areMoreCountriesLeftToShow,
      pageSize: this.props.pageSize,
      selectedPopulationFilter: this.state.selectedPopulationFilter,
      areCountriesPopulatedInitially: this.state.areCountriesPopulatedInitially,
    };

    return <CountriesComponent {...props} />;
  }
}

const mapStateToProps = (state) => {
  const { country, pagination } = state;

  return {
    areMoreCountriesLeftToShow: country.areMoreCountriesLeftToShow,
    totalCountryCount: country.totalCountryCount,
    countryList: country.countryList,
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
  };
};

const actionCreators = {
  getCountries: CountriesActions.getCountries,
  setPageNumberAction: PaginationActions.setPageNumberAction,
};

export default connect(mapStateToProps, actionCreators)(CountriesContainer);
