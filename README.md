# Seamless-Saucedemo Cypress Automation Project

This project demonstrates end-to-end test automation using **Cypress** with the **Page Object Model (POM)** design pattern.

The test suite automates key user flows on the SauceDemo website:
https://www.saucedemo.com/

---

## Tech Stack
- **Cypress**
- **JavaScript**
- **Page Object Model (POM)**

---

## Project Structure

```
cypress/
│
├── e2e/
│ └── saucedemo_spec.js
│
├── support/
│ ├── pageObjects/
│ │ ├── loginPage.js
│ │ ├── productsPage.js
│ │ ├── cartPage.js
│ │ ├── checkoutPage.js
│ │
│ └── commands.js
│
cypress.config.js
package.json
.gitignore
README.md
```

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v20 or later)
- **npm** (installs alongside Node.js)

Check versions:
```bash
node -v
npm -v
```

## Environment Setup

Create a `cypress.env.json` file:

{
  "validUser": {
    "username": "username",
    "password": "password"
  },
  "invalidUser": {
    "username": "username",
    "password": "password"
  }
}

## Project Setup & Installation
```bash 
git clone https://github.com/OlajideTechie/seamless-saucedemo.git
cd seamless-saucedemo
```

Install Dependencies
```bash 
npm install
```

Running the Tests

Open Cypress Test Runner (Interactive Mode)
```bash 
npx cypress open
```

Run Test in Headless Mode, Open the terminal 
```bash 
npx run test
```