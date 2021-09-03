import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [patientText, setpatientText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addRequestapp, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addRequestapp } }) {
      try {
        const { requestapps } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { requestapps: [addRequestapp, ...requestapps] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, requestapps: [...me.requestapps, addRequestapp] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    

    try {
      const { data } = await addRequestapp({
        variables: {
          patientText,
          patientName: Auth.getProfile().data.username,
        },
      });

      setpatientText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'patientText' && value.length <= 280) {
      setpatientText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3> Schedule Appointment </h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="patientText"
                placeholder="Describe your Symptoms..."
                value={patientText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
               Submit
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
           Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
