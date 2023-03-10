/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import './ContentFieldContainer.css';
import axios from 'axios';
import Modal from '../Modal';

export default function ContentFieldContainer(props) {
  const [formData, setFormData] = useState({ name: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, type } = formData;
    console.log(name, type);
    const obj = {};
    obj[name] = type;
    console.log(obj);
    axios.patch(`http://localhost:4000/api/content-type/update/${props.selectedContentType}`, { contentStructure: obj, headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}}` } }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  function openModal() {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="contains">
      <div className="name">
        <h1>{props.selectedContentType}</h1>
        <i className="fas fa-edit" />
      </div>

      <div className="fieldLength">
        <h2>
          {props.contentStructure && Object.keys(props.contentStructure).length}
        </h2>
      </div>
      <div className="bodies">
        <div className="addField" onClick={openModal}>
          Add another Field
        </div>
        <Modal
          showModal={showModal}
          closeModal={closeModal}
        >
          <div className="">
            Create a new Content Type
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            <input type="text" name="type" value={formData.type} onChange={handleChange} />
            <button type="submit"> Submit </button>
          </form>
        </Modal>
        {
          props.contentStructure
          && Object.entries(props.contentStructure).map((field) => (
            <div className="fieldRow">
              <div className="fieldIcon" style={{ backgroundColor: '#7691ff' }}>
                <span>Ab</span>
              </div>
              <div className="fieldValueContainer">
                <div className="fieldTitle">
                  {field[0]}
                </div>
                <div className="fieldType">
                  {field[1]}
                </div>
                <div className="icons">
                  <i className="fas fa-edit" />
                  <i className="fas fa-trash" />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
