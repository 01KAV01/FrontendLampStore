"use client";
import React, { useState } from 'react'

interface RangeProps {
    min: number;
    max: number;
    priceValue: number;
    setInputCategory: any;
}

const Range = ({ min, max, priceValue, setInputCategory } : RangeProps) => {
    const [ currentRangeValue, setCurrentRangeValue ] = useState<number>(priceValue);

    const handleRange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCurrentRangeValue(parseInt(e.target.value));
    }

  return (
    <div>
        <label htmlFor="price-range">Выберите цену</label>
        <input
            id="price-range"
            type="range"
            min={min}
            max={max}
            value={priceValue}
            className="range range-warning"
            title="Выберите максимальную цену"
        />
        <span>{ `Максимальная цена: ₽${currentRangeValue}` }</span>
    </div>
  )
}

export default Range