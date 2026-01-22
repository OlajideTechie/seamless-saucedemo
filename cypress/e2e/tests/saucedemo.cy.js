import LoginPage from '../../support/pageObjects/LoginPage';
import ProductsPage from '../../support/pageObjects/ProductsPage';
import CartPage from '../../support/pageObjects/CartPage';
import CheckoutPage from '../../support/pageObjects/CheckoutPage';

// Page Object Instances for SauceDemo test scenarios
const login = new LoginPage();
const products = new ProductsPage();
const cart = new CartPage();
const checkout = new CheckoutPage();

// Environment Variable
const validUser = Cypress.env('validUser');
const invalidUser = Cypress.env('invalidUser');

const username = validUser.username;
const password = validUser.password;

const invalidUsername = invalidUser.username;
const invalidPassword = invalidUser.password;

describe('SauceDemo SwagLab UI Test Scenarios', () => {

  // Test Setup before each test
  beforeEach(function () {
    cy.fixture('checkout').as('checkout');
    cy.fixture('cart_items').as('cart_items');
    login.visit();
  });

  it('Customer login and checkout flow', function () {

    login.login(username, password);

    //validate user is routed to the products page
    cy.url().should('include', '/inventory.html');

    // Add item(s) to cart
    products.addItem(this.cart_items.backpack.id);

    products.goToCart();
    
    // Validate the presence of cart item text
    cart.verifyItem(this.cart_items.backpack.name);
    cart.checkout();

    // Validate the presence of checkout page elements

    checkout.fillDetails(
      this.checkout.customer.firstName,
      this.checkout.customer.lastName,
      this.checkout.customer.postalCode
    );

    // Validate the presence of order confirmation elements
    checkout.verifyOrderSummary(
      this.cart_items.backpack.name,
      this.cart_items.backpack.price,
      this.cart_items.backpack.total
    );

    // Finish the order
    checkout.finishOrder(
      this.cart_items.backpack.name,
      this.cart_items.backpack.price,
      this.cart_items.backpack.total
    );

    // Validate the presence of order confirmation elements
    checkout.verifyOrderCheckout();

    // Go back to products
    checkout.goBackToProducts();

    // Logout customer from the application
    products.logout();
  });

  it('Incorrect login details', function () {
    login.login(invalidUsername, invalidPassword);
    login.elements.errorMsg().should('contain.text', ' Username and password do not match any user in this service');
  });

  it('Login without credentials', function () {
    login.clickLoginOnly();
    login.elements.errorMsg()
    .should('be.visible')
    .and('contain.text', 'Username is required');
  });
});
