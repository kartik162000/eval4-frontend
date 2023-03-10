/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import axios from 'axios';
import './CollectionType.css';
import Modal from '../Modal';

function CollectionType(props) {
  const checkData = () => {
    if (props.collectFields.length !== 0) {
      return (
        props.collectFields.map((field, index) => (
          Object.keys(field).map((key) => (
            index === 0 ? (
              <div className="tableType">
                {key}
              </div>
            ) : null
          ))
        ))
      );
    }
    return (
      <div className="tableType">
        No Data
      </div>
    );
  };
  const obj = {};
  for (let i = 0; i < props.collectFields.length; i += 1) {
    if (i === 0) {
      Object.keys(props.collectFields[0]).forEach((key) => {
        obj[key] = '';
      });
    }
  }
  const [userId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState(obj);
  function openModal() {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setCollectFields((prev) => [...prev, formValues]);
    axios.post('http://localhost:4000/api/collection/save', {
      userId,
      Collection_Value: formValues,
      contentType: props.whichCollection,
      headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="outer">
      <div className="header">
        <h1>{props.whichCollection}</h1>
      </div>
      <div className="body">
        <div className="bodyHeader">
          <h1>
            {props.collectFields.length}
            Entries Found
          </h1>
          <div className="newEntry" onClick={openModal}>
            Add a new Entry
          </div>
          <Modal showModal={showModal} closeModal={closeModal}>
            <form onSubmit={handleSubmit}>
              <div className="modalHeader">
                {
              props.collectFields.map((field, index) => (
                Object.keys(field).map((key) => (
                  index === 0 ? (
                    <div>
                      {key}
                      <input type={key} onChange={handleInputChange} name={key} value={formValues.key} />
                    </div>
                  ) : null
                ))
              ))
              }
                <button type="submit">Add</button>
              </div>
            </form>
          </Modal>
        </div>
        <div className="table">
          <div className="tableTypes">
            <div className="tableTags">
              {
                checkData()
              }
            </div>
            <div className="actions">
              Actions
            </div>
          </div>
          {
            props.collectFields.map((field) => (
              <div className="tableRow">
                <div className="tableTags">
                  {
                  Object.values(field).map((values) => (
                    <div className="tableType">
                      {values}
                    </div>
                  ))
            }
                </div>
                <div className="actionIcons">
                  <i className="fas fa-copy" />
                  <i className="fas fa-edit" />
                  <i className="fas fa-trash-alt" />
                </div>
              </div>
            ))
        }
        </div>
      </div>
    </div>
  );
}
export default CollectionType;
