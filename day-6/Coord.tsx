type GuardCoord = {
  row: number;
  col: number;
};

export class Coord implements GuardCoord {
  constructor(readonly row: number, readonly col: number) {}
}
