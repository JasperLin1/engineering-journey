function divide(a, b) {
  return a / b;
}

/*
What's the problem here 
The risk b ===0,*/ divide(10, 0);  /*will be Infinity
Wrong type*/ divide("10", 2);  /* they will change the type automatically
 or */divide("abc", 2);   //became NaN

 throw new Error("Cannot divide by zero"); // is a protect borders