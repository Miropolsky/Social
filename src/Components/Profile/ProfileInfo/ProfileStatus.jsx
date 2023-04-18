import React from 'react';

export default class ProfileStatus extends React.Component {
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
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };
    componentDidUpdate(prevProps, prevState) {
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
                        <input
                            autoFocus={true}
                            onBlur={this.deactivedEditMode}
                            value={this.state.status}
                            onChange={this.onStatusChange}
                        ></input>
                    </div>
                )}
            </div>
        );
    }
}
