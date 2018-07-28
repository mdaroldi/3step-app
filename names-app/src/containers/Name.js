import React, { Component } from "react";
import { API } from "aws-amplify";
import "./Name.css";


export default class Name extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            content: ""
        };
    }

    async componentDidMount() {
        try {
            const name = await this.getScore();
            const { content } = name;

            this.setState({
                name,
                content
            });
        } catch (e) {
            alert(e);
        }
        console.log(this.state.name);
    }

    getScore() {
        return API.get("names", `/names/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    render() {
        return (
            <div className="Name">
                <h1>Resultado</h1>
                {this.state.name &&
                    <ul>
                        <li>ID: {this.state.name.userId}</li>
                        <li>Nome: {this.state.name.name}</li>

                    </ul>
                }
            </div>
        );
    }
}