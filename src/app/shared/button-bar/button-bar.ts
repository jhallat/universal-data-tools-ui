type Action = () => void;

export class ButtonDef {
  caption = '';
  action: Action | undefined;
  disabled ? = false;
}
