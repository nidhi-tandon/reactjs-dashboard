//
//  Card
//  react-js-dashboard
//
//  Created by nidhitandon on 28/10/18 1:23 PM
//  Copyright © 2018 react-js-dashboard. All rights reserved.
//
//  Keep up the good work :)
//


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';
import CalenderIcon from '@material-ui/icons/CalendarToday';

import '../../../../Dashboard.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

/**
 * Card component to display the user data as a Card
 */
class CardComponent extends Component {

    showDocuments(setId) {
        this.props.showDocuments(setId)
    }

    render() {
        return (

          <Col xs={4} key={this.props.key}>
              <Card>
                  <CardContent>
                      <Typography gutterBottom>
                          <AccountBoxIcon className="icon"/>
                          <div className="title">
                              Name:
                          </div>
                          <div className="text">
                              {this.props.data.name}
                          </div>
                      </Typography>

                      <Typography gutterBottom>
                          <AssignmentIcon className="icon"/>
                          <div className="title">
                              Set Id:
                          </div>
                          <div className="text">
                              {this.props.data.set_id}
                          </div>
                      </Typography>

                      <Typography gutterBottom>
                          <InfoIcon className="icon"/>
                          <div className="title">
                              Status:
                          </div>
                          <div className="text">
                              {this.props.data.status}
                          </div>
                      </Typography>

                      <Typography gutterBottom>
                          <CalenderIcon className="icon"/>
                          <div className="title">
                              Uploading Date:
                          </div>
                          <div className="text">
                              {this.props.data.date_uploaded}
                          </div>
                      </Typography>

                  </CardContent>

                  <CardActions>
                      <Button size="small"
                              className="button"
                              color="primary"
                              onClick={this.showDocuments.bind(this, this.props.data.set_id)}>
                          Documents
                      </Button>
                  </CardActions>
              </Card>
          </Col>

        );
    }
}

Card.propTypes = {
    data: PropTypes.array.isRequired,
    showDocuments: PropTypes.func,
    key: PropTypes.number
};

export default CardComponent;
