import React from 'react';

import './button.scss';

export default ({ onClickAction, active }) => {
  const className = active
    ? 'show-more-button'
    : 'show-more-button show-more-button_disabled';

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (active) {
          onClickAction();
        }
      }}
    >
      Показать еще
    </button>
  );
};
