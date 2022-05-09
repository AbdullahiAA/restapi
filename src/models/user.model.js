const db = require("../config/db.config");

// Constructor
class User {
  constructor(id, email, phone_number) {
    this.id = id;
    this.email = email;
    this.phone_number = phone_number;
  }

  // The static represent each method
  static create(newUser, result) {
    db.query(
      `INSERT INTO users VALUES (?,?,?)`,
      [newUser.id, newUser.email, newUser.phone_number],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("Created User: ", { ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  }

  static findById(id, result) {
    db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found User: ", res[0]);
        result(null, res[0]);
        return;
      }

      //   Not found
      result({ kind: "Not found" }, null);
    });
  }

  static getAll(result) {
    db.query(`SELECT * FROM users`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Users: ", res);
      result(null, res);
    });
  }

  static updateById(id, user, result) {
    db.query(
      `UPDATE users SET id = ?, email=?,phone_number = ? WHERE id = ?`,
      [user.id, user.email, user.phone_number, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows === 0) {
          // Not found
          result({ kind: "Not found" }, null);
          return;
        }

        console.log("Updated User: ", { ...user });
        result(null, { ...user });
      }
    );
  }

  static delete(id, result) {
    db.query(`DELETE FROM users WHERE id = ?`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // Not found
        result({ kind: "Not found" }, null);
        return;
      }

      console.log(`Deleted user with id: ${id}`);
      result(null, res);
    });
  }
}

module.exports = User;
