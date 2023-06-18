import React, { PureComponent, useContext } from 'react';
import Styles from './snackbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Snackbar = ({ snackbarActive, setSnackbarActive, message }) => {

    React.useEffect(() => {
        if (snackbarActive === true) {
            setTimeout(() => {
                setSnackbarActive(false);
            }, 5000);
        }
    }, [snackbarActive]);

    return (
        <div
            className={snackbarActive
                ? [Styles.snackbar, Styles.fadeIn].join(" ")
                : [Styles.snackbar, Styles.fadeOut].join(' ')}
        >
            <div className="flex items-center gap-x-2">
                <div className="rounded-full h-6 w-6 bg-main flex items-center justify-center">
                    <FontAwesomeIcon icon={['fas', 'fa-check']} className="text-white text-md" />
                </div>
                <div className="ml-2 mt-0">
                    <p className="text-md font-semibold text-black dark:text-white truncate">{message}</p>
                </div>
            </div>

        </div>
    )
}

export default Snackbar;
