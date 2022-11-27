export class ShowMenu {
  static readonly type = '[Menu] ToggleMenu';


  constructor(
    public payload: boolean) {
  }
}
