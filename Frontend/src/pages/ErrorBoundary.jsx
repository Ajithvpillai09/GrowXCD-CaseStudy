import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

    componentDidCatch(error, errorInfo) {
        console.log("Im catching aaaaaaaaaaa");
      console.log(error, errorInfo);
    }
 

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>Please try again later...</p>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes={
    children:PropTypes.node
}

export default ErrorBoundary;