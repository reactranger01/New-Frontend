import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CasinoPlay = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1,
          }}
        >
          <p>Please wait...</p>
        </div>
      )}

      <iframe
        src={url}
        title="description"
        style={{ width: '100%', height: '100%' }}
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};
CasinoPlay.propTypes = {
  url: PropTypes.string.isRequired,
};

export default CasinoPlay;
