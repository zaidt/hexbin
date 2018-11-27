'use babel';

export default class HexbinView {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('test-signature-statusbar', 'inline-block');
    this.element.textContent = "init element";
    this.editor = atom.workspace.getActiveTextEditor()
  }

  subscribe(){
    this.subscriptions = new CompositeDisposable();
    //this.subscriptions.add(this.editor.onDidAddSelection(this.debouncedHandleSelection))
    //this.subscriptions.add(this.editor.onDidChangeSelectionRange(this.debouncedHandleSelection))
  }

  debouncedHandleSelection(){
    this.update();
  }

  update() {
    selection = this.editor.getSelectedText();
    dec = NaN;
    hex = NaN;
    bin = NaN;

    dec = parseInt(selection);

    if (dec) {
        bin = this.dec2bin(dec);

        if (selection[0] == '0' && selection[1] == 'x') {
          hex = selection;
        } else {
          hex = '0x' + this.dec2hex(dec);
        }
        this.element.textContent = "Hex:" + hex + " Bin:" + this.formatBinary(bin) + " Dec:" + dec;
      } else if (selection.length == 10 && selection.toUpperCase().substr(-10, 2) == '0B') {
        bin = selection.substr(2, 10);
        hex = this.bin2hex(bin);
        dec = this.bin2dec(bin);
        this.element.textContent = "Hex:" + hex + " Bin:" + this.formatBinary(bin) + " Dec:" + dec;
      } else {
        this.element.textContent = "Invalid";
    }
  }

  dec2bin(dec){
    return (dec >>> 0).toString(2);
  }

  dec2hex(dec) {
    return (+dec).toString(16);
  }

  bin2dec(bin){
    return parseInt(bin, 2).toString(10);
  }

  bin2hex(bin) {
    hex = parseInt(bin, 2).toString(16);

    if(hex.toString().length > 1) {
      return "0x" + hex.toString().toUpperCase();
    }

  return "0x0" + hex.toString().toUpperCase();
  }

  formatBinary(bin) {
      str = "";
      remainder = bin.length % 8;

      if (remainder > 0) {
        while (remainder++ < 8) {
            bin = "0" + bin;
        }
      }

      sets = bin.length / 8;

      for (i = 0; i < sets ; i++) {
          start = i * 8;
          str += bin.substring(start, start+8) + " ";
      }

      return str;
  }

  serialize() {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
