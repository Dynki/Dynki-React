import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import BoardRowHeader from './BoardRowHeader';
import BoardRow from './BoardRow';

const BoardTable = (props) => {

    const {group, groupKey} = props;

    return (
        <table className="table" key={groupKey}>
            <Droppable droppableId={group.id}>
            {provided => (
                <React.Fragment>
                    <thead>
                        <BoardRowHeader groupKey={groupKey} onUpdateBoard={props.onUpdateBoard} board={props.board}></BoardRowHeader>
                    </thead>
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>

                        {!group.collapsed && group.entities ? group.entities.map((r, idx) => (
                            <Draggable key={idx} draggableId={r.id} index={idx}>
                                {provided => (
                                    <tr ref={provided.innerRef} {...provided.draggableProps} className="table__rc">                    
                                        <BoardRow 
                                            key={idx}
                                            onUpdateBoard={props.onUpdateBoard}
                                            rowIdx={idx}
                                            rowId={r.id}
                                            board={props.board}
                                            provided={provided}
                                            groupKey={groupKey}
                                            >
                                        </BoardRow>
                                    </tr>
                                )}
                            </Draggable>
                        )) : null}
                        {provided.placeHolder}
                    </tbody>
                </React.Fragment>
            )}
            </Droppable>
        </table>        
    )
}

export default BoardTable;