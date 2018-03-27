import React from 'react';

const Tab = (props) => {
    return (
        <li className={`nav-item tab`}>
            <a className={`nav-link ${props.linkClassName} ${props.isActive ? 'active' : ''}`}
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                    props.onClick(props.tabIndex);
                }}>
                {props.linkClassName}
            </a>
        </li>
    );
}

export default Tab;