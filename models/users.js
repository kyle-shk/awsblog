const db = require("../components/db");
module.exports.getList = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users`, (error, results, fields) => {
      if (error) {
        //When done with the connection, release it.
        connection.release(); //무조건해줘야함
        reject(error);
      }
      connection.release(); //무조건해줘야함
      resolve(results);
    });
  });
};

module.exports.detailgetList = async (
  connection, // PoolConnection
  options // {idx, name}
) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users  WHERE user_id = "${options.user_id}"`,
      (error, results, fields) => {
        if (error) {
          //When done with the connection, release it.
          connection.release(); //무조건해줘야함
          reject(error);
        }
        connection.release(); //무조건해줘야함
        resolve(results);
      }
    );
  });
};

// module.exports.getList = async (
//   connection, // PoolConnection
//   options // {idx, name}
// ) => {
//   let query = `SELECT * FROM users`;
//   let values = [];
//   if (options) {
//     if (options.user_id) {
//       query += " WHERE user_id = ?";
//       values.push(options.user_id);
//     }
//     if (options.user_idx) {
//       query += " WHERE user_idx = ?";
//       values.push(options.user_idx);
//     }
//   }
//   return await db.query(connection, {
//     query: query,
//     values: values,
//   });
// };

module.exports.insert = async (connection, options) => {
  let query = `INSERT INTO users SET ?`;
  let values = options;
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

module.exports.update = async (connection, options) => {
  let query = `UPDATE users SET ?`;
  let values = [options];
  if (options) {
    if (options.user_idx) {
      query += " WHERE user_idx = ?";
      values.push(options.user_idx);
    }
  }
  // UPDATE users SET ? WHERE user_idx = ?
  return await db.query(connection, {
    query: query,
    values: values,
  });
};

module.exports.delete = async (connection, options) => {
  let query = `DELETE FROM users`;
  let values = [];
  if (options) {
    if (options.user_idx) {
      query += " WHERE user_idx = ?";
      values.push(options.user_idx);
    }
  }
  return await db.query(connection, {
    query: query,
    values: values,
  });
};
