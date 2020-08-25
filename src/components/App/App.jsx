import React, { Component } from "react";
import { Tabs, Spin } from "antd";
import "../../css/App.css";

const { TabPane } = Tabs;

export default class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = { loading: false };
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
              {this.props.loading && (
                <Spin className="app__spin" size="large" />
              )}
              {this.props.movies}
              {this.props.pagination}
            </TabPane>
            <TabPane className="app__tab" tab="Rated" key="2">
              {this.props.userRated}
            </TabPane>
          </Tabs>
        </main>
        <footer className="app__footer"></footer>
      </div>
    );
  }
}
