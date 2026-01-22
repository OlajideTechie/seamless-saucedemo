class LoginPage {
  elements = {
    username: () => cy.get('input[name="user-name"]'),
    password: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('input[name="login-button"]'),
    errorMsg: () => cy.get('.error-message-container error'),
  };

  visit() {
    cy.visit('/');
  }

  login(username, password) {
    this.elements.username().type(username);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
  }
}

export default LoginPage;