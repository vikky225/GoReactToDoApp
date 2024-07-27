import React, {Component} from 'react';
import axios from 'axios';
import {Card, Header, Form,Input,Icon,Button} from 'semantic-ui-react';

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
    
    getTask() {
        axios.get(endpoint + "/todos")
        .then(res => {
            this.setState({todos: res.data});
        })
        .catch(err => {
            console.log(err);
        });
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <Header className= 'header' as='h2' color='teal'>To Do List</Header>
                </div>
                <div className='row'>
                    <form onSubmit={this.onSubmit}> 
                    
                    <Input type="text" name="task" placeholder="Enter Task" value={this.state.task} onChange={this.onChange} fluid />
                    
                    </form>
                </div>
            
            </div>                  
        );
    }
}

export default ToDoList;