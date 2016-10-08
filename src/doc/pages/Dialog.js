import React from 'react';
import ReactPlayground from '../ReactPlayground';
import { DialogSample } from '../samples';
import PropTable from '../PropTable';

export default function () {
  return (
    <div>
      <h1>弹窗 - Dialog</h1>
      <p>
        在页面上弹出一个对话框。
      </p>
      <PropTable component="Dialog" />
      <div className="doc-note note-info">
        <h4>提示:</h4>
        参数列表中的属性, 其他所有属性都会透传给 <a target="_blank" href="http://react-bootstrap.github.io/components.html#modals-props-modal">React-Bootstrap 的 Modal 组件</a>。
      </div>
      <ReactPlayground
        codeText={DialogSample}
      />
    </div>
  );
}

