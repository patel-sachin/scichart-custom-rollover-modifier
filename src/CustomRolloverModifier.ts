import { IRolloverModifierOptions, ModifierMouseArgs, RolloverModifier } from 'scichart';

type TModifierMouseFn = (args: ModifierMouseArgs) => void;

export interface ICustomRolloverModifier {
  onShowRollOver?: TModifierMouseFn;
  onHideRollOver?: TModifierMouseFn;
  showRollover: TModifierMouseFn;
  hideRollover: TModifierMouseFn;
}

export class CustomRolloverModifier extends RolloverModifier implements ICustomRolloverModifier {
  private _onShowRollOver?: TModifierMouseFn;
  private _onHideRollOver?: TModifierMouseFn;

  constructor(options?: IRolloverModifierOptions) {
    super(options);
  }

  // do nothing (disable default behavior)
  override modifierMouseMove() {
  }

  override modifierMouseLeave() {
  }

  override modifierMouseDown(args: ModifierMouseArgs) {
    if (args.ctrlKey) {
      console.log(`RolloverModifier clicked at ${args.mousePoint.x}, ${args.mousePoint.y}`);
      super.modifierMouseMove(args);
      this._onShowRollOver?.(args);
    } else {
      console.log(`hiding rollover`);
      super.modifierMouseLeave(args);
      this._onHideRollOver?.(args);
    }
  }

  public get onShowRollOver(): TModifierMouseFn | undefined {
    return this._onShowRollOver;
  }
  public set onShowRollOver(fn: TModifierMouseFn) {
    this._onShowRollOver = fn;
  }

  public get onHideRollOver(): TModifierMouseFn | undefined {
    return this._onHideRollOver;
  }
  public set onHideRollOver(fn: TModifierMouseFn) {
    this._onHideRollOver = fn;
  }

  public showRollover(args: ModifierMouseArgs) {
    super.modifierMouseMove(args);
  }

  public hideRollover(args: ModifierMouseArgs) {
    super.modifierMouseLeave(args);
  }
}
