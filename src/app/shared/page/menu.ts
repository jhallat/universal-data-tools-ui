import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';

type Action = () => void;

export interface MenuItem {
  caption: string;
  action: Action;
}

export interface Menu {
  caption: string;
  items: MenuItem[];
}

const nullAction = (): void => {
  console.log('No action implemented');
};

export class MenuBuilder {

  private menu: Menu[] = [];
  private currentMenu: Menu | undefined;
  private currentItem: MenuItem | undefined;

  forMenu(caption: string): MenuBuilder {
    this.currentMenu = { caption, items: []};
    this.menu.push(this.currentMenu);
    return this;
  }

  addItem(caption: string): MenuBuilder {
    if (this.currentMenu) {
      this.currentItem = { caption, action: nullAction };
      this.currentMenu.items.push(this.currentItem);
    } else {
      console.warn('No menu set in builder');
    }
    return this;
  }

  withAction(action: Action): MenuBuilder {
    if (this.currentItem) {
      this.currentItem.action = action;
    } else {
      console.warn('No menu item set in builder');
    }
    return this;
  }

  create(): Menu[] {
    return this.menu;
  }
}
