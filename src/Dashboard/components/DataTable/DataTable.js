import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../Dashboard.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

/**
 * DataCard component to display the user data in the form of a table
 */
class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage(event, page) {
        this.setState({
            page
        });
    };

    render() {
        let { page, rowsPerPage } = this.state;
        return (
          <Paper>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell numeric>Set Id</TableCell>
                          <TableCell numeric>Document Id</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Uploader</TableCell>
                          <TableCell>Preview URL</TableCell>
                          <TableCell>Date Uploaded</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {this.props.documents
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((batches) => {
                            return (
                              <TableRow key={batches.set_id}>
                                  <TableCell component="th" scope="row">
                                      {batches.set_id}
                                  </TableCell>
                                  <TableCell numeric>
                                      {batches.doc_id}
                                  </TableCell>
                                  <TableCell numeric>
                                      {batches.name}
                                  </TableCell>
                                  <TableCell numeric>
                                      {batches.status}
                                  </TableCell>
                                  <TableCell>
                                      {batches.uploader}
                                  </TableCell>
                                  <TableCell numeric>
                                      {batches.preview_url}
                                  </TableCell>
                                  <TableCell numeric>
                                      {batches.date_uploaded}
                                  </TableCell>
                              </TableRow>
                            );
                        })
                      }
                  </TableBody>
              </Table>

              <TablePagination
                count={10}
                rowsPerPage={5}
                page={this.state.page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
              />
          </Paper>
        );
    }
}

DataTable.propTypes = {
    documents: PropTypes.array.isRequired,
};

export default DataTable;
