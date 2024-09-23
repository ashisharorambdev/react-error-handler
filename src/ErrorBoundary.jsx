import React, { Component } from "react";
import axios from "axios";
import html2canvas from "html2canvas";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isSendingError: false,
      sendErrorSuccess: null,
      screenshot: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    this.takeScreenshot();
    this.sendErrorToBackend(error, errorInfo);
  }

  takeScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body);
      const screenshot = canvas.toDataURL();
      this.setState({ screenshot });
      console.log("Screenshot taken:", screenshot);
    } catch (error) {
      console.error("Error taking screenshot:", error);
    }
  };

  sendErrorToBackend = async (error, errorInfo) => {
    try {
      this.setState({ isSendingError: true });
      const errorData = {
        error: error.toString(),
        errorInfo: errorInfo.componentStack,
        screenshot: this.state.screenshot,
      };
      const response = await axios.post("/api/error", errorData);
      if (response.status === 201) {
        this.setState({ sendErrorSuccess: true });
      } else {
        this.setState({ sendErrorSuccess: false });
      }
    } catch (error) {
      console.error("Error sending error to backend:", error);
      this.setState({ sendErrorSuccess: false });
    } finally {
      this.setState({ isSendingError: false });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <div className="error-message">
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
          </div>
          {this.state.isSendingError ? (
            <div className="sending-error">
              <p>Sending error to backend...</p>
              <div className="loading-spinner" />
            </div>
          ) : this.state.sendErrorSuccess !== null ? (
            this.state.sendErrorSuccess ? (
              <div className="error-sent-successfully">
                <p>Error sent to backend successfully.</p>
                <div className="success-icon" />
              </div>
            ) : (
              <div className="error-sent-failed">
                <p>Failed to send error to backend.</p>
                <div className="failed-icon" />
              </div>
            )
          ) : null}

          <button
            className="reload-button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
