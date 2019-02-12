import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import ReactPaginate from 'react-paginate';
import FilterDropdown from './FilterDropdown';

// Import Actions
import { fetchData } from './LoansActions';
import Gauge from 'react-svg-gauge';
import styles from './Loans.css';

// Import Selectors
import { getLoans } from './LoansReducer';
import { getAllFilters } from './LoanFilterReducer';

class LoansPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  getColor(val) {
    if (val > 80) return 'green';
    if (val > 50) return 'gold';
    return 'red';
  }

  //Function to handle change in page
  handlePageClick = data => {
    let selectedPage = data.selected;
    this.props.dispatch(fetchData(selectedPage+1));
  }


  render() {
    const { loans } = this.props;
    let list;
    var filteredItems = [];

    //Filter items by industry
    if(this.props.filters.industryFilters){
      var toFilter;
      if(filteredItems.length === 0){
        toFilter = loans;
      }
      else{
        toFilter = filteredItems;
      }
      filteredItems = toFilter.filter(loan =>{
        return loan.industry === this.props.filters.industryFilters.val;
      });
    }

    //Filter items by health
    if(this.props.filters.healthFilters){
      var toFilter;
      if(filteredItems.length === 0){
        toFilter = loans;
      }
      else{
        toFilter = filteredItems;
      }
      filteredItems = toFilter.filter(loan =>{
        if(this.props.filters.healthFilters.val === "High"){
          return loan.health >= 80;
        }
        if(this.props.filters.healthFilters.val === "Medium"){
          return loan.health >= 50 && loan.health < 80;
        }
        if(this.props.filters.healthFilters.val === "Low"){
          return loan.health < 50;
        }

      });
    }

    // Display for loans
    if (loans && loans.length) {
      var temp = loans;
      if(filteredItems.length > 0){
        temp = filteredItems;
      }
      list = temp.map((loan, i) => {
        return (
          <div key={i} className={styles.loan}>
            <div className={styles.info}>
              <h2>{loan.name}</h2>
              <p>
                <b>Current Health:</b>
                <b style={{ color: this.getColor(loan.health) }}>
                  &nbsp; {loan.health}
                </b>
              </p>
              <p>
                <b>Industry:</b>
                &nbsp; {loan.industry}
              </p>
            </div>
            <div className={styles.graph}>
              <Gauge
                value={loan.health}
                color={this.getColor(loan.health)}
                width={150}
                height={150}
                label=""
              />
            </div>
          </div>
        );
      });
    }

    //Get all the category arrays needed for filtering options
    var industries = Array.from(new Set(loans.map(function(item){return item.industry})));
    var health = ["Low", "Medium", "High"];

    return (
      <div>
        <FilterDropdown
          industryOptions = {industries}
          healthOptions = {health}
        />
        {list}
        <div className={styles.reactpaginate}>
          <ReactPaginate
            marginPagesDisplayed = {2}
            pageRangeDisplayed= {5}
            pageCount = {10}
            onPageChange = {this.handlePageClick}
          />
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LoansPage.need = [() => { return fetchData(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loans: getLoans(state),
    filters: getAllFilters(state)
  };
}

LoansPage.propTypes = {
  loans: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoansPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LoansPage);
