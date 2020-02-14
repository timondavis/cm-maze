export interface Serializable {
	toJSON(): string;
	fromJSON(json: string) : Serializable;
}