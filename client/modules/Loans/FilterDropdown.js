import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { storeIndustryFilter, storeHealthFilter } from './LoansActions'
import styles from './Loans.css';

class FilterDropdown extends Component {
  changeOption (filterType, e) {
    var val = e.target.value;
    //val is the type from the dropdown. filterType is the high level category. e.g. industry
    if(filterType==="industry"){
      this.props.dispatch(storeIndustryFilter({filterType, val}));
    }
    if(filterType==="health"){
      this.props.dispatch(storeHealthFilter({filterType, val}));
    }
  }

  render(){
    return (
      <div className = {styles.filteroptions}>
        <div className = {styles.filteroption}>
          <label className = {styles.filterlabel}>Industry</label>
          <select id="industry" value={this.props.industry} onChange={this.changeOption.bind(this, 'industry')}>
          {this.props.industryOptions.map(function(option) {
            return ( <option key={option} value={option}>{option}</option> )
          })}
          </select>

          <label className = {styles.filterlabel} >Health</label>
          <select id="health" value={this.props.health} onChange={this.changeOption.bind(this, 'health')}>
          {this.props.healthOptions.map(function(option) {
            return ( <option key={option} value={option}>{option}</option> )
          })}
          </select>

        </div>
      </div>
    )
  }
}

FilterDropdown.need = [() => { return storeIndustryFilter(), storeHealthFilter(); }];

function mapStateToProps(state){
  return {
    industryFilters: storeIndustryFilter(state),
    healthFilters: storeHealthFilter(state)
  }
}

export default connect(mapStateToProps)(FilterDropdown);
