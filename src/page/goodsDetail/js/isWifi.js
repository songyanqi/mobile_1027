/**
* Created by donyyang on 2017/05/15.
*/
let isWifi = ()=> {
  let wifi = true;

  let con = window.navigator.connection;

  if (con && con.type) {
    let network = con.type;
    if (network != "wifi" && network != "2" && network != "unknown") {  // unknown是为了兼容Chrome Canary
      wifi = false;
    }
  }
  return wifi;
};

export default isWifi;
