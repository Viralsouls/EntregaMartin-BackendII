// Solo datos “seguros” para exponer en /current
export default class UserDTO {
  constructor(userDoc) {
    this.id = userDoc._id?.toString?.() ?? userDoc.id;
    this.first_name = userDoc.first_name;
    this.last_name = userDoc.last_name;
    this.email = userDoc.email;
    this.age = userDoc.age ?? null;
    this.role = userDoc.role;
    this.cart = userDoc.cart ?? null;
  }
}