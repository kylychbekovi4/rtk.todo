import { useState } from "react";
import {
	useCreateTodoMutation,
	useDeleteAllMutation,
	useDeleteTodoMutation,
	useGetTodoQuery,
	usePatchMutation,
} from "../../redux/api/crud";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import scss from "./TodoList.module.scss";

const TodoList = () => {
	const [title, setTitle] = useState("");
	const [img, setImg] = useState("");
	const [price, setPrice] = useState(0);
	const { data, isLoading } = useGetTodoQuery();
	const [createTodo] = useCreateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();
	const [deleteAll] = useDeleteAllMutation();
	const [updates] = usePatchMutation();

	// ! edit state
	const [editingId, setEditingId] = useState(null);
	const [editedTitle, setEditedTitle] = useState("");
	const [editedImg, setEditedImg] = useState("");
	const [editedPrice, setEditedPrice] = useState(0);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleEdit = (item: any) => {
		setEditingId(item._id);
		setEditedTitle(item.title);
		setEditedImg(item.img);
		setEditedPrice(item.price);
	};

	// ! save edit
	const handleSave = async (_id: number) => {
		const newData = {
			title: editedTitle,
			img: editedImg,
			price: editedPrice,
		};
		updates({ _id, newData });
		setEditingId(null);
	};

	// ! exit edit
	const handleExit = () => {
		setEditingId(null);
	};

	// ! add
	const handleAdd = async () => {
		if (title === "" || img === "" || price === 0) {
			alert("Fill in all the fields");
		} else {
			await createTodo({ title, img, price });
		}
		setTitle("");
		setImg("");
		setPrice(0);
	};

	//! delete
	const handleDelete = async (_id: number) => {
		await deleteTodo(_id);
	};

	//! delete all
	const handleDeleteAll = async () => {
		await deleteAll();
	};

	return (
		<div className={scss.Parent}>
			<div className={scss.elements}>
				<div className={scss.element_three_main_inputs}>
					<TextField
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						id="outlined-basic"
						label="Name"
						variant="outlined"
					/>
					<TextField
						value={img}
						onChange={(e) => setImg(e.target.value)}
						id="outlined-basic"
						label="Picture"
						variant="outlined"
					/>
					<TextField
						value={price}
						onChange={(e) => setPrice(+e.target.value)}
						id="outlined-basic"
						label="Price"
						variant="outlined"
					/>
				</div>
				<div className={scss.element_button}>
					<Button onClick={handleAdd} variant="outlined">
						Add
					</Button>
					<Button onClick={handleDeleteAll} variant="outlined">
						Delete All
					</Button>
				</div>
			</div>
			{isLoading ? (
				<>
					<h1>...Loading</h1>
				</>
			) : (
				<div className={scss.Main}>
					{data?.map((item) => (
						<div key={item._id}>
							{editingId === item._id ? (
								<div className={scss.edited_elements}>
									<div className={scss.edited_inputs}>
										<TextField
											value={editedTitle}
											onChange={(e) => setEditedTitle(e.target.value)}
											id="outlined-basic"
											label="Name"
											variant="outlined"
										/>
										<TextField
											value={editedImg}
											onChange={(e) => setEditedImg(e.target.value)}
											id="outlined-basic"
											label="Picture"
											variant="outlined"
										/>
										<TextField
											value={editedPrice}
											onChange={(e) => setEditedPrice(+e.target.value)}
											id="outlined-basic"
											label="Price"
											variant="outlined"
										/>
									</div>
									<div className={scss.edited_buttons}>
										<Button
											onClick={() => handleSave(item._id!)}
											variant="outlined">
											Save
										</Button>
										<Button onClick={() => handleExit()} variant="outlined">
											Exit
										</Button>
									</div>
								</div>
							) : (
								// ! rendering
								<div className={scss.parent_map}>
									<h1> {item.title}</h1>
									<img src={item.img} alt={item.title} />
									<h2>{item.price}</h2>
									<div className={scss.Buttons}>
										<Button onClick={() => handleEdit(item)} variant="outlined">
											Edit
										</Button>
										<Button
											onClick={() => handleDelete(item._id!)}
											variant="outlined">
											Delete
										</Button>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default TodoList;
