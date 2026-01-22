class ProductsPage {
  elements = {
    cartIcon: () => cy.get('.shopping_cart_link'),
    menuBtn: () => cy.get('#react-burger-menu-btn'),
    logoutLink: () => cy.get('#logout_sidebar_link')
  };

  // Add item(s) to cart
  addItem(itemId) {
    cy.get(`#add-to-cart-${itemId}`).click();
  }

  goToCart() {
    this.elements.cartIcon().click();
  }

  logout() {
    this.elements.menuBtn().click();
    this.elements.logoutLink().click();
  }
}

export default ProductsPage;
