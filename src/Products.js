import React from 'react';
import { useSelector } from 'react-redux';

const filterColors = (colors) => (product) => !colors.length || colors.includes(product.color);

const filterPrices = (prices) => (product) => 
  (!prices.max || product.price <= prices.max) && (!prices.min || product.price >= prices.min);

const filterProducts = ({ products }) => {
  const { data, filters } = products;
  return data.filter(filterColors(filters.colors)).filter(filterPrices(filters.prices));
}

const Products = () => {
  const data = useSelector(filterProducts)
  return (
    <table>
      <thead>
        <tr>
          <th  className='tableHead'>Nome</th>
          <th  className='tableHead'>Cor</th>
          <th  className='tableHead'>Preço</th>
        </tr>
      </thead>
      <tbody className='tableBody'>
        {data.map(({id, name, color, price}) => <tr className='trClass' key={id}>
          <td>{name}</td>
          <td>{color}</td>
          <td>{price}</td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default Products