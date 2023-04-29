import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUniqueColors, changeFilters } from './store/products';


const Filter = () => {
  const colors = useSelector(selectUniqueColors)
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [selectedColors, setSelectedColors] = React.useState([]);


  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(changeFilters({ name: 'colors', value: selectedColors}))
  }, [selectedColors, dispatch])

  React.useEffect(() => {
    dispatch(
      changeFilters({
        name: 'prices',
        value: {
          min: Number(minPrice),
          max: Number(maxPrice),
        },
      }),
    );
  }, [minPrice, maxPrice, dispatch])
  function handleChange({target}) {
    if(target.checked) {
      setSelectedColors([...selectedColors, target.value]);
    } else {
    setSelectedColors(
      selectedColors.filter((color) => color !== target.value)
    );
  }
}

function handleChecked(color) {
  return selectedColors.includes(color)
}

  return (
    <div>
      <input 
      type="number"
      value={minPrice}
      placeholder='Min'
      onChange={({target}) => setMinPrice(target.value <= 60 ? target.value : 0)} />

      <input 
      type="number"
      className='input'
      value={maxPrice}
      placeholder='Max'
      onChange={({target}) => setMaxPrice(target.value <= 60 ? target.value : 0)} />
      {colors.map((color) => (
        <label key={color} className='checkbox'>
        <input className='input' type="checkbox"
        value={color}
        checked={handleChecked(color)}
        onChange={handleChange} />
        {color}
      </label>
      ))}
      
    </div>
  )
}

export default Filter