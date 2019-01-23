import Home from "views/Home/Home.js";
import Send from "views/Send/SendTx.js";
import NewAcc from "views/CreateAcc/CreateAccount.js";
import GetByHash from "views/GetByHash/GetTxDetails.js";
import SendAll from "views/SendAll/SendEntireBal.js";
import Login from "views/Login/Login.js";
import GetByAddress from "views/GetTxByAdd/GetTxByAdd.js";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Home
  },
  {
    path: "/createaccount",
    name: "New Account",
    icon: "nc-icon nc-simple-add",
    component: NewAcc
  },
  { 
    path: "/login", 
    name: "View Account", 
    icon: "nc-icon nc-single-02", 
    component: Login 
  },
  {
    path: "/sendeth",
    name: "Send Ether",
    icon: "nc-icon nc-money-coins",
    component: Send
  },
  {
    path: "/sendAllEth",
    name: "Send Entire Ethers",
    icon: "nc-icon nc-money-coins",
    component: SendAll
  },
  {
    path: "/detailsFromHash",
    name: "Details By Hash",
    icon: "nc-icon nc-paper",
    component: GetByHash
  },
  {
    path: "/detailsFromAddress",
    name: "Details By Address",
    icon: "nc-icon nc-paper",
    component: GetByAddress
  },
  { redirect: true, path: "/", pathTo: "/home", name: "Home" }
];
export default dashRoutes;