import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {
  get_task_async,
  selectTasks,
  add_task
} from './taskSlice';
import styles from './Counter.module.css';

export function Task() {
  const state = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [task, set_task ] = useState("");

  //const incrementValue = Number(incrementAmount) || 0;

  /* useEffect(function () {

        dispatch(get_task_async());
  }, [tasks]);*/

  const handle_onChange = function (event) {
    set_task(event.target.value);

  }

  const handle_submission = function () {
        //dispatch(add_task(task));
        set_task("");
        console.log("here");
        (async function () {
            const config = {
                headers: { Authorization: `Bearer ${state.auth.token}` }
            };
            console.log(config);
        const response = await axios.post(
            "http://localhost:4444/api/tasks",
            {task},
            config);
        // The value we return becomes the `fulfilled` action payload
            console.log(response.data, "here");
            set_task("");
        }())

  }
  return (
    <div>
        <h1>Please enter a task.</h1>
        <input type="text" onChange={handle_onChange} value={task}/>
        <button onClick={handle_submission}>Upload</button>
        {/*<ul>{tasks.length >= 1 ? tasks.map((task, index)=> <li className={index % 2 === 0 ? "bg-gray-100 text-black" : ""}>{task}</li>) : "" }
        </ul>*/}


    </div>
  );
}
