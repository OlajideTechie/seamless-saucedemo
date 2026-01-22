import LoginPage from '../../support/pageObjects/LoginPage';
import ProductsPage from '../../support/pageObjects/ProductsPage';
import CartPage from '../../support/pageObjects/CartPage';
import CheckoutPage from '../../support/pageObjects/CheckoutPage';

// Page Object Instances for SauceDemo test scenarios
const login = new LoginPage();
const products = new ProductsPage();
const cart = new CartPage();
const checkout = new CheckoutPage();

describe('SauceDemo SwagLab UI Tests', () => {

  // Test Setup before each test
  beforeEach(function () {
    cy.fixture('users').as('users');
    cy.fixture('checkout').as('checkout');
    cy.fixture('cart_items').as('cart_items');
  });

  it('Positive login and checkout flow', function () {
    login.visit();
    login.login(this.users.validUser.username, this.users.validUser.password);

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

  it.skip('Negative login scenario', function () {
    login.visit();
    login.login(this.users.invalidUser.username, this.users.invalidUser.password);
    login.elements.errorMsg().should('contain.text', 'Epic sadface');
  });
});
