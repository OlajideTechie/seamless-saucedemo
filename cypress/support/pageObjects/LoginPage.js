class LoginPage {
  elements = {
    username: () => cy.get('input[name="user-name"]'),
    password: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('input[name="login-button"]'),
    errorMsg: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit('/');
  }

  clickLoginOnly() {
    this.elements.loginBtn().click();
  }

  login(username = '', password = '') {
    this.elements.username().type(username);
    this.elements.password().type(password);
    this.clickLoginOnly();
  }
}

export default LoginPage;