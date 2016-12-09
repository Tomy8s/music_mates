export function signUp(username, email, password) {
  browser.url('http://localhost:3100/discover');
  browser.waitForExist('#login-sign-in-link', 5000);
  browser.click('#login-sign-in-link');
  browser.click('#signup-link');
  browser.setValue('input#login-username', username);
  browser.setValue('input#login-email',  email);
  browser.setValue('input#login-password', password);
  browser.keys("\uE006"); //press ENTER
  browser.waitForExist('#login-name-link', 5000);
};

export function signIn(username, password) {
  browser.url('http://localhost:3100/discover');
  browser.waitForExist('#login-sign-in-link', 10000);
  browser.click('#login-sign-in-link');
  browser.setValue('#login-username-or-email', username);
  browser.setValue('#login-password', password);
  browser.keys("\uE006"); //press ENTER
};

export function signOut(){
  browser.click('#login-name-link');
  browser.click('#login-buttons-logout');
}

export function cleanDatabase() {
    server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
    });
};

export function createAccount(username, email, password) {
  server.execute(function(username, email, password){
    Accounts.createUser({username: username, email: email, password: password});
  }, username, email, password);
}

export function login(username, password) {
  browser.url('http://localhost:3100/discover');
  signIn(username, password)
}
