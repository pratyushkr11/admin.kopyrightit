import React from "react";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import "./FormModal.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const FormModal = (props) => {
  const { setIsOpen, contentLabel, isOpen, forms } = props;
  console.log(forms);
  function closeModal() {
    setIsOpen(false);
  }
  const [dairyNo, setDairyNo] = useState(forms.dairyNo);
  const [status, setStatus] = useState(forms.status);


  const enterDairyno = () => {
    // Call the API to update Dairy No
    updateDairyNo(forms._id, dairyNo);
  };

  const updateDairyNo = async (formId, dairyNo) => {
    try {
      const response = await axios.post('https://admin-backend-w47n.onrender.com/api/updateDairyNo', {
        formId: formId,
        dairyNo: dairyNo,
      });

      if (response.status === 200) {
        // Show a toast notification on success
        toast.success('Dairy No updated successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        console.error('Failed to update Dairy No');
      }
    } catch (error) {
      // console.error('Error updating Dairy No:', error);
      // Show a toast notification on error
      toast.error('Error updating Dairy No', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const updateStatus = async () => {
    const formId = forms._id
    try {
      const response = await axios.post('https://admin-backend-w47n.onrender.com/api/updateStatus', {
        formId: formId,
        status: status,
      });

      if (response.status === 200) {
        alert('Status updated successfully');
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  console.log(forms.keyValue.fileKey1)
  console.log(forms.keyValue.imageKey1)

  const openOrDownload = async (key, type) => {
    try {
      const response = await axios.get(`https://admin-backend-w47n.onrender.com/getURL`, {
        params: { key, type }, // Pass key and type as query parameters
      });

      const data = response.data;

      if (data.url) {
        window.open(data.url);
      } else {
        alert("URL not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  };


  return (
    <div>
      <Modal isOpen={isOpen} contentLabel={contentLabel}>
        <h2>
          <u>Form Details</u>
        </h2>
        <div className="admin-form-modal">
          <div className="admin_modal__form">
            <label htmlFor="option">
              <b>Dairy No: </b>
            </label>
            <input
              placeholder="Enter Dairy No"
              type="text"
              id="dairy-no"
              value={dairyNo}
              onChange={(e) => setDairyNo(e.target.value)}
            />
            <button onClick={enterDairyno}>Submit</button>
            <ToastContainer />
          </div>
          <div className="admin_modal__form">
            <label htmlFor="status">
              <b>Status: </b>
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Application Submitted">Application Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
            </select>

            <button onClick={updateStatus}>Update</button>
            <ToastContainer />
          </div>
          <div className="admin_modal__form">
            <label htmlFor="option">
              <b>What type of copyright are you registering? </b>
            </label>
            <input
              placeholder="Selected option"
              type="text"
              id="option"
              autoComplete="off"
              value={forms.form1.option}
              required
              disabled
            ></input>
          </div>
          <div className="admin_modal__form">
            <label htmlFor="name">
              <b>Applicant's Name: </b>
            </label>
            <input
              placeholder="Enter Your Full Name"
              type="text"
              id="name"
              autoComplete="off"
              required
              value={forms.form1.name}
              disabled
            ></input>
          </div>
          <div className="admin_modal__form">
            <label htmlFor="mail">
              <b>Applicant's Email ID: </b>
            </label>
            <input
              placeholder="Enter Your email"
              type="email"
              id="mail"
              autoComplete="off"
              required
              value={forms.form1.mail}
              disabled
            ></input>
          </div>
          <div className="admin_modal__form">
            <label htmlFor="address">
              <b>Applicant's Address: </b>
            </label>
            <input
              placeholder="Enter Your Address"
              type="text"
              id="address"
              autoComplete="off"
              required
              value={forms.form1.address}
              disabled
            ></input>
          </div>
          <div className="admin_modal__form">
            <label htmlFor="mobile">
              <b>Mobile Number: </b>
            </label>
            <input
              placeholder="+91-XXXXX-XXXXX"
              type="text"
              id="mobile"
              autoComplete="off"
              required
              value={forms.form1.mobile}
              disabled
            ></input>
          </div>
          <div className="location_data">
            <div>
              <label htmlFor="country">
                <b>Country: </b>
              </label>
              <input
                placeholder="Enter the country"
                type="text"
                id="country"
                autoComplete="off"
                required
                value={forms.form1.country}
                disabled
              ></input>
            </div>
            <div>
              <label htmlFor="state">
                <b>State: </b>
              </label>
              <input
                placeholder="Enter the state"
                type="text"
                id="state"
                autoComplete="off"
                required
                value={forms.form1.state}
                disabled
              ></input>
            </div>
          </div>
          <div className="location_data2">
            <div>
              <label htmlFor="city">
                <b>City: </b>
              </label>
              <input
                placeholder="Enter the City"
                type="text"
                id="city"
                autoComplete="off"
                required
                value={forms.form1.city}
                disabled
              ></input>
            </div>
            <div>
              <label htmlFor="zip">
                <b>Zip: </b>
              </label>
              <input
                placeholder="Enter the Zip Code"
                type="text"
                id="zip"
                autoComplete="off"
                required
                value={forms.form1.zip}
                disabled
              ></input>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="admin_modal__radio">
            <label htmlFor="isOriginalWork">
              <b>Is the work to be registered an original work?</b>
            </label>
            <p>
              <input
                id="isOriginalWork"
                value="yes"
                type="radio"
                disabled
                checked={forms.form2.isOriginalWork === true}
              />
              Yes
            </p>
            <p>
              <input
                id="isOriginalWork"
                value="no"
                type="radio"
                disabled
                checked={forms.form2.isOriginalWork === false}
              />{" "}
              No
            </p>
          </div>
          {forms.form2.isOriginalWork === "no" ? (
            <div className="conditional-conatiner text-center">
              <div className="admin_modal__form">
                <label htmlFor="workTranslation">
                  <b>Translation of the work in public domain: </b>
                </label>
                <input
                  placeholder="Enter details"
                  type="text"
                  id="workTranslation"
                  autoComplete="off"
                  required
                  value={forms.form2.workTranslation}
                  disabled
                />
              </div>
              <div className="admin_modal__form">
                <label htmlFor="workTranslationCopyright">
                  <b>Translation of the work in which copyright subsists: </b>
                </label>
                <input
                  placeholder="Enter details"
                  type="text"
                  id="workTranslationCopyright"
                  autoComplete="off"
                  required
                  value={forms.form2.workTranslationCopyright}
                  disabled
                />
              </div>
              <div className="admin_modal__form">
                <label htmlFor="workAdaption">
                  <b>An adaption of work in the public domain: </b>
                </label>
                <input
                  placeholder="Enter details"
                  type="text"
                  id="workAdaption"
                  autoComplete="off"
                  value={forms.form2.workAdaption}
                  disabled
                />
              </div>
              <div className="admin_modal__form">
                <label htmlFor="workAdaptionCopyright">
                  <b>An adaption of the work in which copyright subsists: </b>
                </label>
                <input
                  placeholder="Enter details"
                  type="text"
                  id="workAdaptionCopyright"
                  autoComplete="off"
                  required
                  value={forms.form2.workAdaptionCopyright}
                  disabled
                />
              </div>
            </div>
          ) : null}
        </div>
        <hr style={{ width: "100%" }} />
        <div>
          <div className="admin_modal__form3">
            <label htmlFor="particularsNatureOfWork">
              <b>
                Nature of the applicant's interest in the copyright of the work
              </b>
            </label>
            <input
              placeholder="Enter details"
              type="text"
              id="particularsNatureOfWork"
              autoComplete="off"
              required
              value={forms.form3.particularsNatureOfWork}
              disabled
            />
          </div>
          <div className="admin_modal__form3">
            <label htmlFor="particularsClassOfWork">
              <b>Class of the work</b>
            </label>
            <input
              placeholder="Enter details"
              type="text"
              id="particularsClassOfWork"
              autoComplete="off"
              required
              value={forms.form3.particularsClassOfWork}
              disabled
            />
          </div>
          <div className="admin_modal__form3">
            <label htmlFor="particularsDescription">
              <b>Description of the work</b>
            </label>
            <input
              placeholder="Enter details"
              type="text"
              id="particularsDescription"
              autoComplete="off"
              required
              value={forms.form3.particularsDescription}
              disabled
            />
          </div>
          <div className="admin_modal__form3">
            <label htmlFor="particularsTitle">
              <b>Title of the work</b>
            </label>
            <input
              placeholder="Enter title of work"
              type="text"
              id="particularsTitle"
              autoComplete="off"
              required
              value={forms.form3.particularsTitle}
              disabled
            />
          </div>
          <div className="admin_modal__form3">
            <label
              style={{ paddingTop: "12px" }}
              htmlFor="particularsLanguageOfWork"
            >
              <b>Language of the work</b>
            </label>
            <input
              placeholder="Enter language of work"
              type="language"
              id="particularsLanguageOfWork"
              autoComplete="off"
              required
              value={forms.form3.particularsLanguageOfWork}
              disabled
            />
          </div>
        </div>
        <div>
          <div className="admin_modal__radio">
            <label htmlFor="isAuthorAlive" style={{ paddingTop: "10px" }}>
              <b>Is the author alive?</b>
            </label>
            <p>
              <input
                id="isAuthorAlive"
                value="yes"
                type="radio"
                disabled
                checked={forms.form3.isAuthorAlive === true}
              />
              Yes
            </p>
            <p>
              <input
                id="isAuthorAlive"
                value="no"
                type="radio"
                disabled
                checked={forms.form3.isAuthorAlive === false}
              />{" "}
              No
            </p>
          </div>
          {forms.form3.isAuthorAlive === "yes" ? (
            <div className="admin-modal-yes__container">
              <div className="admin_modal__form3">
                <label htmlFor="particularsNameOfAuthor">
                  <b>Name of the author</b>
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  id="particularsNameOfAuthor"
                  autoComplete="off"
                  required
                  value={forms.form3.particularsNameOfAuthor}
                  disabled
                />
              </div>
              <div className="admin_modal__form3">
                <label htmlFor="particularsAddressOfAuthor">
                  <b>Address of the author</b>
                </label>
                <input
                  placeholder="Enter address"
                  type="text"
                  id="particularsAddressOfAuthor"
                  autoComplete="off"
                  required
                  value={forms.form3.particularsAddressOfAuthor}
                  disabled
                />
              </div>
              <div className="admin_modal__form3">
                <label htmlFor="particularsNationalityOfAuthor">
                  <b>Nationality of the author</b>
                </label>
                <input
                  placeholder="Enter details"
                  type="text"
                  id="particularsNationalityOfAuthor"
                  autoComplete="off"
                  required
                  value={forms.form3.particularsNationalityOfAuthor}
                  disabled
                />
              </div>
            </div>
          ) : (
            <div className="admin-modal-no__conatiner">
              <div className="admin_modal__form3">
                <label htmlFor="particularsDateOfDecease">
                  <b>Date of his Decease : </b>{" "}
                  {new Date(
                    forms.form3.particularsDateOfDecease
                  ).toLocaleDateString()}
                </label>
                {/* <input
                                    style={{ paddingRight: '10px' }}
                                    placeholder='Enter Date (DD/MM/YYYY)'
                                    type="date"
                                    id='particularsDateOfDecease'
                                    autoComplete="off"
                                    required
                                    value={new Date(forms.form3.particularsDateOfDecease).toLocaleDateString()}
                                    disabled
                                /> */}
              </div>
              <div className="admin_modal__form3">
                <label htmlFor="particularsNameOfAuthor">
                  <b>Name of the author</b>
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  id="particularsNameOfAuthor"
                  autoComplete="off"
                  required
                  value={forms.form3.particularsNameOfAuthor}
                  disabled
                />
              </div>
              <div className="admin_modal__form3">
                <label htmlFor="particularsAddressOfAuthor">
                  <b>Address of the author</b>
                </label>
                <input
                  placeholder="Enter address"
                  type="text"
                  id="particularsAddressOfAuthor"
                  autoComplete="off"
                  required
                  value={forms.form3.particularsAddressOfAuthor}
                  disabled
                />
              </div>
              <div className="admin_modal__form3">
                <label htmlFor="particularsNationalityOfAuthor">
                  <b>Nationality of the author</b>
                </label>
                <input
                  placeholder="Enter details"
                  type="text"
                  id="particularsNationalityOfAuthor"
                  autoComplete="off"
                  required
                  value={forms.form3.particularsNationalityOfAuthor}
                  disabled
                />
              </div>
            </div>
          )}
          <div>
            <div>
              <h3>File</h3>
              <button onClick={() => openOrDownload(forms.keyValue.fileKey1, "file")}>
                Open/Download File
              </button>
            </div>
            <div>
              <h3>Image</h3>
              <button onClick={() => openOrDownload(forms.keyValue.imageKey1, "image")}>
                Open/Download Image
              </button>
            </div>
          </div>
        </div>
        <div className="btn-closeModal">
          <Button
            onClick={closeModal}
            variant="contained"
            size="medium"
            sx={{ width: "180px" }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FormModal;
