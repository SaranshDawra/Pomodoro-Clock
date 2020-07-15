import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import classes from "./SetTimer.module.css";

class SetTimer extends Component {
    render() {
        return (
            <div className={classes.mainTimer}>
                <h1>{this.props.title}</h1>
                <div className={classes.SetTimer}>
                    <button
                        className={classes.button}
                        onClick={this.props.handleDecrease}
                    >
                        <FaMinus className={classes.icon}/>
                    </button>
                    <span className={classes.count}>{this.props.count}</span>
                    <button
                        className={classes.button}
                        onClick={this.props.handleIncrease}
                    >
                        <FaPlus className={classes.icon}/>
                    </button>
                </div>
            </div>
        );
    }
}

export default SetTimer;
