import React from 'react';
import Link from 'react-router/lib/Link';

class Widgets extends React.Component {
  render() {
    return (
      <div>
        <h3>组件列表</h3>
        <ul>
          <li><Link to={'/table.html'}>表格 - Table</Link> <span className="complete fa fa-check"/></li>
          <li><Link to={'/table.html'}>表单 - Form</Link></li>
          <li><Link to={'/dialog.html'}>弹窗 - Dialog</Link> <span className="complete fa fa-check"/></li>
          <li><Link to={'/confirm.html'}>确认框 - Confirm</Link></li>
          <li><Link to={'/alert.html'}>警示框 - Alert</Link></li>
          <li><Link to={'/notification.html'}>提示框 - Notification</Link></li>
          <li><Link to={'/suggestion.html'}>自动提示 - Suggestion</Link></li>
          <li><Link to={'/toolbar.html'}>工具栏 - Toolbar</Link></li>
        </ul>
      </div>
    );
  }
}

Widgets.propTypes = {};
Widgets.defaultProps = {};

export default Widgets;
