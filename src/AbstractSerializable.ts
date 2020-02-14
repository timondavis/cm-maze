import {Serializable} from "./Serializable.interface";

export abstract class AbstractSerializable implements Serializable {
	public toJSON(): string {
		let model = {};
		Object.keys(this).forEach((key: string, index: number) => {
			let property  = String(key);
			if (property.indexOf('_') === 0) {
				property = property.substr(1);
			}

			if (this[property] instanceof Object && this[property].hasOwnProperty('toJSON')) {
				model[property] = this[key].toJSON();
			}
			model[property] = this[key];
		});

		return JSON.stringify(model);
	}

	public abstract fromJSON(json: string) : Serializable;
}
