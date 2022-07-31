import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import classes from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    ChangeIsDone: (e: boolean, id: string) => void
    filter:FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error,setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        }else setError('Title is required')

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onChangeHandlerDone = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.ChangeIsDone(e.currentTarget.checked, id)
    }


    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? classes.error: ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={classes.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id} className={t.isDone ? classes.isDone: ''}>
                        <input type="checkbox"  checked={t.isDone} onChange={(e) => onChangeHandlerDone(e, t.id)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === 'all' ? classes.activeFilter: ''}>All</button>
            <button onClick={onActiveClickHandler} className={props.filter === 'active' ? classes.activeFilter: ''}>Active</button>
            <button onClick={onCompletedClickHandler} className={props.filter === 'completed' ? classes.activeFilter: ''}>Completed</button>
        </div>
    </div>
}
