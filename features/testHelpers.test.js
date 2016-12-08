export function signUp(email, password) {
    server.call('user.signup', email, password);
};

export function signIn(browserName, user, password) {
    browserName.url('http://localhost:3000/');
    browserName.execute(function(email, password) {
        Meteor.loginWithPassword(email, password);
    }, email, password);
};

export function signUpAndSignIn(browserName, user, password) {
    signUp(email, password);
    signIn(browserName, user, password);
};

export function cleanDatabase() {
    server.execute(function () {
        Package['xolvio:cleaner'].resetDatabase();
    });
};