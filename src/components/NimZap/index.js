/**
 * Created by J.Vidya Sagar on 12/10/20.
 */

import React, { useState, useEffect } from 'react'

import {ToggleButton} from 'react-bootstrap'
import {ButtonGroup} from 'react-bootstrap'


export default function NimZap(props) {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'PLAYER', value: '1' },
        { name: 'COMPUTER', value: '2' },
    ];

    console.log("NimZap: start")

    return (
        <>
            <fieldset>
                <legend>First mover</legend>
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>

                    ))}
                </ButtonGroup>
            </fieldset>
        </>
    );
}
