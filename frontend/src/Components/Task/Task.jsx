import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa"
import { LiaSaveSolid } from "react-icons/lia";

import './Task.css'

import PropTypes from 'prop-types';
import classNames from "classnames";

function Task({ task, handleDelete, handleStateComplete, handleStateEditing }) {
    return (
        <>
            <div className="task">
                <input
                    className="task_checkbox"
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={() => handleStateComplete(task.id)}
                />

                <span className={classNames('task_subject', { 'complete': task.isComplete, 'editing': task.isEditing })}>
                    {task.task}
                </span>

                <div className="task_actions">
                    <span
                        className={classNames('action task_edit', { 'editing': task.isEditing })}
                        aria-label={!task.isEditing ? "Editar" : "Salvar"}
                        onClick={(event) => handleStateEditing(task.id, event)}
                    >
                        {!task.isEditing ? <FaRegEdit /> : <LiaSaveSolid />}
                    </span>

                    <span className="action task_delete" aria-label="Deletar" onClick={() => handleDelete(task.id)}>
                        <FaRegTrashAlt />
                    </span>
                </div>
            </div>
        </>
    )
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleStateComplete: PropTypes.func.isRequired,
    handleStateEditing: PropTypes.func.isRequired
}

export default Task