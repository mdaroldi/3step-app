import React, { Component } from "react";
import { API } from "aws-amplify";

export default class Name extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            content: ""
        }
    }

    async componentDidMount() {
        try {
            const name = await this.getName();
            const { content } = name;
            console.log(name)

            this.setState({
                name,
                content
            });
        } catch (e) {
            alert(e);
        }
    }

    getName() {
        return API.get("names", `names/${this.props.match.params.id}`);
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {

        return (
            <div className="Name">
                {this.state.name && 
                <div>
                    Welcome to Modclima, { this.state.name.name }
                </div>
                    }
            </div>
        );
    }
}