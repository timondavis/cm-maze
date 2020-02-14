import {SerializableDataInterface} from "./SerializableData.interface";

export abstract class Serializable {
	protected data: SerializableDataInterface;
	public stringify() {
		return JSON.stringify(this.data);
	}
}