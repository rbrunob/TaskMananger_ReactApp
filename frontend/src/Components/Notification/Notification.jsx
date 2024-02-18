import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Notification.css';

function Notification({ message, isError, active }) {
    return (
        <>
            <div className={classNames('notification_container', { 'active': active, 'is_error': isError })}>
                <p className='notification_message'>{message}</p>
            </div>
        </>
    )
}

export default Notification

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired
};

