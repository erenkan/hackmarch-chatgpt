import LviChatDesign from 'generated/my-components/LviChat';

export default class LviChat extends LviChatDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
