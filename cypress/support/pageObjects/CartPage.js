class CartPage {
  elements = {
    cartItems: () => cy.get('.inventory_item_name'),
    checkoutBtn: () => cy.get('#checkout')
  };

  verifyItem(itemName) {
    this.elements.cartItems().should('contain.text', itemName);
  }

  checkout() {
    this.elements.checkoutBtn().click();
  }
}

export default CartPage;
