import React from "react";
import classes from "./Container.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaSync } from "react-icons/fa";

const Container = (props) => {
    const btnPlayPause = props.isPlaying ? <FaPause /> : <FaPlay />;
    return (
        <div className={classes.Container}>
            <h1 className={classes.Title}>{props.currentTimer}</h1>
            <span className={classes.Count}>{props.clockCount}</span>
            <div className={classes.btnContainer}>
                <button onClick={props.clickedPlayPause}>
                    {btnPlayPause}
                </button>
                <button onClick={props.clickedReset}>
                    <FaSync />
                </button>
            </div>
        </div>
    );
};

export default Container;
