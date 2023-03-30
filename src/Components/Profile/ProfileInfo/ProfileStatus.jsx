import React from 'react';

export default class ProfileStatus extends React.Component {
    state = {
        editMode: false,
    };
    activedEditMode = () => {
        this.setState({ editMode: true });
    };
    deactivedEditMode = () => {
        this.setState({ editMode: false });
    };
    render() {
        return (
            <div>
                {!this.state.editMode && (
                    <div>
                        <span onDoubleClick={this.activedEditMode}>
                            {this.props.status}
                        </span>
                    </div>
                )}
                {this.state.editMode && (
                    <div>
                        <input
                            autoFocus={true}
                            onBlur={this.deactivedEditMode}
                            value={this.props.status}
                        ></input>
                    </div>
                )}
            </div>
        );
    }
}
