document.getElementById('my_form').addEventListener('submit', function(event){
    event.preventDefault();
    
    
    var order_details = {
      Price: document.getElementById('price').value,
      Dish: document.getElementById('dish').value,
      Table: document.getElementById('table').value
  };
  
  axios.post('https://crudcrud.com/api/a04da9f7b9214b7bb11547cbeaad6204/order_details', order_details)
      .then(function(response) {
        console.log(response.data);
  
        window.location.reload();
        
        
      })
      .catch(function(error) {
        console.error(error);
      });
  });

window.onload = function(){
    axios.get('https://crudcrud.com/api/a04da9f7b9214b7bb11547cbeaad6204/order_details')
    .then(function(response){
        for (var i=0; i<response.data.length; i++){
            console.log(response);
            displayOnScreen(response.data[i]); 
        }

    })
    .catch(function(error){
        console.error(error);
    });
}

function displayOnScreen(order_details) {
    var result = document.createElement('div');
    result.setAttribute('id', 'result_' + order_details._id);

    var priceDetails = document.createElement('p');
    priceDetails.textContent = "Price: " + order_details.Price;

    var dishDetails = document.createElement('p');
    dishDetails.textContent = "Dish: " + order_details.Dish;

    var tableSelect = document.createElement('p');
    tableSelect.textContent = "Table: " + order_details.Table;
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.style.color = "white";
    deleteButton.style.background = "red";

    deleteButton.addEventListener('click', function(event){

        event.preventDefault();
        
        event.stopPropagation();

        deleteFormData(order_details._id, result);

    })

    result.appendChild(priceDetails);
    result.appendChild(dishDetails);
    result.appendChild(tableSelect);
    result.appendChild(deleteButton);

    var display1 = document.getElementById('Table-1');

    var display2 = document.getElementById('Table-2');

    var display3 = document.getElementById('Table-3');
    

    if (tableSelect.textContent === "Table: Table 1") {
        display1.appendChild(result);  
    } else if (tableSelect.textContent === "Table: Table 2") {
        display2.appendChild(result);
    } else if (tableSelect.textContent === "Table: Table 3") {
        display3.appendChild(result);
    }
};

function deleteFormData(orderId, result){
    axios.delete(`https://crudcrud.com/api/a04da9f7b9214b7bb11547cbeaad6204/order_details/${orderId}`) 
    .then(function(response){
        console.log(response);
        if (response.status === 200) {
            result.remove();
        }
    })
    .catch(function(error){
        console.error(error);
    });
};