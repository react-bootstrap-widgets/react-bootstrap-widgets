/**
 * Created by lei on 16/8/1.
 */

import React from 'react';
import { Alert } from 'react-bootstrap';
import s from './Notification.css';

const distance = 10;

const positionStyles = {
    tc: {
        top: distance,
        left: 0,
        right: 0,
        margin: '0px auto',
    },
    bc: {
        bottom: distance,
        left: 0,
        right: 0,
        margin: '0px auto',
    },
    tl: {
        left: distance,
        top: distance,
    },
    tr: {
        top: distance,
        right: distance,
    },
    bl: {
        left: distance,
        bottom: distance,
    },
    br: {
        right: distance,
        bottom: distance,
    },
};

const propTypes = {
    /**
     * 是否展示通知
     */
    show: React.PropTypes.bool,

    /**
     * 通知的样式
     */
    style: React.PropTypes.oneOf(['success', 'warning', 'danger', 'info']),

    /**
     * 通知的标题
     */
    title: React.PropTypes.string,

    /**
     * 通知的内容
     */
    message: React.PropTypes.string.isRequired,

    /**
     * 通知框的宽度
     */
    width: React.PropTypes.number,

    /**
     * 位置
     */
    position: React.PropTypes.oneOf(['tc', 'bc', 'tr', 'tl', 'br', 'bl']),

    onDismiss: React.PropTypes.func,
};

const defaultProps = {
    show: false,
    style: 'info',
    position: 'br',
    width: 280,
    onDismiss: () => {},
};

const Notification = props => {
    let pStyles = positionStyles[props.position];
    pStyles.width = props.width;
    return (
        <div className={s['notification']} style={pStyles}>
            <Alert bsStyle={props.style} onDismiss={props.onDismiss}>
                {props.title ? <h4>{props.title}</h4> : null}
                <p>{props.message}</p>
            </Alert>
        </div>
    );
};

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
