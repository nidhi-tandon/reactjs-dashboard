import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';
import CalenderIcon from '@material-ui/icons/CalendarToday';

import '../../Dashboard.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

/**
 * DataCard component to display the user data
 */
class DataCard extends Component {
    constructor(props) {
        super(props);
    }

    showDocuments(setId) {
        this.props.showDocuments(setId)
    }

    render() {
        return (
          <Row className="row">
              {this.props.data.map((batches, index) => {
                  return (
                    <Col xs={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom>
                                    <AccountBoxIcon className="icon"/>
                                    <div className="title">
                                        Name:
                                    </div>
                                    <div className="text">
                                        {batches.name}
                                    </div>
                                </Typography>

                                <Typography gutterBottom>
                                    <AssignmentIcon className="icon"/>
                                    <div className="title">
                                        Set Id:
                                    </div>
                                    <div className="text">
                                        {batches.set_id}
                                    </div>
                                </Typography>

                                <Typography gutterBottom>
                                    <InfoIcon className="icon"/>
                                    <div className="title">
                                        Status:
                                    </div>
                                    <div className="text">
                                        {batches.status}
                                    </div>
                                </Typography>

                                <Typography gutterBottom>
                                    <CalenderIcon className="icon"/>
                                    <div className="title">
                                        Uploading Date:
                                    </div>
                                    <div className="text">
                                        {batches.date_uploaded}
                                    </div>
                                </Typography>

                            </CardContent>

                            <CardActions>
                                <Button size="small"
                                        className="button"
                                        onClick={this.showDocuments.bind(this, batches.set_id)}>
                                    Documents
                                </Button>
                            </CardActions>
                        </Card>
                    </Col>
                  )
              })}
          </Row>
        );
    }
}

DataCard.propTypes = {
    data: PropTypes.array.isRequired,
    showDocuments: PropTypes.func
};

export default DataCard;
