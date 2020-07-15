import React, { Component } from "react";
import Container from "./components/container/Container";
import SetTimer from "./components/SetTimer/SetTimer";
import classes from "./App.module.css";

class App extends Component {
    state = {
        breakCount: 5,
        sessionCount: 25,
        clockCount: 25 * 60,
        currentTimer: "Session",
        isPlaying: false,
    };

    constructor(props) {
        super(props);
        this.loop = undefined;
    }

    componentWillMount() {
        clearInterval(this.loop);
    }

    convertToTime = (count) => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return `${minutes}:${seconds}`;
    };

    handleLengthChange = (count, timerType) => {
        const {
            sessionCount,
            breakCount,
            isPlaying,
            currentTimer,
        } = this.state;

        let newCount;
        if (timerType === "session") {
            newCount = sessionCount + count;
        } else {
            newCount = breakCount + count;
        }

        if (newCount > 0 && newCount < 61 && !isPlaying) {
            this.setState({
                [`${timerType}Count`]: newCount,
            });

            if(currentTimer.toLowerCase() === timerType) {
                this.setState({
                    clockCount: newCount * 60
                });
            }
        }
    };

    handlePlayPause = () => {
        if (this.state.isPlaying) {
            clearInterval(this.loop);
            this.setState({ isPlaying: false });
        } else {
            this.setState({ isPlaying: true });
            this.loop = setInterval(() => {
                const {
                    clockCount,
                    currentTimer,
                    breakCount,
                    sessionCount,
                } = this.state;
                if (clockCount === 0) {
                    this.setState({
                        currentTimer:
                            currentTimer === "Session" ? "Break" : "Session",
                        clockCount:
                            currentTimer === "Session"
                                ? breakCount * 60
                                : sessionCount * 60,
                    });
                } else {
                    this.setState({
                        clockCount: clockCount - 1,
                    });
                }
            }, 1000);
        }
    };

    handleReset = () => {
        this.setState({
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: "Session",
            isPlaying: false,
        });
        clearInterval(this.loop);
    };

    // handleBreakDecrease = () => {
    //     const { breakCount, isPlaying, currentTimer } = this.state;
    //     if (breakCount > 1) {
    //         if (!isPlaying && currentTimer === "Break") {
    //             this.setState({
    //                 breakCount: breakCount - 1,
    //                 clockCount: (breakCount - 1) * 60,
    //             });
    //         } else {
    //             this.setState({
    //                 breakCount: breakCount - 1,
    //             });
    //         }
    //     }
    // };

    // handleBreakIncrease = () => {
    //     const { breakCount, isPlaying, currentTimer } = this.state;
    //     if (breakCount < 60) {
    //         if (!isPlaying && currentTimer === "Break") {
    //             this.setState({
    //                 breakCount: breakCount + 1,
    //                 clockCount: (breakCount + 1) * 60,
    //             });
    //         } else {
    //             this.setState({
    //                 breakCount: breakCount + 1,
    //             });
    //         }
    //     }
    // };

    // handleSessionDecrease = () => {
    //     const { sessionCount, isPlaying, currentTimer } = this.state;
    //     if (sessionCount > 1) {
    //         if (!isPlaying && currentTimer === "Session") {
    //             this.setState({
    //                 sessionCount: sessionCount - 1,
    //                 clockCount: (sessionCount - 1) * 60,
    //             });
    //         } else {
    //             this.setState({
    //                 sessionCount: sessionCount - 1,
    //             });
    //         }
    //     }
    // };

    // handleSessionIncrease = () => {
    //     const { sessionCount, isPlaying, currentTimer } = this.state;
    //     if (sessionCount < 60) {
    //         if (!isPlaying && currentTimer === "Session") {
    //             this.setState({
    //                 sessionCount: sessionCount + 1,
    //                 clockCount: (sessionCount + 1) * 60,
    //             });
    //         } else {
    //             this.setState({
    //                 sessionCount: sessionCount + 1,
    //             });
    //         }
    //     }
    // };

    render() {
        const {
            breakCount,
            sessionCount,
            clockCount,
            currentTimer,
            isPlaying,
        } = this.state;

        const breakProps = {
            title: "Break Time",
            count: breakCount,
            handleDecrease: () => this.handleLengthChange(-1, "break"),
            handleIncrease: () => this.handleLengthChange(1, "break"),
        };

        const sessionProps = {
            title: "Session Time",
            count: sessionCount,
            handleDecrease: () => this.handleLengthChange(-1, "session"),
            handleIncrease: () => this.handleLengthChange(1, "session"),
        };

        return (
            <div className={classes.App}>
                <h1 className={classes.Title}>Pomodoro Clock</h1>
                <Container
                    isPlaying={isPlaying}
                    clockCount={this.convertToTime(clockCount)}
                    currentTimer={currentTimer}
                    clickedPlayPause={this.handlePlayPause}
                    clickedReset={this.handleReset}
                />
                <div className={classes.Timer}>
                    <SetTimer {...breakProps} />
                    <SetTimer {...sessionProps} />
                </div>
            </div>
        );
    }
}

export default App;
