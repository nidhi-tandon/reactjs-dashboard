import React, { Component } from 'react';
import './Dashboard.css';
import { Row, Col } from 'react-flexbox-grid';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import CancelIcon from '@material-ui/icons/Cancel';

import getDashboardData from './DashboardApiService';
import DataCard from './components/DataCard';
import DataTable from './components/DataTable/DataTable';
import CardComponent from './components/DataCard/components/Card/CardComponent';

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
        MuiButton: { // Name of the component ⚛️ / style sheet
            root: { // Name of the rule
                color: 'white', // Some CSS
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
            searchedData: '',
            clickedBatchArray: [],
            searchText: '',
            anchorOrigin: null
        };
        this.getData = this.getData.bind(this);
        this.showDocumentsBySetId = this.showDocumentsBySetId.bind(this);
        this.handleInputFieldOnChange = this.handleInputFieldOnChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.clearTableData = this.clearTableData.bind(this);
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

    handleInputFieldOnChange(event) {
        this.setState({
            searchText: event.target.value,
            clickedBatchArray: [],
        }, () => {
            this.searchDataByValue(this.state.searchText)
        })
    }

    handleClick(event) {
        this.setState({
            anchorOrigin: event.currentTarget
        });
    };

    handleOnClickSortBy(value) {
        this.handleClose();
        this.sortDataByFieldName(value);
    }

    handleClose() {
        this.setState({
            anchorOrigin: null
        });
    };

    clearTableData() {
        this.setState({
            clickedBatchArray: []
        })
    }

    /**
     * searchDataByValue searches the data from our state based on the value provided
     * @param {String} value
     */
    searchDataByValue(value) {
        this.state.data.forEach((object) => {
            for ( let objectValue of Object.values(object) ) {
                if ( String(objectValue) === value ) {
                    this.setState({
                        searchedData: object
                    });
                    return
                }
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

    /**
     * function to show the documents list in the UI by setting the state
     * @param setId
     */
    showDocumentsBySetId(setId) {
        let clickedBatchArray = [];

        this.setState({
            clickedBatchArray
        }, () => {
            clickedBatchArray = this.state.data.find((batches) => {
                return batches.set_id === setId;
            });
            this.setState({
                clickedBatchArray
            })
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
                          <div className="grow"/>
                          <div className="menu-container">
                              <Button
                                aria-owns={this.state.anchorOrigin ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                data-test="sort-button"
                              >
                                  Sort By
                              </Button>
                              <MuiThemeProvider theme={theme}>
                                  <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorOrigin}
                                    open={Boolean(this.state.anchorOrigin)}
                                    onClose={this.handleClose}
                                  >
                                      <MenuItem onClick={this.handleOnClickSortBy.bind(this, 'set_id')}>
                                          Set Id
                                      </MenuItem>
                                      <MenuItem onClick={this.handleOnClickSortBy.bind(this, 'batch_id')}>
                                          Batch Id
                                      </MenuItem>
                                      <MenuItem onClick={this.handleOnClickSortBy.bind(this, 'name')}>
                                          Name
                                      </MenuItem>
                                      <MenuItem
                                        onClick={this.handleOnClickSortBy.bind(this, 'status')}>
                                          Status
                                      </MenuItem>
                                  </Menu>
                              </MuiThemeProvider>
                          </div>
                          <div className="search" data-test="search-button">
                              <div className="search-icon">
                                  <SearchIcon/>
                              </div>
                              <InputBase
                                placeholder="Search…"
                                className="search-text"
                                onChange={this.handleInputFieldOnChange}
                              />
                          </div>
                      </Toolbar>
                  </AppBar>
              </MuiThemeProvider>

              {(this.state.searchText && this.state.searchedData) ?
                <Row>
                    <Col xs={12}>
                        <Row center="xs" className="searched-data">
                            <CardComponent data={this.state.searchedData}
                                           showDocuments={this.showDocumentsBySetId}
                                           key={this.state.searchedData.set_id}
                            />
                        </Row>
                    </Col>
                </Row>
                :
                (this.state.data &&
                  <DataCard data={this.state.data}
                            showDocumentsBySetId={this.showDocumentsBySetId}
                            searchedData={this.state.searchedData}
                  />
                )
              }


              {(this.state.clickedBatchArray && this.state.clickedBatchArray.documents) ?
                <Row>
                    <Col xs={12}>
                        <Row center="xs" className="table-padding">
                            <Col xs={12}>
                                <div>
                                    <CancelIcon onClick={this.clearTableData}/>
                                    <DataTable documents={this.state.clickedBatchArray.documents}/>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                :

                <Row className="info-row">
                    <Col xs={12}>
                        <Row center="xs">
                            <Col xs={6}>
                                <Typography className="text-center">
                                    <InfoIcon className="icon"/>
                                    <div className="info-text">
                                        Click on Documents to get documents of a particular batch
                                    </div>
                                </Typography>
                            </Col>
                        </Row>
                    </Col>
                </Row>
              }

          </div>
        );
    }
}

export default Dashboard;
