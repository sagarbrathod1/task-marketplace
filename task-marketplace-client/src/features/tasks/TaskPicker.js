import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import {
  get_task_async,
  selectTasks,
  add_task
} from './taskSlice';
import styles from './Counter.module.css';

export function TaskPicker() {
  const state = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [tasks, set_tasks] = useState([]);
  const [updates, set_updates] = useState([]);


  //const incrementValue = Number(incrementAmount) || 0;

  useEffect(function () {
    (async function () {
        const config = {
            headers: { Authorization: `Bearer ${state.auth.token}` }
        };
        console.log(config);
    const response = await axios.get(
        "http://localhost:4444/api/tasks",
        config);
        console.log(response.data, "here");
        set_tasks(response.data);
    }())
  }, []);

  const handle_onChange = function (event) {
    //set_tasks(event.target.value);

  }

  const handle_submission = function (event, key) {
        //dispatch(add_task(task));
        //set_task("");
        console.log("here");

        (async function () {
            const config = {
                headers: { Authorization: `Bearer ${state.auth.token}` }
            };
            console.log("tasks ", tasks);

               const body = updates.map(async (update) => await axios.put(
                    "http://localhost:4444/api/tasks/" + update.id,
                    update,
                    config));
               const response = await axios.get(
                   "http://localhost:4444/api/tasks",
                   config);
                   console.log(response.data, "here");
                   set_tasks(response.data);

                
        // The value we return becomes the `fulfilled` action payload
        }())

        //dispatch(get_task_async());
  }


  return (
        <>
        <h1 style={{padding: 1 + "rem"}}>Task Marketplace</h1>
        <ul style={{listStyleType: "none", padding: 1 + "em", lineHeight: 1.2+ "rem"}}className="bg-black">{tasks.length >= 1 ? tasks.map((task, index) => 
            <li
                style={index % 2 === 0 ? {backgroundColor: "#9b9b9b", color: "#fff", padding: 1 + "rem"} : {padding: 1 + "rem"}} key={task.id}>
                { ! task.due || ! task.how
                  ? (
                        <div>
                            <h2>{task.description}</h2><br />
                            <label>Please enter your name if you'd like to complete this task: </label>
                            <input
                                type="text"
                                onChange={function (event) {
    

        const update = {
            id: tasks[index].id,
            due: event.target.value
        };

        const match = updates.findIndex((possible_match) => possible_match.id === tasks[index].id);
        console.log("match", match);
        if (match <= - 1) {
            set_updates([...updates, update]);
        } else {
            let updates_update = updates.map((update) => Object.assign({}, update));
            updates_update[match] = Object.assign({}, updates[match], {due: event.target.value}) 
            set_updates(updates_update);
        }
}}/>
    <br /><br /><label>When will you complete it by?: </label>
    <input
        type="text"
        onChange={function(event) {
            const update = {
                id: tasks[index].id,
                how: event.target.value
            };

            const match = updates.findIndex((possible_match) => possible_match.id === tasks[index].id);
            if (match <= -1) {
                set_updates([...updates, update]);
            } else {
                let updates_update = updates.map((update) => Object.assign({}, update));
                updates_update[match] = Object.assign({}, updates[match], {how: event.target.value}) 
                set_updates(updates_update);
        


            }

        }} /><br /><br />
    <button
        onClick={
            (event) => handle_submission(event, task.id)
        }>Choose Project</button>
    </div>
                 )
                 : (
    <div>
        <h2>{task.description}</h2>
        <div>Please enter your name if you'd like to complete this task: {task.due}</div>
        <div>When will you complete it by?: {task.how}</div>
        {!task.link ? <><label>Link Submission: </label>
        <input type="text" onChange={
            function (event) {
            const update = {
                id: tasks[index].id,
                link: event.target.value
            };

            const match = updates.findIndex((possible_match) => possible_match.id === tasks[index].id);
            if (match <= -1) {
                set_updates([...updates, update]);
            } else {
                let updates_update = updates.map((update) => Object.assign({}, update));
                updates_update[match] = Object.assign({}, updates[match], {link: event.target.value}) 
                set_updates(updates_update);
            }
            }}/>
        <button onClick={
            (event) => handle_submission(event, task.id)
        }>Submit Work</button></>
            : <><div>Link Submission</div><div>{task.link}</div></>
            }
        </div>)
                }</li>
    
    ) : "" }</ul></>);
}
