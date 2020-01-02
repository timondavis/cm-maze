export class MazePathTuple {

	private _a : string;
	private _b : string;

	public constructor( a: string, b: string ) {
		if (a === b) {
			throw "A and B values for MazePathTuple cannot match";
		}

		if (a > b) {
			this._a = a;
			this._b = b;
		} else {
			this._a = b;
			this._b = a;
		}
	}

	public get a(): string {
		return this._a;
	}

	public get b(): string {
		return this._b;
	}

	public compareTo(mazePathTuple: MazePathTuple): number {
		if (this.a === mazePathTuple.a && this.b === mazePathTuple.b) { return 0; }
		else if (this.a === mazePathTuple.a) {
			return (this.b > mazePathTuple.b) ? 1 : -1;
		} else {
			return (this.a > mazePathTuple.a) ? 1 : -1;
		}
	}
}