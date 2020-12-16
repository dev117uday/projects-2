import React, { Fragment, useState } from 'react';
import Modal from '../layouts/Modal';
import axios from 'axios';

const Home = () => {
  const [token, setToken] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenV, setIsOpenV] = useState(false);
  const [upFileName, setUpFileName] = useState('');
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [acc, setAcc] = useState(0);
  const [byToken, setByToken] = useState('');
  const [objData, setObjData] = useState({ data: '' });

  //Token Request
  const getToken = async () => {
    const res = await axios.get(
      'https://deepchain.herokuapp.com/generate_token',
      { method: 'POST' }
    );
    setToken(res.data.token);
    setData(null);
  };

  // Uploading Data
  const uploadVideo = async (e) => {
    e.preventDefault();

    await getToken();

    setData('');
    setAcc(0);

    const config = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      },
    };

    var myHeaders = new Headers();
    var formdata = new FormData();
    formdata.append('file', file);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://deepchain.herokuapp.com/save_video', requestOptions, config)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result).Transcript);
        setAcc(JSON.parse(result).Confidence);
      })
      .catch((error) => console.log('error', error));
  };

  // GEtting Data
  const getData = async (e) => {
    e.preventDefault();

    var requestOptions = {
      method: 'GET',
    };

    fetch(
      'https://deepchain.herokuapp.com/by_token/59dde6eb-5bec-4d7f-830a-3225d39f0c69',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setObjData(JSON.parse(result));
        console.log(objData);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <Fragment>
      <div className="home container">
        <p className="home__content">
          <span className="home__h1">DeepChain</span>is a web app
          <br />
          which detects fake news.
        </p>

        <div className="home__buttons">
          <div className="btn__group">
            <button
              className="btn btn--blue"
              onClick={() => {
                setIsOpen(true);
                getToken();
              }}
            >
              <svg viewBox="0 0 56.047 63.578">
                <g id="layer1" transform="translate(-5.998 -1045.37)">
                  <g id="g6148-2" transform="translate(5.998 1045.37)">
                    <path
                      id="path6724-4"
                      d="M30.017,1.008,4.051,9.986l-2.036.707H2V54.985h.059l-.05.152,2.028.723,24.46,8.726,27.472-9.138,2.045-.682L58,54.741V49.869l.034-.093L58,49.768V11.282l.042-.118-2.019-.732ZM27.846,6.317V40.639L6.306,47.867v-34.1Zm4.308.042,21.54,7.808V48.245l-21.54-7.59ZM29.984,44.467l22.028,7.758-23.467,7.8L6.752,52.259Z"
                      transform="translate(-1.998 -1.008)"
                      fill="#fff"
                      fillRule="evenodd"
                    />
                  </g>
                </g>
              </svg>
            </button>
            <p className="btn__text">Create a Token</p>
          </div>

          <div className="btn__group">
            <button
              className="btn btn--green"
              onClick={() => {
                setIsOpenV(true);
              }}
            >
              <svg viewBox="0 0 77 44.215">
                <path
                  id="Icon_4_"
                  d="M58.289,113.619,53.653,109,32.622,129.952l4.637,4.62ZM72.364,109,37.258,143.811,23.514,130.118l-4.636,4.619,18.38,18.478L77,113.619ZM0,134.737l18.546,18.478,4.636-4.619L4.8,130.118Z"
                  transform="translate(0 -109)"
                  fill="#fff"
                />
              </svg>
            </button>
            <p className="btn__text">Verify Data</p>
          </div>
        </div>

        <svg className="home__bg" viewBox="0 0 1371.667 466.528">
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="0.5"
              x2="0.5"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="#23ffa0" />
              <stop offset="1" stopColor="#23c3ff" />
            </linearGradient>
          </defs>
          <path
            id="Path_33"
            data-name="Path 33"
            d="M0,1522.667S180,1452,546,1370s820.667-115.333,820.667-115.333v458.667L0,1716Z"
            transform="translate(2.5 -1251.977)"
            stroke="#fff"
            strokeWidth="5"
            opacity="0.2"
            fill="url(#linear-gradient)"
          />
        </svg>
      </div>

      {/* Create Token Modal */}

      {isOpen && (
        <Modal open={isOpen}>
          <div
            className="modal__close"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &times;
          </div>
          <div className="modal__group">
            <p className="modal__head">Your Token is here...</p>
            {token === '' ? (
              <p className="modal__op-text">Loading...</p>
            ) : (
              <p className="modal__op-text">{token}</p>
            )}
          </div>
          <div className="modal__group">
            <p className="modal__head">Upload your file below!</p>
            <input
              type="file"
              name="token"
              id="token"
              className="modal__input"
              // accept=".mp3,.mp4"
              onChange={(e) => {
                setUpFileName(e.target.files[0].name);
                setFile(e.target.files[0]);
                // console.log(e.target.files[0]);
              }}
            />
            {upFileName === '' ? (
              <label htmlFor="token" className="modal__label">
                Upload your file
              </label>
            ) : (
              <label htmlFor="token" className="modal__label">
                {upFileName}
              </label>
            )}
          </div>

          {data !== ('' || null) && (
            <div
              className="modal__group"
              style={{ marginTop: '2rem', lineHeight: '1.5' }}
            >
              <p className="modal__text">
                Grenerated Transcript : <br />
                {data} <br />
                Accuracy : {acc}
              </p>
            </div>
          )}

          {data === null ? (
            <button onClick={uploadVideo} className="btn btn--purple">
              Upload
            </button>
          ) : (
            <button onClick={uploadVideo} className="btn btn--purple">
              {data === '' ? 'Please Wait...' : 'Done!'}
            </button>
          )}
        </Modal>
      )}

      {/* Create Token Modal */}

      {isOpenV && (
        <Modal open={isOpenV}>
          <div
            className="modal__close"
            onClick={() => {
              setIsOpenV(false);
            }}
          >
            &times;
          </div>
          <div className="modal__group">
            <label htmlFor="byToken" className="modal__head">
              Enter Your Token
            </label>
            <input
              type="text"
              name="byToken"
              id="byToken"
              className="modal__input-text"
              placeholder="Enter Your Token"
              value={byToken}
              onChange={(e) => {
                e.target.name = e.target.value;
                setByToken(e.target.value);
              }}
            />
          </div>
          <div className="modal__group">
            <label htmlFor="byTokenData">Data</label>
            <input
              type="text"
              name="byTokenData"
              id="byTokenData"
              className="modal__input-text"
              placeholder="Enter Token to get data"
              value={objData.data}
              readOnly
            />
          </div>
          <div className="modal__group">
            <label htmlFor="byTokenHash">hash</label>
            <input
              type="text"
              name="byTokenHash"
              id="byTokenHash"
              className="modal__input-text"
              placeholder="Enter Token to get data"
              value={objData.hash}
              readOnly
            />
          </div>
          <div className="modal__group">
            <label htmlFor="byTokenNonce">Nonce</label>
            <input
              type="text"
              name="byTokenNonce"
              id="byTokenNonce"
              className="modal__input-text"
              placeholder="Enter Token to get data"
              value={objData.nonce}
              readOnly
            />
          </div>
          <div className="modal__group">
            <label htmlFor="byTokenPHash">Previous Hash</label>
            <input
              type="text"
              name="byTokenPHash"
              id="byTokenPHash"
              className="modal__input-text"
              placeholder="Enter Token to get data"
              value={objData.revious_hash}
              readOnly
            />
          </div>
          <button onClick={getData} className="btn btn--purple">
            Send
          </button>
        </Modal>
      )}
    </Fragment>
  );
};

export default Home;
