'use babel';

import HexbinView from './hexbin-view';
import { CompositeDisposable } from 'atom';

export default {

  hexbinView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hexbinView = new HexbinView(state.hexbinViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.hexbinView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hexbin:toggle': () => this.toggle()
    }));
  },

  consumeStatusBar(statusBar) {
    this.statusBar = statusBar;
    this.statusBarTile = this.statusBar.addLeftTile({item: this.hexbinView.getElement(), priority: 50})
  },

  deactivate() {
    this.subscriptions.dispose();
    this.hexbinView.destroy();
  },

  serialize() {
    return {
      hexbinViewState: this.hexbinView.serialize()
    };
  },

  toggle() {
    this.hexbinView.update();
  }

};
