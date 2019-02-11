/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import BoardRowForm from './BoardRowForm';
import BoardRowMenu from './BoardRowMenu';
import { Tooltip } from 'antd';
import SelectCellModal from './cellTypes/Select/SelectCellModal';

class BoardRow extends React.Component {

    constructor(props) {
        super();
        this.state = { hovering: false };
    }

    mouseEnter() {
        this.setState({ hovering: true });
    }

    mouseLeave() {
        this.setState({ hovering: false });
    }

    renderSwitch = (col, idx) => {
        const {...restProps} = this.props;
        switch(col.class) {
            case 'text': 
             return <BoardRowForm
                    onUpdateBoard={this.props.onUpdateBoard}
                    board={this.props.board}
                    rowIdx={this.props.rowIdx}
                    rowId={this.props.rowId}
                    colIdx={idx}
                    modelName={col.model}>
                </BoardRowForm>;

            case 'select':
                return <div className="table__row__cell__container--nopadding">
                  <SelectCellModal col={col} rowId={this.props.rowId} {...restProps }></SelectCellModal>
                </div>
        
            default:
                return null;
        }
    }

    render() {
        return (
            <>
                {this.props.board.columns.map((c, idx) => {
                    const isFirst = idx === 0;

                    return <td
                        key={idx}
                        className="table__row"
                        onMouseEnter={this.mouseEnter.bind(this)}
                        onMouseLeave={this.mouseLeave.bind(this)}
                    >
                    <div className="row__content">
                        {isFirst ? <BoardRowMenu hovering={this.state.hovering} rowIdx={this.props.rowIdx}></BoardRowMenu> : null }
                        {isFirst ?
                                <Tooltip title="Drag me">
                                    <div
                                        {...this.props.provided.dragHandleProps}
                                        className="draghandle"
                                        tabIndex="0">
                                    </div>
                                </Tooltip>
                        : null }
                        <div key={idx} className={idx === 0 ? "row__content__column--first" : "row__content__column"}>
                            {this.renderSwitch(c, idx)}
                        </div>
                        {idx === this.props.board.columns.length-1 ? 
                            <div className="row__terminator" tabIndex="-1">
                                <div className="row__terminator__body"></div>
                                <div className="row__terminator__border"></div>
                            </div>
                            :
                            null 
                        }
                    </div>
                </td>
            })}
            </>
        )
    }
}

export default BoardRow;