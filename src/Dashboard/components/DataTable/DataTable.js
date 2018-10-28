import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';

import '../../Dashboard.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


/**
 * DataCard component to display the user data
 */
class DataTable extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
          <Row>
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
                          {this.props.documents.map((batches) => {
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
              </Paper>
          </Row>
        );
    }
}

DataTable.propTypes = {
    documents: PropTypes.array.isRequired,
};

export default DataTable;
