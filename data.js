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
      carModel: 'Tesla Model',
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
  

  export const updateItem = (item) => {
    const { id, name, description, price } = item;
    const index = data.findIndex((item) => item.id === id);
  
    if (index !== -1) {

    // If the item exists, update its properties
    data[index] = {
    id,
    name,
    description,
    price,
    };
      return true; // Return true for successful update
    }
  
    return false; // Return false if the item was not found
  }


  export const addItem = () => {
    data.push(items);
    return items;
  }
  
  export const deleteItem = () => {
    return true;
  }


  export const getAll = () => {
    return items;
  }
  
  export const getItem = (key) => {
    return items.find(item => item.id === key);
  }


  // export { getAll, getItem };




  