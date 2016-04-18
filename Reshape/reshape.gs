function meltTable(data) {

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
      if (valCols[measure] === valCols[id]) {
        output.measure = output.measure.concat(repeat(valCols[id],
                                                      data[valCols[id]].length));
        output.value = output.value.concat(data[valCols[id]]);
      }
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
      output[row + 1].push(table[keys[col]][row]);
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


function castTable(data, measure, value, def) {
  var output = {};
  var keys = Object.keys(data);
  var idCols = keys.slice();

  // Check if measure is in keys
  // Check if value is in keys
  idCols.splice(idCols.indexOf(measure), 1);
  idCols.splice(idCols.indexOf(value), 1);

  var valCols = [];

  function wideAvailableOrTaken(row) {
    free = -1
    for (var oRow = 0; oRow < nRow(output); oRow++) {
      for (var idCol in idCols) {
        if (output[idCols[idCol]][oRow] !== data[idCols[idCol]][row]) {
          break;
        }
      }
      if (idCol == idCols.length -1) {
        free = oRow;
      }
      if (free > -1 &&
          (output[data[measure][row]][oRow] === def ||
           output[data[measure][row]][oRow] === undefined)) {
        return oRow;
      } else {
        free = -1;
      }
    }
    return -1;
  }

  // Create ID Columns
  for (var col in idCols) {
    output[idCols[col]] = [];
  }

  for (var row in data[measure]) {

    // Add new column if need be
    var outputKeys = Object.keys(output);

    if (outputKeys.indexOf(String(data[measure][row])) === -1) {
      output[data[measure][row]] = [];
      outputKeys = Object.keys(output);
    }

    // Try to add data to an existing row
    var freeRow = wideAvailableOrTaken(row)

    if (idCols.length === 0 || freeRow > -1) {
      while (output[data[measure][row]].length < freeRow) {
        output[data[measure][row]].push(def);
      }
      output[data[measure][row]].push(data[value][row]);
    } else {
      for (var idCol in idCols) {
        output[idCols[idCol]].push(data[idCols[idCol]][row]);
      }
      while (output[data[measure][row]].length < nRow(output) - 1) {
        output[data[measure][row]].push(def)
      }
      output[data[measure][row]].push(data[value][row])
    }
  }

  // Fill columns up with default values
  for (var col in valCols) {
    while (output[valCols[col]].length < nRow(output)) {
      output[valCols[col]].push(def);
    }
  }

  return output;
}


function nRow(o) {
  var keys = Object.keys(o);
  var maxLength = 0
  for (var key in keys) {
    if (o[keys[key]].length > maxLength) {
      maxLength = o[keys[key]].length;
    }
  }
  return maxLength;
}


/**
 * Melts a wide table into a long Format.
 *
 * @param {A1:F8} Range  The range to be molten into a long format
 * @param {"Year", "Country"} IDs   Comma Separated list of the heads that are ID Columns
 * @return {Molten range}
 * @customfunction
 */
function melt(Range, IDs) {
  Range = table(Range, 0);
  Range = meltTable.apply(this, arguments);
  return untable(Range);
}

/**
 * Casts a long table into a wide format.
 *
 * @param {A1:D30} Range  The range to be cast into a wide format
 * @param {"Year"} MeasureColumn  The Header of the Column that indicates the headers of the pivoted values.
 * @param {"Value"} ValueColumn  The Header of the Column that contains the values to be pivoted.
 * @param {"N/A"} defaultValue  The default value used to fill unused cells with (default = "").
 *
 * @return {"Cast Range"}
 * @customfunction
 */
function cast(Range, MeasureColumn, ValueColumn, defaultValue) {
  defaultValue = defaultValue || "";
  Range = table(Range, 0);
  Range = castTable(Range, MeasureColumn, ValueColumn, defaultValue)
  return untable(Range);
}
