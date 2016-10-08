import React from 'react';
import ReactPlayground from '../ReactPlayground';
import PropTable from '../PropTable';
import { TableSample } from '../samples';

export default function () {
  return (
    <div>
      <h1>表格 - Table</h1>
      <p>
        通过 Table 组件, 可以快速将一组结构化得数据快速以表格的形式展示在页面上。
      </p>
      <p>
        该组件主要提供以下特性, 其他功能可以参考属性列表:
      </p>
      <ol>
        <li>可以选择指定的字段来展示, 属性: <span className="label label-default">columns</span></li>
        <li>可以随意指定每个字段表头中要展示的文本, 属性: <span className="label label-default">labels</span></li>
        <li>可以随意自定义每个单元格要展示的内容, 属性: <span className="label label-default">templates</span></li>
      </ol>
      <div className="doc-note note-info">
        <h4>即将支持的功能:</h4>
          1. 按照一个或多个字段进行排序。<br />
          2. 分页。
      </div>
      <PropTable component="Table" />
      <ReactPlayground
        codeText={TableSample}
      />
    </div>
  );
}
