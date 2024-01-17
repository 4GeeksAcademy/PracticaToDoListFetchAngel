import React, { useState } from "react";

//include images into your bundle


//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("")
	const [task, setTask] = useState([])

	function handleChanges(event) {
		setNewTask(event.target.value)
	}

	/*function handleKeyDown(event) {
		if (event.key === 'Enter') {
			setTarea(anterior => anterior.concat([setTarea]))
			setInputValue("")
		}
	}*/

	const addTasks = (event) => {
		event.preventDefault();

		if (newTask.trim() !== '') {

		let body = task.concat([{"label": task, "done": false}])

		fetch('https://playground.4geeks.com/apis/fake/todos/user/angeljimenez', {
			method: "PUT",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		})

			.then(resp => {
				return resp.json();
			})

			.then(data => {
				console.log(data);
					setTask([...task, newTask])
					setNewTask('')
			})
			.catch(error => {
				console.log(error)
			})
		}
	}


   function deleteTask(index) {

	let body = task.filter((_, i) => i !== index);

	fetch('https://playground.4geeks.com/apis/fake/todos/user/angeljimenez', {
		method: "PUT",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json"
		}
	})

		.then(resp => {
			return resp.json();
		})

		.then(data => {
			console.log(data);
			setTask(task.filter((_, i) => i !== index));
		})

		.catch(error => {
			console.log(error);
		});

};

return (
	<div className="container text-center">
		<h1><i class="far fa-calendar-alt container d-inline"></i>todoList</h1>
		<form onSubmit={addTasks}>
			<input type="text" onChange={handleChanges} value={newTask} placeholder="¿Qué necesito hacer?" />
		</form>
		<ul>
			{task.map((task, i) => (
				<li key={i}>{task}<i class="far fa-trash-alt" onClick={() => deleteTask(i)}></i></li>
			))}
		</ul>
		<div>{task.length}</div>
	</div>
);
};

export default Home;
