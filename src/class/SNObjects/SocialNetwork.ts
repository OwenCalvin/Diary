export default class SocialNetwork {
  private _name: string
  private _profilePicture: string

  public get Name() {
    return this._name
  }
  public set Name(val: string) {
    this._name = name
  }

  public get ProfilePicture() {
    return this._profilePicture
  }
  public set ProfilePicture(val: string) {
    this._profilePicture = val
  }

  public constructor (name, profilePicture) {
    this.Name = name
    this.ProfilePicture = profilePicture
  }
}
