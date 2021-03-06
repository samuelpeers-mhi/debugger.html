/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import type { List } from "immutable";

import "./Workers.css";

import actions from "../../actions";
import { getWorkers } from "../../selectors";
import type { Worker } from "../../types";

export class Workers extends PureComponent {
  props: {
    workers: List<Worker>,
    openWorkerToolbox: string => void
  };

  selectWorker(url) {
    this.props.openWorkerToolbox(url);
  }

  renderWorkers(workers) {
    return workers.map(worker => (
      <div
        className="worker"
        key={worker.url}
        onClick={() => this.selectWorker(worker.url)}
      >
        {worker.url}
      </div>
    ));
  }

  renderNoWorkersPlaceholder() {
    return <div className="pane-info">{L10N.getStr("noWorkersText")}</div>;
  }

  render() {
    const { workers } = this.props;
    return (
      <div className="pane workers-list">
        {workers && workers.size > 0
          ? this.renderWorkers(workers)
          : this.renderNoWorkersPlaceholder()}
      </div>
    );
  }
}

export default connect(
  state => {
    return { workers: getWorkers(state) };
  },
  dispatch => bindActionCreators(actions, dispatch)
)(Workers);
