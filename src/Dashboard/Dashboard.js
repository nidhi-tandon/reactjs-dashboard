import React, { Component } from 'react';
import './Dashboard.css';
import getDashboardData from './DashboardApiService';


/**
 * Dashboard component tp display the user interface
 */

class Dashboard extends Component {
    constructor(props) {
        super(props);
        /**
         * React's local state
         */

        this.state = {
            data: [],
            searchedData: {}
        };
    }

    /**
     * React's life cycle method which is called when the DOM mounts
     */
    componentDidMount() {
        this.getData();
    }

    /**
     * getData method to fetch dashboard data from an api and save the response in a state.
     */
    getData() {
        getDashboardData().then((response) => {
            this.setState({
                data: response.data
            })
        }).catch((error) => {

        })
    }

    /**
     * searchDataByValue searches the data from our state based on the value provided
     * @param {String} value
     */
    searchDataByValue(value) {
        this.state.data.forEach((object) => {
            if ( Object.values(object).indexOf(value) > -1 ) {
                this.setState({
                    searchedData: object
                })
            }
        })
    }

    /**
     * sortDataByFieldName sorts the data in alphabetical order
     * @param {String} fieldName
     */
    sortDataByFieldName(fieldName) {
        let sortedData = this.state.data.sort((a, b) => {
            let aData = String(a[fieldName]).toLowerCase();
            let bData = String(b[fieldName]).toLowerCase();
            return ((aData < bData) ? -1 : ((aData > bData) ? 1 : 0));
        });
        console.log(sortedData)
    }

    render() {
        return (
          <div className="App" data-test="component-dashboard">
              <header className="App-header">
                  <div onClick={this.sortDataByFieldName.bind(this, 'status')}>
                      Edit <code>src/App.js</code> and save to reload.
                  </div>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      Learn React
                  </a>
              </header>
          </div>
        );
    }
}

export default Dashboard;
