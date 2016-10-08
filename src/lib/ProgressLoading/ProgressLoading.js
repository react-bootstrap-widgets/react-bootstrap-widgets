import React, { PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { ProgressBar, Fade } from 'react-bootstrap';
import styles from './ProgressLoading.css';
import className from 'class-name';

class ProgressLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            progress: 0,
        };
        this.completing = false;
    }

    componentWillReceiveProps(nextProps) {
        // 完成所有 Loading
        console.info('nextProps.count: ', nextProps);
        if (this.props.count !== 0 && nextProps.count === 0) {
            this.completeAllLoading();
        } else if (!this.completing) {
            this.calculateProgress(nextProps.count);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    completeAllLoading() {
        this.setState({
            progress: 100,
        });
        this.completing = true;
        setTimeout(() => {
            // 等待300毫秒至进度条进行到 100% 后将其隐藏（FadeOut）
            this.setState({
                show: false,
            });
            setTimeout(() => {
                // 等待 150 毫秒至进度条完全隐藏，然后重置进度条
                this.setState({
                    progress: 0,
                });
                // 等待 300 毫秒，是为了让 progress 返回至 0
                this.completing = false;
                if (this.props.count > 0) {
                    // 如果有新的资源在加载，再次展示
                    this.calculateProgress(this.props.count);
                }
            }, 150);
        }, 300);
    }

    calculateProgress(count) {
        if (count <= 0) return;
        let progress = this.state.progress;
        if (progress === 0) {
            progress = Math.random() * 40 + 30;
            console.info('progress is 0: ', progress);
        } else if (count < this.props.count) {
            progress = Math.random() * (90 - progress) + progress;
            console.info('progress is not 0: ', progress);
        }
        if (this.state.show === false) {
            this.setState({
                show: true,
            });
            setTimeout(() => {
                // FadeIn 执行完成收设置进度
                if (this.completing) return;
                this.setState({ progress });
            }, 150);
            return;
        }
        this.setState({
            progress,
        });
    }

    render() {
        const clazzName = {};
        // progress 为 0 时设置动画 duration 为 0s
        clazzName[styles['immediate-trans']] = this.state.progress === 0;
        clazzName[styles['progress-loading']] = true;
        const countLabelClassName = className(
            styles['count-label'], 'label', `label-${this.props.style}`
        );
        let countLabel = null;
        if (this.props.count > 0 && this.props.showCountLabel) {
            countLabel = (
                <div className={countLabelClassName}>
                    {this.props.count}
                </div>
            );
        }
        return (
            <Fade in={this.state.show}>
                <div>
                    <div className={className(clazzName)}>
                        <ProgressBar
                            active={this.props.striped}
                            now={this.state.progress}
                            bsStyle={this.props.style}
                            label={countLabel}
                        />
                    </div>
                </div>
            </Fade>
        );
    }
}

ProgressLoading.propTypes = {

    /**
     * 正在加载的资源数，当count>0是则展示进度条
     */
    count: PropTypes.number,

    /**
     * 是否开启条纹动画
     */
    striped: PropTypes.bool,

    /**
     * 加载进度条样式
     */
    style: PropTypes.oneOf(['success', 'warning', 'danger', 'info']),

    /**
     * 是否显示资源数标签
     */
    showCountLabel: PropTypes.bool,
};

ProgressLoading.defaultProps = {
    count: 0,
    striped: true,
    style: 'info',
    showCountLabel: false,
};

export default ProgressLoading;
