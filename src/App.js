import "./App.css";
import Todo from "./pages/Todo";
import styled from "styled-components";

function App() {
	return (
		<Main>
			<TodoContainer>
				<Todo />
			</TodoContainer>
		</Main>
	);
}

const Main = styled.div`
	display: flex;
	justify-content: center;
	height: 100vh;
	background-image: linear-gradient(to right, #f3ddcd, #51d8d9);
`;

const TodoContainer = styled.div`
	padding: 50px;
	background-color: #94628f;
	margin-top: 50px;
	width: 360px;
	height: 500px;
	box-shadow: 1px 1px 25px 4px;
	border-radius: 5px;

	@media (max-width: 768px) {
		width: 250px;
	}
`;

export default App;
