var Connection = (() => {

  var createConnection = (sheetId) => {
    const ss = SpreadsheetApp.openById(sheetId);

    const timeZone = Session.getScriptTimeZone();
    const date = Utilities.formatDate(new Date(), timeZone, "MM-dd-yyyy HH:mm:ss");

    var createTable = async (table, row) => {

      const colName = ['id'];

      if (ss.getSheetByName(table) !== null) {

        const name = ss.getSheetByName(table);
        var columnNameTable = {};

        const column = name.getLastColumn();

        for (let i = 0; i < column; i++) {
          columnNameTable = { ...columnNameTable, [name.getRange(1, i + 1).getValue()]: i + 1 }
        }
        const columnNameTableKeys = Object.keys(columnNameTable);

        const row = name.getLastRow();
        const rowsName = name.getRange(1, 1, 1, columnNameTableKeys.length).getValues();

        return {
          create(data) {
            const idMax = name.getLastRow() + 1;
            const key = Object.keys(data);
            let valueRow = { "id": idMax };

            key.forEach(val => {
              valueRow = { ...valueRow, [val]: data[val] };
            });

            valueRow = { ...valueRow, "createdAt": date, "updatedAt": date };

            const valueRowKeys = Object.keys(valueRow);

            valueRowKeys.map(val => {
              const indexColumn = columnNameTable[val];
              if (indexColumn !== undefined && indexColumn !== null) {
                name.getRange(idMax, indexColumn).setValue(valueRow[val]);
              } else {
                throw new Error('Column name does not exist ' + val);
              }
            });

            const rows = name.getRange(row + 1, 1, 1, columnNameTableKeys.length).getValues();
            let result = {}
            rowsName[0].forEach((val, i) => {

              if (val !== undefined) {
                result = { ...result, [val]: rows[0][i] }
              }

            })
            return {
              result,
              save() {
                const valueRowKeys = Object.keys(this.result);
                this.result['updatedAt'] = date;
                valueRowKeys.map(val => {
                  const indexColumn = columnNameTable[val];
                  if (indexColumn !== undefined && indexColumn !== null) {
                    name.getRange(this.result['id'], indexColumn).setValue(this.result[val]);
                  } else {
                    throw new Error('Column name does not exist ' + val);
                  }
                });
              },
              destroy() {
                name.deleteRow(this.result['id'])
              }

            };
          },
          findByPk(id) {
            const rows = name.getRange(Number(id), 1, 1, columnNameTableKeys.length).getValues();
            const ids = Number(name.getRange(Number(id), 1).getValue())
            if (ids === 0 && ids === 0.0) {
              return {
                result: 'undefined'
              }
            }
            let result = {}
            rowsName[0].forEach((val, i) => {
              if (val !== undefined) {
                result = { ...result, [val]: rows[0][i] }

              }
            })
            return {
              result,
              save() {
                const valueRowKeys = Object.keys(this.result);
                this.result['updatedAt'] = date;
                valueRowKeys.map(val => {
                  const indexColumn = columnNameTable[val];
                  if (indexColumn !== undefined && indexColumn !== null) {
                    name.getRange(this.result['id'], indexColumn).setValue(this.result[val]);
                  } else {
                    throw new Error('Column name does not exist ' + val);
                  }
                });
              },
              destroy() {
                name.deleteRow(this.result['id'])
              }

            };
          },
          findOne(options) {
            const where = Object.keys(options['where']);

            const rows = name.getDataRange().getValues();

            let data = []
            rows.forEach((value, index) => {
              if (index > 0) {
                let newData = {}
                rowsName[0].forEach((val, i) => {

                  if (val !== undefined) {
                    newData = { ...newData, [val]: rows[index][i] }
                  }
                });
                data.push(newData)
              }
            });

            const newresult = data.filter(row => {
              return row[where] === options['where'][where]
            });
            const result = newresult[0];
            if (result === undefined) {
              return {
                result: 'undefined'
              }
            }
            return {
              result,
              save() {
                const valueRowKeys = Object.keys(this.result);
                this.result['updatedAt'] = date;
                valueRowKeys.map(val => {
                  const indexColumn = columnNameTable[val];
                  if (indexColumn !== undefined && indexColumn !== null) {
                    name.getRange(this.result['id'], indexColumn).setValue(this.result[val]);
                  } else {
                    throw new Error('Column name does not exist ' + val);
                  }
                });
              },
              destroy() {
                name.deleteRow(this.result['id'])
              }

            };
          },
          findAll(options) {
            if (options) {

              if (options['limit'] && options['offset'] && options['where']) {
                const limit = options['limit'];
                const offset = options['offset'];
                const where = Object.keys(options['where']);
                const rows = name.getDataRange().getValues();

                let data = []
                rows.forEach((value, index) => {
                  if (index > 0) {
                    let newData = {}
                    rowsName[0].forEach((val, i) => {
                      if (val !== undefined) {
                        newData = { ...newData, [val]: rows[index][i] }
                      }
                    });
                    data.push(newData)
                  }
                })
                const newresult = data.filter(row => {
                  return row[where] === options['where'][where]
                });

                let result = []
                let i = 0;
                newresult.forEach((val, index) => {
                  if (offset >= index) {
                    if (limit !== i) {
                      i++
                      result.push(val)
                    }
                  }
                });

                return {
                  result,
                  save() {
                    this.result.forEach((val, key) => {
                      const resultData = this.result[key]
                      const valueRowKeys = Object.keys(resultData);

                      resultData['updatedAt'] = date;
                      valueRowKeys.map(val => {
                        const indexColumn = columnNameTable[val];
                        if (indexColumn !== undefined && indexColumn !== null) {
                          name.getRange(resultData['id'], indexColumn).setValue(resultData[val]);
                        } else {
                          throw new Error('Column name does not exist ' + val);
                        }
                      });
                    })

                  }, destroy() {
                    this.result.forEach((val, key) => {
                      name.deleteRow(this.result[key]['id'])
                    })

                  }
                };
              }

              if (options['limit'] && options['where']) {
                const limit = options['limit'];
                const where = Object.keys(options['where']);
                const rows = name.getDataRange().getValues();

                let data = []
                rows.forEach((value, index) => {
                  if (index > 0) {
                    let newData = {}
                    rowsName[0].forEach((val, i) => {
                      if (val !== undefined) {
                        newData = { ...newData, [val]: rows[index][i] }
                      }
                    });
                    data.push(newData)
                  }
                })
                const newresult = data.filter(row => {
                  return row[where] === options['where'][where]
                });

                let result = []
                let i = 0;
                newresult.forEach((val, index) => {

                  if (limit !== i) {
                    i++
                    result.push(val)
                  }

                });
                return {
                  result,
                  save() {
                    this.result.forEach((val, key) => {
                      const resultData = this.result[key]
                      const valueRowKeys = Object.keys(resultData);

                      resultData['updatedAt'] = date;
                      valueRowKeys.map(val => {
                        const indexColumn = columnNameTable[val];
                        if (indexColumn !== undefined && indexColumn !== null) {
                          name.getRange(resultData['id'], indexColumn).setValue(resultData[val]);
                        } else {
                          throw new Error('Column name does not exist ' + val);
                        }
                      });
                    })

                  },
                  destroy() {
                    this.result.forEach((val, key) => {
                      name.deleteRow(this.result[key]['id'])
                    })
                  }
                };
              }

              if (options['where']) {
                const where = Object.keys(options['where']);
                const rows = name.getDataRange().getValues();

                let data = []
                rows.forEach((value, index) => {
                  if (index > 0) {
                    let newData = {}
                    rowsName[0].forEach((val, i) => {
                      if (val !== undefined) {
                        newData = { ...newData, [val]: rows[index][i] }
                      }
                    });
                    data.push(newData)
                  }
                })
                const result = data.filter(row => {
                  return row[where] === options['where'][where]
                });
                if (result.length === 0) {
                  return {
                    result: 'undefined'
                  }
                }
                return {
                  result,
                  save() {
                    this.result.forEach((val, key) => {
                      const resultData = this.result[key]
                      const valueRowKeys = Object.keys(resultData);

                      resultData['updatedAt'] = date;
                      valueRowKeys.map(val => {
                        const indexColumn = columnNameTable[val];
                        if (indexColumn !== undefined && indexColumn !== null) {
                          name.getRange(resultData['id'], indexColumn).setValue(resultData[val]);
                        } else {
                          throw new Error('Column name does not exist ' + val);
                        }
                      });
                    })

                  },
                  destroy() {
                    this.result.forEach((val, key) => {
                      name.deleteRow(this.result[key]['id'])
                    })
                  }
                };
              }

              if (options['limit'] && options['offset']) {

                const limit = options['limit'];
                const offset = options['offset'];


                const rows = name.getDataRange().getValues();

                let data = []
                rows.forEach((value, index) => {
                  if (index > 0) {
                    let newData = {}
                    rowsName[0].forEach((val, i) => {
                      if (val !== undefined) {
                        newData = { ...newData, [val]: rows[index][i] }
                      }
                    });
                    data.push(newData)
                  }
                })
                let result = []
                let i = 0;
                data.forEach((val, index) => {
                  if (index >= offset) {
                    if (limit !== i) {
                      i++
                      result.push(val)
                    }
                  }

                });

                return {
                  result,
                  save() {
                    this.result.forEach((val, key) => {
                      const resultData = this.result[key]
                      const valueRowKeys = Object.keys(resultData);

                      resultData['updatedAt'] = date;
                      valueRowKeys.map(val => {
                        const indexColumn = columnNameTable[val];
                        if (indexColumn !== undefined && indexColumn !== null) {
                          name.getRange(resultData['id'], indexColumn).setValue(resultData[val]);
                        } else {
                          throw new Error('Column name does not exist ' + val);
                        }
                      });
                    })

                  },
                  destroy() {
                    this.result.forEach((val, key) => {
                      name.deleteRow(this.result[key]['id'])
                    })
                  }
                };


              }

              if (options['limit']) {

                const limit = options['limit'];

                const rows = name.getDataRange().getValues();

                let data = []
                rows.forEach((value, index) => {
                  if (index > 0) {
                    let newData = {}
                    rowsName[0].forEach((val, i) => {
                      if (val !== undefined) {
                        newData = { ...newData, [val]: rows[index][i] }
                      }
                    });
                    data.push(newData)
                  }
                })
                let result = []
                let i = 0;
                data.forEach((val, index) => {
                  if (limit !== i) {
                    i++
                    result.push(val)
                  }
                });

                return {
                  result,
                  save() {
                    this.result.forEach((val, key) => {
                      const resultData = this.result[key]
                      const valueRowKeys = Object.keys(resultData);

                      resultData['updatedAt'] = date;
                      valueRowKeys.map(val => {
                        const indexColumn = columnNameTable[val];
                        if (indexColumn !== undefined && indexColumn !== null) {
                          name.getRange(resultData['id'], indexColumn).setValue(resultData[val]);
                        } else {
                          throw new Error('Column name does not exist ' + val);
                        }
                      });
                    })

                  },
                  destroy() {
                    this.result.forEach((val, key) => {
                      name.deleteRow(this.result[key]['id'])
                    })
                  }
                };


              }

            } else {

              const rows = name.getDataRange().getValues();
              let result = []
              rows.forEach((value, index) => {
                if (index > 0) {
                  let data = {}
                  rowsName[0].forEach((val, i) => {

                    if (val !== undefined) {
                      data = { ...data, [val]: rows[index][i] }
                    }
                  });
                  result.push(data)
                }
              })
              return {
                result,
                save() {
                  this.result.forEach((val, key) => {
                    const resultData = this.result[key]
                    const valueRowKeys = Object.keys(resultData);

                    resultData['updatedAt'] = date;
                    valueRowKeys.map(val => {
                      const indexColumn = columnNameTable[val];
                      if (indexColumn !== undefined && indexColumn !== null) {
                        name.getRange(resultData['id'], indexColumn).setValue(resultData[val]);
                      } else {
                        throw new Error('Column name does not exist ' + val);
                      }
                    });
                  })

                },
                destroy() {
                  this.result.forEach((val, key) => {
                    name.deleteRow(this.result[key]['id'])
                  })
                }
              };
            }

          },
          findAndCountAll(options) {
            const data = this.findAll(options);
            const result = {
              'count': row,
              'result': Object.values(data)[0]
            }
            return result
          }
        }
      }

      await ss.insertSheet(table);

      ss.getActiveSheet();

      const name = ss.getSheetByName(table);

      await row.forEach(result => {
        colName.push(result)
      });
      await colName.push('createdAt');
      await colName.push('updatedAt');
      await colName.forEach(result => {
        name.getRange(1, name.getLastColumn() + 1).setValue(result);
      });
      const result = name.getDataRange().getValues()[0];
      return {
        'success': 'true',
        result
      }
    }
    return {
      createTable
    }
  }
  return {
    createConnection
  }
})()




