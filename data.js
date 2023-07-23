const items = [
    {
      id: 1,
      carModel: 'Honda Civic',
      color: 'Black',
      price: 25000,
      year: 2021
    },
    {
      id: 2,
      carModel: 'Toyota Camry',
      color: 'White',
      price: 30000,
      year: 2022
    },
    {
      id: 3,
      carModel: 'Ford Mustang',
      color: 'Red',
      price: 45000,
      year: 2020
    },
    {
      id: 4,
      carModel: 'Tesla Model S',
      color: 'Blue',
      price: 70000,
      year: 2023
    },
    {
      id: 5,
      carModel: 'Chevrolet Corvette',
      color: 'Yellow',
      price: 60000,
      year: 2021
    }
  ];
  
  export function getAll() {
    return items;
  }
  
  export function getItem(key) {
    return items.find(item => item.id === key);
  }


  // export { getAll, getItem };




  