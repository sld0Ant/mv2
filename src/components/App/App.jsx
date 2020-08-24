import React, { Component } from "react";
import { Tabs } from "antd";

import "../../css/App.css";

const { TabPane } = Tabs;

export default class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Movies App</h1>
          {this.props.search}
        </header>
        <main className="app__main">
          <Tabs centered defaultActiveKey="1">
            <TabPane className="app__tab" tab="Lookup" key="1">
              <div className="app__card-container">
                {this.props.movies}
                {this.props.pagination}
              </div>
            </TabPane>
            <TabPane className="app__tab" tab="Rated" key="2">
              <div className="app__card-container">{this.props.userRated}</div>
            </TabPane>
          </Tabs>
        </main>
        <footer className="app__footer"></footer>
      </div>
    );
  }
}
