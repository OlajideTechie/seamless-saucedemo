class CheckoutPage {
  elements = {
    firstName: () => cy.get('#first-name'),
    lastName: () => cy.get('#last-name'),
    postalCode: () => cy.get('#postal-code'),
    continueBtn: () => cy.get('#continue'),
    finishBtn: () => cy.get('#finish')
  };

  fillDetails(first, last, zip) {
    this.elements.firstName().type(first);
    this.elements.lastName().type(last);
    this.elements.postalCode().type(zip);
    this.elements.continueBtn().click();
  }

  finishOrder() {
    this.elements.finishBtn().click();
  }

  verifyOrderSummary(itemName, itemPrice, totalPrice) {
    cy.get('.inventory_item_name').should('contain.text', itemName);
    cy.get('.inventory_item_price').should('contain.text', itemPrice);
    cy.get('.summary_total_label').should('contain.text', totalPrice);
  }

  verifyOrderCheckout() {
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  }

  goBackToProducts() {
    cy.get('[data-test="back-to-products"]').click();
  }
}

export default CheckoutPage;