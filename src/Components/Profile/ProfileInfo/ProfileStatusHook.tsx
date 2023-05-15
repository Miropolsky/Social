import React, { useEffect, useState } from 'react';

type PropsType = {
    status: string
    updateStatus: (newStatus: string, userId?: number) => void
}

export default function ProfileStatusHook(props: PropsType) {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activedEditMode = () => {
        setEditMode(true);
    };
    const deactivedEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    const onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
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
