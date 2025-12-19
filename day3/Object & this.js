const user = {
  name: "Kent",
  getName() {
    return this.name;
  }
};

const getUserName = user.getName;
console.log(getUserName());

// It's print undefined, because this be called by getName(). And getUserName just take function not take getName function.