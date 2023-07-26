import { Input } from 'antd';
import React from 'react';

type PropsType = {
    status: string;
    authorizedUserId: number | null;
    userId: number | null;
    updateStatus: (newStatus: string | null, userId: number | null) => void;
};

type StateType = {
    editMode: boolean;
    status: string;
};

export default class ProfileStatus extends React.Component<
    PropsType,
    StateType
> {
    state = {
        editMode: false,
        status: this.props.status,
    };
    activedEditMode = () => {
        this.setState({ editMode: true });
    };
    deactivedEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.status, this.props.authorizedUserId);
    };
    onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status });
        }
    }
    render() {
        if (
            this.props.userId &&
            this.props.userId !== this.props.authorizedUserId
        ) {
            return (
                <div>
                    <span>{this.props.status || '-----'}</span>
                </div>
            );
        }
        return (
            <div>
                {!this.state.editMode && (
                    <div>
                        <span onDoubleClick={this.activedEditMode}>
                            {this.props.status || '-----'}
                        </span>
                    </div>
                )}
                {this.state.editMode && (
                    <div>
                        <Input
                            style={{ width: '30%' }}
                            autoFocus={true}
                            onBlur={this.deactivedEditMode}
                            value={this.state.status}
                            onChange={this.onStatusChange}
                        />
                    </div>
                )}
            </div>
        );
    }
}
