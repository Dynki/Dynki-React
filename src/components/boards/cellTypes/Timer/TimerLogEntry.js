import React from "react"
import * as moment from 'moment'
import styles from 'styled-components'
import { Avatar, Icon, Popconfirm, Typography, Tooltip } from 'antd'
import * as _ from 'lodash'

const { Text } = Typography

const Container = styles.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 50px;
    justify-content: space-between;
    width: 460px;
`
const LogLabel = styles(Text)`
    // margin: 10px!important;
`

const StyledAvatar = styles(Avatar)`
    // margin-right: 10px;
`

const DeleteIcon = styles(Icon)`
    font-size: 21px;
    margin-left: 20px;

    & svg {
        fill: #FF4D4F;
    }
`

const ActiveIcon = styles(Icon)`
    font-size: 21px;
    margin-left: 20px;

    & svg {
        fill: #CFD3D7;
    }
`


const TimerLogs = ({ entry, onDelete }) => {

    if (!entry) {
        return null
    }

    const date = moment(entry.start).format('ddd DD')
    const timeFrom = moment(entry.start).format('hh:mm:ss A')
    const timeTo = moment(entry.end).format('hh:mm:ss A')
    const days = _.padStart(moment.duration(entry.duration).days(), 2, '0')
    const hours = _.padStart(moment.duration(entry.duration).hours(), 2, '0')
    const minutes = _.padStart(moment.duration(entry.duration).minutes(), 2, '0')
    const seconds = _.padStart(moment.duration(entry.duration).seconds(), 2, '0')

    return (
        <Container>
            <StyledAvatar size="small">A</StyledAvatar>
            <LogLabel>{date}</LogLabel>
            <LogLabel>{`${timeFrom} - ${timeTo}`}</LogLabel>
            <LogLabel>{`${days === '00' ? '' : days+':'}${hours}:${minutes}:${seconds}`}</LogLabel>
            {entry.running ? 
                <Tooltip title="Currently running">
                    <ActiveIcon type="stop"/>
                </Tooltip>
                :
                <Popconfirm title="Delete entry?" cancelText="Hell no!" okText="Yes please" placement="leftTop">
                    <DeleteIcon type="close-circle"/>
                </Popconfirm>
            }

        </Container>
    )
}

export default TimerLogs
