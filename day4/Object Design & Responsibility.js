const user = {
  name: "Kent",
  age: 19,
  login() {
    // ?
  },
  logout() {
    // ?
  },
  isAdult() {
    // ?
  }
};

/* Sometime isAdult shouldn't be in the user,when adult condition chsnge to different country, the regulations maybe change and not only 18 year old.
 this time*/ user.isAdult() /* will be change to tight coupling */
 /* the upgrade design */
 AgePolicy.isAdult(user) // or
 isAdult(user, country)



