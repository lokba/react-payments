import { useState } from 'react';
import { ReactComponent as TooltipIcon } from 'assets/tooltip_icon.svg';
import { TOOLTIP_TYPES } from 'constants';
import PropTypes from 'prop-types';

const Tooltip = ({ type }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  return (
    <div className="tooltip">
      <TooltipIcon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      {isHover && (
        <div
          className="tooltip-content"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {TOOLTIP_TYPES[type]}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  type: PropTypes.string,
};

export default Tooltip;
