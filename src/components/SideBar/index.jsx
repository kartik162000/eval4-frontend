/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './SideBar.css';
import makeRequest from '../../utils/makeRequest';
import { BACKEND_URL, GET_COLLECTION_VALUES } from '../../constants/apiEndPoints';

function SideBar(props) {
  const handleBuilder = () => {
    props.handleCollection(false);
    props.handleBuilder(true);
  };
  const handleClick = (collectionType) => {
    props.setWhichCollection(collectionType);
    props.handleCollection(true);
    props.handleBuilder(false);
    makeRequest(BACKEND_URL, GET_COLLECTION_VALUES(1, collectionType), { headers: { authorization: localStorage.getItem('accessToken') } })
      .then((res) => {
        console.log(res.data.allFields);
        props.setCollectFields(res.data.allFields);
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="OuterContainer">
      <div className="sideHeader">
        <h1>CMS+</h1>
      </div>
      <div className="sideBody">
        <div className="sideBodySearch">
          <div className="text">
            <h3>Collection Types</h3>
          </div>
          <div className="search">
            <i className="fas fa-search" />
          </div>
        </div>
        <div className="collectionTypes">
          <ul>
            {props.data.map((collectionType) => (
              <li onClick={() => { handleClick(collectionType); }}>
                {collectionType}
              </li>
            ))}
          </ul>
        </div>
        <div className="contentTypeBuilder">
          <h3 onClick={handleBuilder}>Content Type Builder</h3>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
