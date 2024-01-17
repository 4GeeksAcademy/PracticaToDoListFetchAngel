import React, { useEffect, useState } from "react";

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

		if (newTask.trim() !== '' && event.key === 'Enter') {

			let body = task.concat([{ "label": newTask, "done": false }])

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
					setTask(body)
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

	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/angeljimenez')
			.then(response => response.json())
			.then(data => setTask(data))
			.catch(error => console.error('Error al obtener tareas:', error));
	}, []);

	return (
		<div className="container text-center">
			<h1><i className="far fa-calendar-alt container d-inline"></i>todoList</h1>
			<form onSubmit={addTasks}>
				<input type="text" onChange={handleChanges} onKeyUp={addTasks} value={newTask} placeholder="¿Qué necesito hacer?" />
			</form>
			<ul>
				{task.map((task, i) => (
					<li key={i}>{task.label}<i className="far fa-trash-alt" onClick={() => deleteTask(i)}></i></li>
				))}
			</ul>
			<div>{task.length}</div>
		</div>
	);
};

export default Home;
