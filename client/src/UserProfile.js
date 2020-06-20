
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const UserProfile = (function () {
	let name = '';
	let userID = '';
	let password = '';

  const getName = function() { return name; };
  const setName = function(name1) { name = name1; };
	const getPassword = function() { return password; };
	const setPassword = function(password1) { password = password1; };

	let getUserID = function() { return cookies.get('userID') };
	let setUserID = function(userID1) {
		userID = userID1;
		cookies.set('userID', userID, { path: '/' });
	};
	let delUserID = function() {
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
