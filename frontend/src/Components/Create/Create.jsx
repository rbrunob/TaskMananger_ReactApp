import { FaPlus } from "react-icons/fa";
import './Create.css';
import { useState } from "react";
import PropTypes from 'prop-types';

function Create({ insertNewTask }) {

    const [value, setValue] = useState("");

    const handleCreateTask = () => {
        if (value === "") return;

        insertNewTask(value);
        setValue("");
    }

    return (
        <>
            <input type="text" placeholder="Qual a tarefa de hoje?" value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => (event.key === 'Enter') && handleCreateTask()} />
            <button className="create_task" onClick={handleCreateTask}>
                <FaPlus />
                <span>Nova Tarefa</span>
            </button>
        </>
    )
}

Create.propTypes = {
    insertNewTask: PropTypes.func.isRequired
};

export default Create;