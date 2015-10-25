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

// takes array
// takes single value
// does not take array that contains arrays
function main(){
  var test = [1,2,3];
  test = test.toRowVector()
  return 
}