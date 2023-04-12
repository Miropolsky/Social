import React, { useEffect, useState } from 'react';

export default function ProfileStatusHook(props) {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activedEditMode = () => {
        setEditMode(true);
    };
    const deactivedEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);
    return (
        <div>
            {editMode && (
                <div>
                    <span onDoubleClick={activedEditMode}>
                        {status || '-----'}
                    </span>
                </div>
            )}
            {editMode && (
                <div>
                    <input
                        autoFocus={true}
                        onBlur={deactivedEditMode}
                        value={status}
                        onChange={onStatusChange}
                    ></input>
                </div>
            )}
        </div>
    );
}
