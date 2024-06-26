import React, {useEffect, useState} from 'react';
import { Stage } from 'react-konva';
import SelectionPanel from '../../components/PanelScene/SelectionPanel/SelectionPanel';
import { useSelectionPanelInteractionContext } from '../../context/SelectionPanelInteractionContext';


/**
 * Terminology:
 * Selection Panel: The panel that contains the move selectors and direction selectors.
 * Move Selector Panel: The panel that contains the move selectors.
 * Move Selector: The selector that allows the user to choose a move.
 * Direction Selector: The selector that allows the user to choose a direction.
 */

const PanelScene = ({
    panelSize,
}) => {

    const [isPanelLocked, setIsPanelLocked] = useState(false)

    const {
        allowedRelativeMovePositions,
        initialCardinalDirectionMap,
        setRelativeHoveredPosition,
        selectedSoldierId,
        setSelectedRelativePose,
        lockSelectionPanel,
    } = useSelectionPanelInteractionContext()

    /**
     * When the Selected Soldier Id is NULL or the Panel has been locked, no Soldier is currently selected.
     */
    useEffect(() => {
        
        if (selectedSoldierId === null || lockSelectionPanel) {
            setIsPanelLocked(true)
        } else {
            setIsPanelLocked(false)
        }
    }, [selectedSoldierId, lockSelectionPanel])
    
    const [selectorSizes, setSelectorSizes] = useState({
        direction: 40,
        move: 50,
        offset: 5
    });
    
    // Update the size of the components when the panel size changes
    useEffect(() => {
        setSelectorSizes({
            direction: panelSize * 0.16,
            move: panelSize * 0.2,
            offset: panelSize * 0.02
        });
    }, [panelSize]);


    const handleMoveSelected = (selectedPosition, selectedDirection) => {
        setSelectedRelativePose({
            position: selectedPosition,
            direction: selectedDirection
        })
    }

    const handleMoveHovered = (hoveredPosition) => {
        setRelativeHoveredPosition(hoveredPosition)
    }

    return (
        <Stage width={panelSize} height={panelSize}>
            <SelectionPanel 
                allowedPositions={allowedRelativeMovePositions} 
                isPanelLocked={isPanelLocked}
                panelSize={panelSize}
                selectorSizes={selectorSizes}
                onMoveSelected={handleMoveSelected}
                onMoveHovered={handleMoveHovered}
                initialCardinalDirectionMap={initialCardinalDirectionMap}
            />
        </Stage>
    );
};

export default PanelScene;