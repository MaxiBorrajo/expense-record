export class UserDto {
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.current_amount = user.current_amount;
    this.currency = user.currency;
  }
}
