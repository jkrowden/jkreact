import React from "react";
// import ReactDOM from "react-dom";

import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Content from "./Content";
import Footer from "./Footer";
// // import MainContent from "./MainContent";
// import { Route } from "react-router-dom";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileView: 5,
      showSidebar: true,
    };
    this.updateViewState = this.updateViewState.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  updateViewState() {
    let xwidth = document.documentElement.clientWidth;
    let yheight = document.documentElement.clientHeight;

    // Phone in portrait mode
    if (xwidth < 600) {
      this.setState({
        mobileView: 0,
        showSidebar: false,
      });
      // Phone in Landscape mode
    } else if (xwidth > 600 && xwidth < 1000 && yheight < 500) {
      this.setState({
        mobileView: 1,
        showSidebar: false,
      });
      //iPad/Tablet in portrait mode
    } else if (xwidth > 600 && xwidth < 1000 && yheight > 500) {
      this.setState({
        mobileView: 2,
        showSidebar: true,
      });
      //iPad/Tablet in Landscape mode
    } else if (xwidth > 992 && yheight < 992) {
      this.setState({
        mobileView: 3,
        showSidebar: true,
      });
      // Desktop/Laptop Sub 1080p
    } else if (xwidth > 1000 && xwidth < 1900 && yheight > 700 && yheight < 1200) {
      this.setState({
        mobileView: 4,
        showSidebar: true,
      });
      // Desktop/Laptop 1080p
    } else if (xwidth > 1901 && xwidth < 2500) {
      this.setState({
        mobileView: 5,
        showSidebar: true,
      });
      //2k and above
    } else {
      this.setState({
        mobileView: 6,
        showSidebar: true,
      });
    }

    console.log("your resolution is " + xwidth + "px by " + yheight + "px.");
  }

  toggleSideBar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  }

  componentDidMount() {
    this.updateViewState();
    window.addEventListener("resize", this.updateViewState);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewState);
  }

  render() {

    // For when the sidebar is shown and not mobile
    if(this.state.showSidebar === true && this.state.mobileView > 1 )
    return (
      <div className="dashboard container-fluid">
        <Navbar />

        <div className="row">
          <Sidebar toggleSidebar={this.toggleSideBar}/>
          <Content mobile={this.state.mobileView} sidebar={this.state.showSidebar} toggleSidebar={this.toggleSideBar} />
          <div className="blank-content col-xs-12 col-sm-12 col-lg-2 col-md-2"></div>
        </div>

        <div className="row">
          <Footer />
        </div>
      </div>
    );
    // For when the viewport is landscape mobile without a sidebar
    else if (this.state.mobileView < 1 && this.state.showSidebar === false) {
      console.log("hit the gap")
      return (<div className="dashboard container-fluid">
      <Navbar />

      <div className="row">
        <Content mobile={this.state.mobileView} sidebar={this.state.showSidebar} toggleSidebar={this.toggleSideBar} />
      </div>

      <div className="row">
        <Footer />
      </div>
    </div>);
    // Mobile with a sidebar
    } else if (this.state.mobileView < 2 && this.state.showSidebar === true) {
      return (<div className="dashboard container-fluid">
        <Navbar />

        <div className="row">
        <Sidebar toggleSidebar={this.toggleSideBar}/>
          <Content mobile={this.state.mobileView} sidebar={this.state.showSidebar} toggleSidebar={this.toggleSideBar} />
          {/* This blank space will only appear in Mobile Landscape. */}
          {this.state.mobileView === 1 ? (<div className="blank-content col-xs-12 col-sm-12 col-lg-2 col-md-2"></div>) : ''}
        </div>

        <div className="row">
          <Footer />
        </div>
      </div>);
      // No sidebar, non-mobile
    } else {
      return (<div className="dashboard container-fluid">
        <Navbar />

        <div className="row">
          <div className="blank-content col-xs-12 col-sm-12 col-lg-2 col-md-2"></div>
          <Content mobile={this.state.mobileView} sidebar={this.state.showSidebar} toggleSidebar={this.toggleSideBar} />
          <div className="blank-content col-xs-12 col-sm-12 col-lg-2 col-md-2"></div>
        </div>

        <div className="row">
          <Footer />
        </div>
      </div>);
    };
  }
}
export default Dashboard;
