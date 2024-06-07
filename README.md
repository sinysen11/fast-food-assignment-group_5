# Vuejs Shop (Vuex, Axios & Vue Router)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This is not a production ready code but it is functional and you can see it in action on the url mentioned below.

Demo URL: https://projects.rupakdhiman.com/vuejs-shop/

**Dependencies**

- Vuejs
- Vuex
- Vue Router
- Bulma
- Axios

**Dev Dependencies**

- Babel
- Esline
- Jest
- Vue Cli
- Node Sass

## Description

This is a code extracted from one of the projects I did for a client and has been tweaked to showcase my knowledge on VueJS.

Feel free to fork or download the repo and modify the code to suit your needs.

#### What can you do in this app?

You will be able to

- Add/remove product from cart.
- Apply coupons.
- Browser Products.
- View Product Info.
- View Coupons.

I may integrate the checkout code later, after reviewing what all I can add and showcase in the Free application.

This app uses [https://fakestoreapi.com/](https://fakestoreapi.com/) to display Products. API has other routes too with fake data for users, carts, etc... but I am only using the products endpoint and rest of the functionality is handeled by the app itself.

FakestoreAPI is a great source but the downtime or loading time is too high, we really have to wait few seconds for the API to connect, no matter how good your internet connection is, but it's FREE to use, so hat's off to the guys mainting the service.

**Note:** We are only manging the state of the data via Vuex and not storing the data permanentaly anywhere, so it gets lost on every page referesh.

## Installation

1. Clone the repo on your system using command `git clone https://github.com/contriveitup/vue-shop.git`.
2. Navigation to the cloned folder in your terminal. If you have used the above command as it is then you would run this command `cd vue-shop`.
3. After navigating to the project folder run `npm install && npm run serve`. You can also use **Yarn** commands instead of **NPM** if you are more comfortable with that.

### Compiles and minifies for production

```
npm run build
```

Happy Coding!
