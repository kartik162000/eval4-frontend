import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import makeRequest from '../../utils/makeRequest';
import { GET_COLLECTIONS, BACKEND_URL } from '../../constants/apiEndPoints';
import CollectionType from '../../components/CollectionType';
import ContentBuilder from '../../components/ContentBuilder';
import './Home.css';

function Home() {
  const [isCollectionClicked, setIsCollectionClicked] = useState(false);
  const [isContentTypeBuilderClicked, setIsContentTypeBuilderClicked] = useState(true);
  const [whichCollection, setWhichCollection] = useState('');
  const [collectionTypes, setCollectionTypes] = useState([]);
  const [collectFields, setCollectFields] = useState([]);
  const [dataHeader, setDataHeader] = useState([]);

  useEffect(() => {
    makeRequest(BACKEND_URL, GET_COLLECTIONS(1), { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
      .then((res) => {
        setCollectionTypes(res.contentType);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/content-type/${whichCollection}/1`, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } }).then((res) => {
      console.log(res.data.contentStructure);
      setDataHeader(res.data.contentStructure);
    });
  }, [whichCollection]);

  const renderPage = () => {
    if (isCollectionClicked) {
      return (
        <CollectionType
          collectFields={collectFields}
          setCollectFields={setCollectFields}
          whichCollection={whichCollection}
          dataHeader={dataHeader}
        />
      );
    }
    if (isContentTypeBuilderClicked) {
      return <ContentBuilder />;
    }
    return null;
  };

  return (
    <div className="container">
      <SideBar
        isCollectionClicked={isCollectionClicked}
        handleCollection={setIsCollectionClicked}
        isContentTypeBuilderClicked={isContentTypeBuilderClicked}
        handleBuilder={setIsContentTypeBuilderClicked}
        setCollectFields={setCollectFields}
        setWhichCollection={setWhichCollection}
        data={collectionTypes}
      />
      <div className="sideContent">
        {renderPage()}
      </div>
    </div>
  );
}
export default Home;
