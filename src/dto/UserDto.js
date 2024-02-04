export class UserDto {
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.current_amount = user.current_amount;
    this.currency = user.currency;
    this.createdAt = user.createdAt;
    this.urlProfilePhoto = user.urlProfilePhoto;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
