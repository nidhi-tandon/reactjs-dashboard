import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-flexbox-grid';

import '../../Dashboard.css';
import CardComponent from './components/Card/CardComponent';

/**
 * DataCard component to display the user data
 */
class DataCard extends Component {
    constructor(props) {
        super(props);
        this.showDocuments = this.showDocuments.bind(this);
    }

    showDocuments(setId) {
         this.props.showDocumentsBySetId(setId)
    }

    render() {
        return (
          <Row className="row-padding">
              {this.props.data.map((batches) => {
                  return (
                    <CardComponent data={batches}
                                   key={batches.set_id}
                                   showDocuments={this.showDocuments}
                    />
                  )
              })}
          </Row>
        );
    }
}

DataCard.propTypes = {
    data: PropTypes.array.isRequired,
    showDocumentsBySetId: PropTypes.func
};

export default DataCard;
