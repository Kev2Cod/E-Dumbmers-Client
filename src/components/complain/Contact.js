import React from "react";
import Image from "../../assets/img/profile-admin-circle-icon.png";

const Contact = ({ dataContact, clickContact, contact }) => {
  return (
    <>
      {dataContact.length !== 0 && (
        <div className="d-grid mt-4">
          {dataContact.map((item) => (
            <button key={item.id} onClick={() => clickContact(item)} className="btn-dark d-flex align-items-center p-3 rounded mb-2">
              <img className="rounded-circle icon-profile-circle" src={Image} alt="Profile" />
              <div className="ms-3 text-start">
                <span className="d-block text-light fw-bold">{item.name}</span>
                <span className="d-block text-small  text-var-gray">{item.message}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Contact;
