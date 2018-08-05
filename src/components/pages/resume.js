import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.noworker';
import doc from '../../Assets/doc/resumePS.pdf';

class Resume extends Component {
  state = {
    numPages: 1,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div className="pdf">
        <Document
          file={doc}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    );
  }
}

export default Resume;