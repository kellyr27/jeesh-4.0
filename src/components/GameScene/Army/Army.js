import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector2, Raycaster } from 'three';
import Soldier from './Soldier/Soldier';
import Soldier2 from './Soldier/Soldier2';
import { useControls, folder } from 'leva';

const equalMeshes = (mesh1, mesh2) => {
    return mesh1.uuid === mesh2.uuid
}

const Army = ({
    armyNum, 
    hoveredSoldier, 
    setHoveredSoldier, 
    selectedSoldier, 
    setSelectedSoldier, 
    movingMode, 
    setMovingMode,
    currentSelectedPose, 
    setCurrentSelectedPose,
    soldier1Position,
    setSoldier1Position, 
    soldiers,
    soldierColors,
    phaseTimes
}) => {

    const { soldierDefaultColor, soldierHoveredColor, soldierSelectedColor, soldierBlockedColor } = soldierColors

    // const [soldier1Position, setSoldier1Position] = React.useState([0, 0, 0])
    const [soldier1Rotation, setSoldier1Rotation] = React.useState([0, 0, 0])

    // Update the Selected Soldiers color
    useEffect(() => {
        if (selectedSoldier) {
            selectedSoldier.material.color.set(soldierSelectedColor)
        }
    }, [selectedSoldier, soldierSelectedColor])


    // TODO: Modify and fix the following code - Works but generated by Copilot
    const selectedSoldierRef = useRef();
    const hoveredSoldierRef = useRef();

    useEffect(() => {
        if (selectedSoldierRef.current) {
            selectedSoldierRef.current.material.color.set(soldierSelectedColor);
        }
    }, [selectedSoldier, soldierSelectedColor]);

    useEffect(() => {
        if (hoveredSoldierRef.current) {
            if (!selectedSoldier || (selectedSoldier && !equalMeshes(hoveredSoldierRef.current, selectedSoldier))) {
                hoveredSoldierRef.current.material.color.set(soldierHoveredColor);
            }
        }
    }, [hoveredSoldier, selectedSoldier, soldierHoveredColor]);

    const onPointerOverHandler = (e) => {
        const soldier = e.intersections[0].object;
        if (soldier) {
            hoveredSoldierRef.current = soldier;
            setHoveredSoldier(soldier);
        }
        e.stopPropagation();
    };

    const onPointerOutHandler = (e) => {
        if (hoveredSoldierRef.current) {
            if (!selectedSoldier || (selectedSoldier && !equalMeshes(hoveredSoldierRef.current, selectedSoldier))) {
                hoveredSoldierRef.current.material.color.set(soldierDefaultColor);
            }
        }
        hoveredSoldierRef.current = null;
        setHoveredSoldier(null);
        e.stopPropagation();
    };

    const onClickHandler = (e) => {
        const soldier = e.intersections[0].object;
        if (soldier) {
            if (selectedSoldierRef.current) {
                selectedSoldierRef.current.material.color.set(soldierDefaultColor);
            }
            selectedSoldierRef.current = soldier;
            setSelectedSoldier(soldier);
        }
        e.stopPropagation();
    };

    


    return (
        <group
            onPointerOver={onPointerOverHandler}
            onPointerOut={onPointerOutHandler}
            onClick={onClickHandler}
        >
            {soldiers.map((soldier, index) => {
                   
                return (
                    <Soldier2 
                        key={index}
                        color={soldierDefaultColor}
                        soldier={soldier}
                        phaseTimes={phaseTimes}
                        movingMode={movingMode}
                        setMovingMode={setMovingMode}
                        currentSelectedPose={currentSelectedPose}
                        selectedSoldier={selectedSoldier}
                    />
                )

            })}
        </group>
    );
};

export default Army;