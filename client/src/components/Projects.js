import React, { Component } from 'react';
import axios from 'axios';

class Projects extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            done: false
        };
    }
    componentDidMount() {
        let url = 'http://localhost:8000/api/projects';
        axios
            .get(url)
            .then(res => {
                this.setState({
                    projects: res.data,
                    done: true
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if(!this.state.done) {
            return(<h1>Loading...</h1>)
        }
        return(
            <div className="projects">
                {this.state.projects.map(project => {
                    return (
                        <div key={project.id}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Projects;