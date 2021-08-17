import React from 'react';
import { FaSadCry } from 'react-icons/fa';

export default class Alert extends React.Component {
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog bg-white">
            <div className="modal-header">
              <h5
                className="modal-title text-success text-center"
                id="exampleModalLabel"
              >
                Aviso Estoque!
              </h5>
              <FaSadCry className="fs-1 text-success" />
            </div>
            <div className="modal-body text-center">
              Estoque do produto chegou no limite
            </div>
          </div>
        </div>
      </div>
    );
  }
}
