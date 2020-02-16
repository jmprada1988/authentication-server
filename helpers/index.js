const fs = require('fs')

const readFile = (path, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      const result = JSON.parse(data);
      if (err) reject(err)
      else resolve(result)
    })
  })

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
const sortArray = (data, options) => {
  let result = [];
  let sortedItem;
  data.forEach((element, index) => {
    if(options === 'MIX') {
      if(index % 2 === 0) {
        sortedItem = element.sort((a,b) => a - b);
        result = [...result, sortedItem];
      } else {
        sortedItem = element.sort((a,b) => b - a);
        result = [...result, sortedItem];
      }
    } else {
      const sortedItem = options === 'ASC' ? element.sort((a,b) => a -b) : element.sort((a,b) => b - a)
      result = [...result, sortedItem];
    }
  });
  return result;
}

module.exports = {
  readFile,
  writeFile, 
  sortArray,
}