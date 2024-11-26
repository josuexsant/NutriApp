import { hello } from "../example";
import { goodbye } from "../example";
import { login } from "../example";

describe("example.js", () => {
  it("should say hello", () => {
    expect(hello()).toBe("Hello from example.js");
  });

  it("should say goodbye", () => {
    expect(goodbye()).toBe("Goodbye from example.js");
  });
});

describe("login", () => {
  it("Caso 1: el usuario inicia con credenciales correctas", () => {
    const data = {
      user: "josue",
      password: "1234",
    };
    expect(login(data)).toBe("user logged in");
  });
  it("Caso 2: el usuario inicia con credenciales incorrectas", () => {
    const data = {
      user: "josue",
      password: "12345",
    };
    expect(login(data)).toBe("user not logged in");
  });
});
