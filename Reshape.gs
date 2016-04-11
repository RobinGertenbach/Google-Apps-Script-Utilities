  // Length 0
  // Length 1
  // Length 2
  // Test all id vars are in Object
  // Test remove duplicate ID Vars
  //Fieldnames cannot be measure or value
function melt(data) {
  
  var output = {};  
  var columns = Object.keys(data);

  var varArgs = objectToArray(arguments);
  var idCols = varArgs;
  idCols.splice(0, 1);
  
  var valCols = columns.filter(function(x) {return varArgs.indexOf(x) === -1})

  // Create ID columns
  for (var col = 1; col < arguments.length; col++) {
    output[arguments[col]] = [];
  } 
  output.measure = [];
  output.value = [];

  // Append data
  for (var measure = 0; measure < valCols.length; measure++) {
    for (var id = 0; id < idCols.length; id++) {
      output[idCols[id]] = output[idCols[id]].concat(data[idCols[id]]);
    }
    for (var id = 0; id < valCols.length; id++) {
      output.measure = output.measure.concat(repeat(valCols[id], 
                                                    data[valCols[id]].length));
      output.value = output.value.concat(data[valCols[id]]);
    }
  }
  
  return output;
}


function table(data, headers) {
  if (!isRectangularArray(data)) {throw "Data not unragged array of arrays"}
  if (!(headers < data.length && headers >= -1)) {
    throw "Header is " + headers + " must be between -1 and " + data.length;
  }

  headers = (headers ===  undefined ? 0 : headers);
  var output = {};

  // Create Columns
  for (var col = 0; col < data[0].length; col++) {
    output[(headers === -1 ? "Col " + col : data[headers][col])] = [];
  }
  
  // Fill columns
  for (var row = 0; row < data.length; row++) {
    if(row !== headers) {
      for (var col = 0; col < data[row].length; col++) {
        output[(headers === -1 ? 
          "Col " + col : 
          data[headers][col])].push(data[row][col]);
      }
    }
  }
  return output;
}


function untable(table) {
  var output = [[]];
  var keys = Object.keys(table)
  
  for (var col = 0; col < keys.length; col++) {
    output[0].push(keys[col]);
  }
  for (var row = 0; row < table[keys[0]].length; row++) {
    output.push([]);
    for (var col = 0; col < keys.length; col++) {
      output[row].push(table[keys[col]][row]);
    }
  }

  return output;
}



function objectToArray(object) {
  var output = [];
  return Object.keys(object).map(function(key) {return object[key];});
}


function repeat(input, times) {
  var output = [];
  for (var i = 0; i < times; i++) {
    output.push(input);
  }
  return output;
}


function isRectangularArray(data) {
  if (!Array.isArray(data)) {return false;}

  var initialLength = undefined;
  for (var row = 0; row < data.length; row++) {
    if (!Array.isArray(data[row])) {return false;}
    if (initialLength === undefined) {initialLength = data[row].length;}
    if (data[row].length !== initialLength) {return false;}
  }
  return true;
}


function unique(a) {
  var output = [];
  for (var i = 0; i < a.length; i++) {
    if (output.indexOf(a[i]) === -1) {output.push(a[i]);}
  }
  return output;
}
