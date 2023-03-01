import Page2Design from 'generated/pages/page2';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { Router, Route } from '@smartface/router';
import { styleableComponentMixin, styleableContainerComponentMixin } from '@smartface/styling-context';
import { withDismissAndBackButton } from '@smartface/mixins';
import Color from '@smartface/native/ui/color';
import i18n from '@smartface/i18n';
import { chatGptInit } from 'services/chatgpt-service';
import LviChat from 'components/LviChat';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import ListViewItem from '@smartface/native/ui/listviewitem';
import Application from '@smartface/native/application';

type chatData = {
  text: string;
};

class StyleableListViewItem extends styleableContainerComponentMixin(ListViewItem) {}

export default class Page2 extends withDismissAndBackButton(Page2Design) {
  routeData: Record<string, any>;
  parentController: any;
  listViewItemIndex: number = 0;
  chatData: chatData[] = [];

  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.iconSend.on('touchEnded', () => {
      this.initChatGpt(this.txtPrompt.text);
    });
    this.refreshListView();
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.initListView();
  }

  async initChatGpt(prompt: string) {
    try {
      //   showWaitDialog();
      const response = await chatGptInit(prompt);
      console.log('response', response.choices);
      if (response && response.choices.length > 0) {
        this.chatData = [...this.chatData, ...response.choices];
        console.log('chatData', this.chatData);
        this.refreshListView();
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      //   hideWaitDialog();
      Application.hideKeyboard();
      this.txtPrompt.text = '';
    }
  }

  initListView() {
    console.log('init lv chatdaata', this.chatData.length);
    this.lvMain.refreshEnabled = false;
    this.lvMain.itemCount = this.chatData.length;

    this.lvMain.onRowHeight = (index) => {
      return 200;
    };
    this.lvMain.onRowBind = (item: LviChat, index: number) => {
      console.log('chatdata length on row bind', this.chatData.length);
      if (this.chatData.length > 0) {
        item.tvChat.text = this.chatData[index].text;
      }
    };
  }
  refreshListView() {
    this.lvMain.itemCount = this.chatData.length;
    console.log('lvmain count refresh', this.lvMain.itemCount);
    this.lvMain.refreshData();
  }
}
