import React from "react";
import { connect } from "react-redux";

const HomePage = ({ messages }) => {
  const isMessagesEmpty = messages.length === 0;

  const content = isMessagesEmpty
    ? "There are no messages available."
    : messages.map((message, index) => <div key={index}>{message}</div>);

  return <div>{content}</div>;
};

HomePage.displayName = "HomePage";

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
