import React from "react";
import Footer from "components/Footer/Footer.jsx";
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "routes/dashboard.jsx";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  }
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={dashboardRoutes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref="mainPanel">
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.pro) {
                return null;
              }
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              }
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
          <Footer fluid/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
