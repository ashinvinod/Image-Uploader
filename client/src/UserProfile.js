import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

var UserProfile = (function() {
	var name = "";
	var userID = "";
	var password = "";

  var getName = function() { return name; };
  var setName = function(name1) { name = name1; };
	var getPassword = function() { return password; };
	var setPassword = function(password1) { password = password1; };

	var getUserID = function() { return cookies.get('userID') };
	var setUserID = function(userID1) {
		userID = userID1;
		cookies.set('userID', userID1, { path: '/' });
	};
	var delUserID = function() {
		cookies.remove('userID', { path: '/' })
	}

  return {
    getName: getName,
    setName: setName,
		getUserID: getUserID,
		setUserID: setUserID,
		delUserID: delUserID,
		getPassword: getPassword,
		setPassword: setPassword
  }

})();

export default UserProfile;
