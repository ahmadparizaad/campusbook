import React, { Component } from "react";

import { COMETCHAT_CONSTANTS } from "./const";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    CometChat.init(
      COMETCHAT_CONSTANTS.APP_ID,
      new CometChat.AppSettingsBuilder()
        .setRegion(COMETCHAT_CONSTANTS.REGION)
        .subscribePresenceForAllUsers()
        .autoEstablishSocketConnection(true)
        .build()
    ).then(
      () => {
        this.login();
      },
      (error) => {
        console.log("Init failed with exception:", error);
      }
    );
  }

  login() {
    let UID = "UID";
    CometChat.login(UID, COMETCHAT_CONSTANTS.AUTH_KEY).then(
      (user) => {
        this.setState({ user });
      },
      (error) => {
        console.log("Login failed with exception:", error);
      }
    );
  }

  render() {
    return this.state.user ? (
      <div>User logged in</div>
    ) : (
      <div>User not logged in</div>
    );
  }
}