export abstract class CrawlerObject {
  private _name: string
  protected abstract _onFinishCallback: (...params: any[]) => any

  public get Name () {
    return this._name
  }

  constructor (name) {
    this._name = name
  }

  abstract execute(...args: any[]): (any[] | Promise<any[]> | Promise<void> | void)
}
