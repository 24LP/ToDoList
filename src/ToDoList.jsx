import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

function ToDoList() {
  const { control, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = React.useState([]);
  const [checkedTasks, setCheckedTasks] = React.useState([]);

  function createToast(message, type) {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast(message);
        break;
    }
  }

  const onSubmit = (data) => {
    if (data.newTask.trim() !== "") {
      setTasks((t) => [
        ...t,
        { task: data.newTask, descrip: data.newDescrip, completed: false },
      ]);
      reset({ newTask: "", newDescrip: "" });
      createToast("Task added successfully!", "success");
    } else {
      createToast("Task cannot be empty!", "warning");
    }
  };

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    createToast("Task deleted successfully!", "error");
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      createToast("Task moved up!", "info");
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      createToast("Task moved down!", "info");
    }
  }

  function toggleTaskCompletion(index) {
    const updatedTasks = [...tasks];
    const task = updatedTasks[index];
    updatedTasks[index] = { ...task, completed: !task.completed };
    setTasks(updatedTasks);
  }
  console.log(tasks);

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-wrap">
          <Controller
            name="newTask"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input type="text" placeholder="Enter a task..." {...field} />
            )}
          />
          <Controller
            name="newDescrip"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                placeholder="Enter a description..."
                {...field}
              />
            )}
          />
          <button className="add-button" type="submit">
            Add
          </button>
        </div>
      </form>

      <ol>
        {tasks.map((task, index) => (
          <li key={index} className="book">
            <span
              className="text"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.task}
            </span>
            <textarea
              className="description"
              value={task.descrip}
              readOnly
            ></textarea>
            <div className="mng-buttons">
              <button
                className="check-button"
                onClick={() => toggleTaskCompletion(index)}
              >
                ✔
              </button>
              <button className="move-button" onClick={() => moveTaskUp(index)}>
                Up
              </button>
              <button
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                Down
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
