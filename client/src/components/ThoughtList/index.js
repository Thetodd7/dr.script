import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({
  requestapps,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!requestapps.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {requestapps &&
        requestapps.map((requestapp) => (
          <div key={requestapp._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${requestapp.patientName}`}
                >
                  {requestapp.patientName} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {requestapp.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {requestapp.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{requestapp.patientText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${requestapp._id}`}
            >
              Join the discussion on this thought.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
