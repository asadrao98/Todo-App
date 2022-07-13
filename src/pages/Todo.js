import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { List, ListItem, ListItemText, Button, TextField } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import db from "../firebase";
import firebase from "firebase/compat/app";

function Todo() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	useEffect(() => {
		db.collection("todos")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setTodos(
					snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
				);
			});
	}, []);

	const addTodo = (e) => {
		e.preventDefault(); //stop refresh

		db.collection("todos").add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput("");
	};

	return (
		<div style={{ color: "white" }}>
			<HeadingDiv>
				<Heading>Todo App</Heading>
				<EventNoteIcon sx={{ fontSize: 40 }} />
			</HeadingDiv>
			<form>
				<FormWrap>
					<TodoTextField
						id="custom-css-outlined-input"
						label="Write a Todo "
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button
						disabled={!input}
						type="submit"
						onClick={addTodo}
						variant="contained"
						size="large"
						color="primary"
					>
						Add Todo
					</Button>
				</FormWrap>
			</form>
			<ListContainer>
				<ListWrap>
					{todos.length === 0 ? (
						<ListItem>
							<ListItemText primary="List is Empty" />
						</ListItem>
					) : (
						todos.map((todo) => (
							<ListItem>
								<ListItemText primary={todo.todo} secondary="" />
								<IconButton aria-label="delete" style={{color:"white"}}>
									<DeleteIcon 
                  onClick={event => db.collection('todos').doc(todo.id).delete()}
                  fontSize="medium"
                  />
								</IconButton>
							</ListItem>
						))
					)}
				</ListWrap>
			</ListContainer>
		</div>
	);
}

const HeadingDiv = styled.div`
	display: flex;
	align-items: center;
	color: white;
	width: 100%;
	@media (max-width: 768px) {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
`;

const Heading = styled.h1`
	color: white;
	font-size: 40px;
`;

const FormWrap = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		Button {
			margin-top: 15px;
		}
		.MuiFormControl-root {
			width: 250px;
		}
	}
`;

const TodoTextField = styled(TextField)({
	"& label.Mui-focused": {
		color: " white",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "white",
		},
		"&:hover fieldset": {
			borderColor: " #f3ddcd",
		},
		"&.Mui-focused fieldset": {
			borderColor: " white",
			border: "1",
		},
	},
});

const ListContainer = styled.div`
	height: 300px !important;
	width: 110%;
	overflow: auto;
	overflow-x: hidden;
	margin-top: 20px;

	@media (max-width: 768px) {
		width: 280px;
	}
`;

const ListWrap = styled(List)`
	list-style: none;
	font-size: 20px;

	li {
		border-radius: 5px;
		margin-bottom: 20px;
		background-color: #82567e;
		padding: 10px;
		width: 360px;
	}

	@media (max-width: 768px) {
		margin-top: 0;
		li {
			width: 250px;
		}
	}
`;

export default Todo;
