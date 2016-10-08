import React from 'react';
import ReactDateTime from 'react-datetime';
import s from './DateTime.css';

class DateTime extends React.PureComponent {

  constructor(props) {
    super(props);
    this.isValidDate = this.isValidDate.bind(this);
  }

  isValidDate(current) {
    let ret = true;
    if (this.props.startTime) {
      const startTime = ReactDateTime.moment(this.props.startTime);
      ret = ret && current.isSameOrAfter(startTime);
    }
    if (this.props.endTime) {
      const endTime = ReactDateTime.moment(this.props.endTime);
      ret = ret && current.isSameOrBefore(endTime);
    }
    return ret;
  }

  render() {
    const { align, inline, inputSize, inputProps, ...otherProps } = this.props;
    inputProps.className = className('form-control', { input: { [inputSize]: true } });
    return (
      <div className={className(s[align], { [s.inline]: inline })}>
        <ReactDateTime
          locale="zh-cn"
          inputProps={inputProps}
          isValidDate={this.isValidDate}
          {...otherProps}
        />
      </div>
    );
  }
}

DateTime.propTypes = {
  /**
   * 与 Input 边缘对齐方式
   */
  align: React.PropTypes.oneOf(['left', 'right']),

  /**
   * 是否单行展示: inline-block
   */
  inline: React.PropTypes.bool,

  /**
   * 输入框尺寸
   */
  inputSize: React.PropTypes.oneOf(['normal', 'sm', 'lg']),

  /**
   * 可选择的最早时间
   */
  startTime: React.PropTypes.string,

  /**
   * 可选择最晚时间
   */
  endTime: React.PropTypes.string,
};
DateTime.defaultProps = {
  inline: false,
  align: 'left',
  locale: 'zh-cn',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss',
  inputSize: 'normal',
};

export default DateTime;
