/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
import axios from 'axios';
import React, { useEffect } from 'react';
import ContentFieldContainer from '../ContentFieldContainer';
import './ContentBuilder.css';
import Modal from '../Modal';

function ContentBuilder() {
  const [contentTypes, setContentTypes] = React.useState([]);
  const [contentStructure, setContentStructure] = React.useState([]);
  const [selectedContentType, setSelectedContentType] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [newContentType, setNewContentType] = React.useState('');
  const handleChange = (e) => {
    setNewContentType(e.target.value);
  };

  const handleClick = () => {
    axios.post('http://localhost:4000/api/content-type/save', {
      contentType: newContentType,
      userId: 1,
    }, {
      headers: { authorization: localStorage.getItem('accessToken') },
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };
  function openModal() {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/content-type/all/1', {
      headers: { authorization: localStorage.getItem('accessToken') },
    }).then((res) => {
      console.log(res.data.allContentTypes);
      setContentTypes(res.data.allContentTypes);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  const handleClicks = (contentType) => {
    setSelectedContentType(contentType);
    axios.get(
      `http://localhost:4000/api/content-type/${contentType}/1`,
      {
        headers: { authorization: localStorage.getItem('accessToken') },
      },
    ).then((res) => {
      setContentStructure(res.data.contentStructure);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <div className="contentBuilderHeader">
        <h1>Content Types</h1>
      </div>
      <div className="contentContainer">
        <div className="contentTypes">
          <div className="captions">
            <span>
              {
              contentTypes && contentTypes.length
              }
              Types
            </span>
            <i className="fas fa-search" />
          </div>
          <div className="names">
            <button className="newItem" onClick={openModal}>
              <i className="fas fa-plus" />
              <span>New Item</span>
            </button>
            <Modal
              showModal={showModal}
              closeModal={closeModal}
            >
              <form onSubmit={handleClick}>
                <div className="">
                  Create a new Content Type
                </div>
                <input type="text" onChange={handleChange} />
                <input type="submit" />
              </form>
            </Modal>
          </div>
          <div className="ContentTypesButton">
            {contentTypes && contentTypes.map((contentType) => (
              <div
                className="items"
                key={contentType.id}
                id={contentType.id}
                onClick={() => handleClicks(contentType.contentType)}
              >
                {contentType.contentType}
              </div>
            ))}
          </div>
        </div>
        <ContentFieldContainer
          contentStructure={contentStructure}
          setContentStructure={setContentStructure}
          selectedContentType={selectedContentType}

        />
      </div>
    </>
  );
}

export default ContentBuilder;
