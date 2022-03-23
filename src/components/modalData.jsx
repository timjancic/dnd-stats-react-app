import React, { Component } from 'react';
import ReactModal from 'react-modal';

class ModalData extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    this.props.onClose(); //close the modal automatically

    let reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    x().then(() => console.log("File " + event.target.files[0].name + " has been read!"))
      .then(() => {
        let rawArray = reader.result.split("\n");

        let dataTable = new Array(rawArray.length);

        //create a table of values from the info
        for (let i = 0; i < rawArray.length; i++) {
          dataTable[i] = JSON.parse(rawArray[i]);
        }

        this.props.onFileNameChange(event.target.files[0].name);
        this.props.onUpload(dataTable);
      })
      .catch(() => console.log("File took too long to read"));

    function x() {
      //This function waits for the reader to finish up to a maximum amount of time set by max
      return new Promise((resolve,reject) => {
        let i = 0;
        let max = 10;
        console.log("loading file");
        setInterval(() => {
          if (reader.readyState == 2) {
            clearInterval();
            resolve();
          } else if (i < max){
            console.log(reader.readyState,i);
            i++
          } else {
            clearInterval();
            reject();
          }
        }, 1000);
      });
    };
  };

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '20px',
            left: '20%',
            right: '20%',
            bottom: '20px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '40px'
          }
        }}
      >
        <div className="modal-header text-center">
          <h2 className="modal-title" >Upload your dice roll data</h2>
        </div>
        <div className="modal-body text-center">
          <input type="file" onChange={this.onFileChange} />
          <p>-or-</p>
          <div className="form-outline">
            <textarea className="form-control" id="textAreaExample" rows="4"></textarea>
            <label className="form-label" for="textAreaExample">Copy and past not working yet</label>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => this.props.onClose()}>Cancel</button>
        </div>
      </ReactModal>
    )
  }

}

export default ModalData;
