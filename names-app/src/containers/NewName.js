import React, { Component } from "react";
import { FormGroup, FormControl, ListGroupItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import "./NewName.css";

export default class NewName extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            content: "",
            score: null
        };
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.createScore({
                content: this.state.content
            });
            this.props.history.push(`/names/${this.state.content}`);
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    handleNoteClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
      }

    createScore(number) {
        return API.get("names", `/names/${number.content}`);
    }

    renderScore(content) {
        return (
            <div className="names">
                <ListGroupItem
                    key={content}
                    href={`/names/${content}`}
                    header={content.trim().split("\n")[0]}
                >
                    {"Created: " + new Date(content.createdAt).toLocaleString()}
                </ListGroupItem>
            </div>
        )
    }

    render() {
        return (
            <div className="NewName">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.content}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        text="Pesquisa ID"
                        loadingText="Procurando…"
                    />
                </form>
            </div>
        );
    }
    
}