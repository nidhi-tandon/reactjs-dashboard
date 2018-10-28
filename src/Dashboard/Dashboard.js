import React, { Component } from 'react';
import './Dashboard.css';
import { Row, Col } from 'react-flexbox-grid';

import getDashboardData from './DashboardApiService';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DataCard from './components/DataCard';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import DataTable from './components/DataTable/DataTable';

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiAppBar: {
            // Name of the rule
            root: {
                // Some CSS
                backgroundColor: '#2196f3 !important',
            },
        },
    },
});

/**
 * Dashboard component to display the user interface
 */
class Dashboard extends Component {
    constructor(props) {
        super(props);

        /**
         * React's local state
         */
        this.state = {
            data: [],
            searchedData: {},
            clickedBatchArray: []
        };
        this.getData = this.getData.bind(this);
        this.showDocuments = this.showDocuments.bind(this);
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

    showDocuments(setId) {
        let clickedBatchArray = [];

        clickedBatchArray = this.state.data.find((batches) => {
            return batches.set_id === setId;
        });
        this.setState({
            clickedBatchArray
        })
    }

    render() {
        return (
          <div className="App" data-test="component-dashboard">
              <MuiThemeProvider theme={theme}>
                  <AppBar position="static">
                      <Toolbar>
                          <Typography variant="h6" color="inherit">
                              Dashboard
                          </Typography>
                      </Toolbar>
                  </AppBar>
              </MuiThemeProvider>
              {this.state.data &&
              <DataCard data={this.state.data}
                        showDocuments={this.showDocuments}
              />
              }

              <Row className="row text-center">
                  <Typography className="text-center">
                      <InfoIcon className=""/>
                      Click on Documents to get documents of a particular batch
                  </Typography>
              </Row>

              <Row>
                  {(this.state.clickedBatchArray && this.state.clickedBatchArray.documents) &&
                  <DataTable documents={this.state.clickedBatchArray.documents}/>
                  }
              </Row>


          </div>
        );
    }
}

export default Dashboard;
