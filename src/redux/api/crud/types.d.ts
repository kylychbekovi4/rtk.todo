/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace CRUD {
	type GetCrudRequest = void;
	type GetCrudResponse = {
		_id?: number;
		title: string;
		img: string;
		price: number;
	}[];

	type CreateCrudRequest = {
		_id?: number;
		title: string;
		img: string;
		price: number;
	};

	type CreateCrudResponse = {
		_id?: number;
		title: string;
		img: string;
		price: number;
	}[];

	type DeleteRequest = number;
	type DeleteResponse = {
		_id?: number;
	}[];
}
