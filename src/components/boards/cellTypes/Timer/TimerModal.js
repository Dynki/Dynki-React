import React from "react"
import { Icon, Table, Tooltip, Typography, Divider } from 'antd'
import { connect } from 'react-redux'
import * as moment from 'moment'
import styles from 'styled-components'
import * as _ from 'lodash'

import { startATimer, stopATimer, toggleShowTeamDuration } from '../../../../store/actions/boardActions'
import TimerLogs from "./TimerLogs"

const { Column, } = Table;
const { Text } = Typography

const ChildContainer = styles.div`
    align-items: center;
    border-bottom: solid;
    border-bottom-width: 1px;
    border-bottom-color: #CFD3D7;

    border-right: solid;
    border-right-width: 1px;
    border-right-color: #CFD3D7;

    background-color: #EFF1F3;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: flex-start;
    min-width: 174px;
    padding-left: 15px;
`

const TimerControl = styles.div`
    display: flex;
    flex-direction: row;
`

const TimerLabel = styles.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    width: 100%;
`

const StartIcon = styles(Icon)`
    font-size: 21px;

    & svg {
        fill: #3095DE;
    }
`

const PauseIcon = styles(Icon)`
    font-size: 21px;

    & svg {
        fill: #CFD3D7;
    }
`

const TeamIcon = styles(Icon)`
    cursor: pointer;
    font-size: 21px;
    margin-right: 10px;

    & svg {
        fill: ${props => props.showTeamDuration ? '#00D084;' : '#CFD3D7;'
    }
`

const TimerModal = ({ groupKey, model, rowId, rowValue, startATimer, stopATimer, toggleShowTeamDuration, user }) => {

    const [interval, assignInterval] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [started, setStarted] = React.useState(undefined)
    const [tooltip, setTooltip] = React.useState(undefined)
    const [hours, setHours] = React.useState(undefined)
    const [minutes, setMinutes] = React.useState(undefined)
    const [seconds, setSeconds] = React.useState(undefined)
    const [showTeamDuration, setShowTeamDurtion] = React.useState(true)


    const onClick = () => {
        setVisible(true)
    }

    const overlay = () => {
        return (
            <TimerLogs 
                duration={`${hours ? hours+'h' : ''} ${minutes ? minutes+'m' : '0m'} ${seconds ? seconds+'s' : '0s'}`}
                entries={rowValue ? rowValue.timerValues : null} 
            />
        )
    }

    const onVisibleChange = visible => {
        setVisible(visible)
    };

    const saveTooltip = node => {
        setTooltip(node)
    };

    const toggle = () => {
        // Currently running so we are about to stop timer.
        if (started) {
            stopATimer(model, rowId, groupKey)
        } else {
            startATimer(model, rowId, groupKey)
        }

        setStarted(!started)
    }

    const onToggleShowTeamDuration = () => {
        toggleShowTeamDuration(model, rowId, groupKey)
    }

    React.useEffect(() => {
        console.log('rowVal', rowValue)
        setStarted(rowValue ? rowValue.running : false)

        if (rowValue) {
            if (rowValue.running) {
                const duration = moment.duration(rowValue.totalDuration)
                setMinutes(duration.minutes())
                setHours(duration.hours())
                setSeconds(duration.seconds())
            }

            console.log('rowVal', rowValue)
            setShowTeamDurtion(rowValue.userData?.[user.uid]?.showTeamDuration || true)
        }
    }, [rowValue])

    React.useEffect(() => {
        if (started) {

            assignInterval(setInterval(() => {
                const currentTime = moment()
                const startedAt = moment(rowValue.startedAt)
                const duration = moment.duration(currentTime.diff(startedAt) + rowValue.totalDuration)

                setMinutes(duration.minutes())
                setHours(duration.hours())
                setSeconds(duration.seconds())

           }, 1000))
        } else {
            clearInterval(interval)

            if (rowValue) {
                const duration = moment.duration(rowValue.totalDuration)
                setMinutes(duration.minutes())
                setHours(duration.hours())
                setSeconds(duration.seconds())
            }
        }
      }, [started]);

    return (
            <ChildContainer>
                <TimerControl onClick={toggle}>
                    {started ? 
                        <PauseIcon type="pause-circle" theme="filled" />
                        :
                        <StartIcon type="play-circle" theme="filled" />
                    }

                </TimerControl>
                <Tooltip
                    visible={visible}
                    prefixCls={"ant-popover"}
                    overlay={overlay}
                    ref={saveTooltip}
                    onVisibleChange={onVisibleChange}
                    trigger="click"
                    placement="bottomLeft"
                >
                    <TimerLabel onClick={onClick}>
                        <Text strong>{`${hours ? hours+'h' : ''} ${minutes ? minutes+'m' : '0m'} ${seconds ? seconds+'s' : '0s'}`}</Text>
                    </TimerLabel>
                </Tooltip>
                <TimerControl>
                    <Tooltip placement="topLeft" title={showTeamDuration ? 'Hide team duration' : 'Show team duration'}>
                        <TeamIcon type="team" showTeamDuration={showTeamDuration} onClick={onToggleShowTeamDuration}/>
                    </Tooltip>
                </TimerControl>
            </ChildContainer>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        startATimer: (model, rowId, groupKey) => dispatch(startATimer(model, rowId, groupKey)),
        stopATimer: (model, rowId, groupKey) => dispatch(stopATimer(model, rowId, groupKey)),
        toggleShowTeamDuration: (model, rowId, groupKey) => dispatch(toggleShowTeamDuration(model, rowId, groupKey))
    }
}

const mapStateToProps = state => {
    return{
      board: state.boards.currentBoard,
      user: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerModal)
