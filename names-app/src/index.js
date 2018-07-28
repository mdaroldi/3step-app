import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import Amplify from "aws-amplify";
import config from "./config";

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: "us-east-1",
        userPoolId: "us-east-1_duG77FsBf",
        identityPoolId: "us-east-1:937c258a-b437-4d5b-8cbb-00de158f4849",
        userPoolWebClientId: "3a4bn2hrnuh4j3slqsqpu1485f"
    },
    API: {
        endpoints: [
            {
                name: "names",
                endpoint: "https://0cio16i5cb.execute-api.us-east-1.amazonaws.com/prod/",
                region: "us-east-1"
            }
        ]
    }
});

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
registerServiceWorker();