import React, { Component } from 'react';
import axios from 'axios';
import { Card, Header, Form, Input, Icon, Button } from 'semantic-ui-react';

let endpoint = "http://localhost:9000";

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            items: []

        };
    }
    componentDidMount() {
        this.getTask();
    }

    onSubmit = () => {
        const { task } = this.state;
        axios.post(endpoint + "/api/task", { task, },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            }
        )
            .then(res => {
                this.getTask();
                this.setState({ task: "" });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    }

    getTask = () => {
        axios.get(endpoint + "/api/task")
            .then((res) => {
                const items = res.data.map((item) => {
                    let color = "yellow";
                    let style = {
                        wordWrap: "break-word",
                    };
                    if (item.status) {
                        color = "green";
                        style["textDecorationLine"] = "line-through";
                    }
                    return (
                        <Card color={color} style={style} key={item._id} className="rough">
                            <Card.Content>
                                <Card.Header textAlign="left">
                                    <div style={style}>{item.task}</div>
                                </Card.Header>

                                <Card.Meta textAlign="right">
                                    <Icon name="check circle" color="green" onClick={() => this.updateTask(item._id)} />
                                    <span style={{ paddingRight: "10px" }}>Undo</span>
                                    <Icon name="delete" color="red" onClick={() => this.deleteTask(item._id)} />
                                    <span style={{ paddingRight: "10px" }}>Delete</span>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    );
                });

                this.setState({
                    items: items.length > 0 ? items : [],
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    updateTask = (id) => {
        axios.put(endpoint + "/api/undo/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
            .then((res) => {
                console.log(res);
                this.getTask();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    undoTask = (id) => {
        axios.put(endpoint + "/api/undoTask/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
            .then((res) => {
                console.log(res);
                this.getTask();
            })
            .catch((err) => {
                console.error(err);
            });
    }

    deleteTask = (id) => {
        axios.delete(endpoint + "/api/deleteTask/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
            .then((res) => {
                this.getTask();
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <Header className='header' as='h2' color='teal'>To Do List</Header>
                </div>
                <div className='row'>
                    <form onSubmit={this.onSubmit}>

                        <Input type="text" name="task" placeholder="Enter Task" value={this.state.task} onChange={this.onChange} fluid />
                        {/*Button */}

                    </form>
                </div>
                <div className='row'>
                    <Card.Group itemsPerRow={3}>
                        {this.state.items}
                    </Card.Group>
                </div>

            </div>
        );
    }
}


export default ToDoList;