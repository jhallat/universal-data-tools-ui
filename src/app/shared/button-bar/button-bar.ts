type Action = () => void;

const nullAction = () => {};

export class ButtonDef {
  caption = '';
  action: Action = nullAction;
  disabled ? = false;
}
