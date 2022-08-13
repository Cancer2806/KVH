import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useMutation } from '@apollo/client';

import { ADD_AMENITY } from '../../utils/mutations';
import { VIEW_AMENITIES } from '../../utils/queries';

export default function AmenityForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const [addAmenity] = useMutation(ADD_AMENITY, {
    variables: { amenityName: name, amenityDescription: description, amenityType: type },
    update(cache, { data: { addAmenity } }) {
      const { amenities } = cache.readQuery({ query: VIEW_AMENITIES });

      cache.writeQuery({
        query: VIEW_AMENITIES,
        data: { amenities: [...amenities, addAmenity] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      return alert('Please include a name for the amenity');
    }
    addAmenity(name, description, type);

    // clear the form
    setName('');
    setDescription('');
    setType('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#amenityForm'
      >
        <div className="d-flex align-items-center">
          <FaPlus className='=ícon' />
          <div>&nbsp; Add Amenity</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='amenityForm'
        aria-labelledby='amenityFormLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='amenityFormLabel'>
                Add Amenity
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              >Close</button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Amenity Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Description</label>
                  <input
                    type='text'
                    className='form-control'
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Type</label>
                  <input
                    type='text'
                    className='form-control'
                    id='type'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-secondary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
