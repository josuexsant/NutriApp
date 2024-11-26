export const hello = () => {
  console.log("Hello from example.js");
  return "Hello from example.js";
};

export const goodbye = () => {
  console.log("Goodbye from example.js");
  return "Goodbye from example.js";
};

export const login = (data) => {
  const user = data.user;
  const password = data.password;
  if (user == "josue" && password == "1234") {
    console.log("user logged in");
    return "user logged in";
  } else {
    console.log("user not logged in");
    return "user not logged in";
  }
};

export const logout = () => {
  console.log("user logged out");
  return "user logged out";
};
