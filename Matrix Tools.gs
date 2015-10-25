// Takes an Array that contains only Strings and Numbers and produces a column vector
Object.defineProperty(Object.prototype, "toColumnVector", {value: function(){
  if (this.constructor !== Array){
    throw("typeError", "The object is not an array");
  }
  var output = [];
  for (var i = 0; i < this.length; i++){
    if (typeof this[i] !== "number" && typeof this[i] !== "string"){
      throw("typeError", "The element is not a number or string");
    } else {
      output.push([this[i]]); 
    }
  }
  return output;
}});

// Takes an Array that contains only Strings and Numbers and produces a row vector
Object.defineProperty(Object.prototype, "toRowVector", {value: function(){
  if (this.constructor !== Array){
    throw("typeError", "The object is not an array");
  }
  for (var i = 0; i < this.length; i++){
    if (typeof this[i] !== "number" && typeof this[i] !== "string"){
      throw("typeError", "The element is not a number or string");
    }
  }
  return [this];  
}});


// Transposes an array of arrays
// The sub arrays have to have the same length
// TODO: support ragged arrays
Object.defineProperty(Object.prototype, "transpose", {value: function(){
  if (this.constructor !== Array){
    throw("typeError", "The object is not an array of arrays");
  }
  var output = [];
  for (var row = 0; row < this.length; row++) {
    for (var col = 0; col < this[row].length; col++) {
      if (typeof this[row][col] !== "number" && typeof this[row][col] !== "string"){
        throw("typeError", "The element is not a number or string");
      }
      
      if (row === 0){
        output.push([this[row][col]]); 
      } else {
        if (this[row].length !== this[0].length){
          throw("rangeError", "Row " + row + 1 + " is not the same length as the first");
        }
        output[col].push(this[row][col]); 
      }
    }
  }
  return output;
}});
