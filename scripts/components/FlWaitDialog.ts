import FlWaitDialogDesign from 'generated/my-components/FlWaitDialog';
import { setID } from 'lib/testAutomation';

export default class FlWaitDialog extends FlWaitDialogDesign {
  pageName?: string | undefined;
  private __ID: string;
  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
  }
  set ID(value: string) {
    this.__ID = value;
    setID(this, `${this.__ID}/dialog`);
    setID(this.activityIndicator1, `${this.__ID}/indicator`);
  }
}
