import React from 'react';
import ReactDOM from 'react-dom';
import App from './doc/App';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';

import IntroPage from './doc/pages/Introduction';
import WidgetPage from './doc/pages/Widgets';
import TablePage from './doc/pages/Table';
import DialogPage from './doc/pages/Dialog';
import DateTimePage from './doc/pages/DateTime';
import FormPage from './doc/pages/Form';
import NotificationPage from './doc/pages/Notification';
import AlertPage from './doc/pages/Alert';
import ConfirmPage from './doc/pages/Confirm';
import SuggestionPage from './doc/pages/Suggestion';
import ToolbarPage from './doc/pages/Toolbar';

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/solarized.css';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/intro.html" component={IntroPage} />
      <Route path="/widgets.html" component={WidgetPage} />
      <Route path="/table.html" component={TablePage} />
      <Route path="/form.html" component={FormPage} />
      <Route path="/dialog.html" component={DialogPage} />
      <Route path="/datetime.html" component={DateTimePage} />
      <Route path="/notification.html" component={NotificationPage} />
      <Route path="/alert.html" component={AlertPage} />
      <Route path="/confirm.html" component={ConfirmPage} />
      <Route path="/suggestion.html" component={SuggestionPage} />
      <Route path="/toolbar.html" component={ToolbarPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
