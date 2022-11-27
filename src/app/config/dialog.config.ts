import { MatDialogConfig } from '@angular/material/dialog';


export class DialogConfig {
  public static defaultAlert: MatDialogConfig = {
    width: '375px',
    autoFocus: 'dialog'
  };

  public static defaultModalMD: MatDialogConfig = {
    width: '440px',
    maxWidth: '92vw',
    maxHeight: '92vh',
    autoFocus: 'dialog'
  };

  public static defaultModalSM: MatDialogConfig = {
    width: '375px',
    maxWidth: '92vw',
    maxHeight: '92vh',
    autoFocus: 'dialog'
  };
}
