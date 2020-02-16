const path = require('path');
const { readFile, writeFile, sortArray } = require('../helpers/index');
const asset = path.join(__dirname, '../assets/original.txt');
const destination = path.join(__dirname, '../assets/sorted.txt');
const winston = require('winston');
exports.getAsc = async (req, res, next) => {
  try {
    const ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const originalData = await readFile(asset);
    const sortedData = sortArray(originalData, 'ASC');
    const dataToSave = sortedData.map(arr => JSON.stringify(arr));
    const sortResult = await writeFile(destination, JSON.stringify(dataToSave));
    winston.log('info', `Ip: ${ip} sort: Ascendent`);
    res.status(200).json({
      message: 'Fetched ASC data successfully.',
      result: sortedData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  
}

exports.getDes = async (req, res, next) => {
  try {
    const ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const originalData = await readFile(asset);
    const sortedData = sortArray(originalData);
    const dataToSave = sortedData.map(arr => JSON.stringify(arr))
    const sortResult = await writeFile(destination, JSON.stringify(dataToSave));
    winston.log('info', `Ip: ${ip} sort: Descendent`);
    res.status(200).json({
      message: 'Fetched DES data successfully.',
      result: sortedData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getMix = async (req, res, next) => {
  try {
    const ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const originalData = await readFile(asset);
    const sortedData = sortArray(originalData, 'MIX');
    const dataToSave = sortedData.map(arr => JSON.stringify(arr))
    const sortResult = await writeFile(destination, JSON.stringify(dataToSave));
    winston.log('info', `Ip: ${ip} sort: Mixexd`);
    res.status(200).json({
      message: 'Fetched MIX data successfully.',
      result: sortedData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}