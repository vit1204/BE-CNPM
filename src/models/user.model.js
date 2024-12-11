const knex = require("../database/connectDB");

const {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} = require("../middleware/hash");

class userModels {
  tableName = "user";
  idUser = "id_user";
  name = "name";
  age = "age";
  gender = "gender";
  phone = "phone";
  address = "address";
  email = "email";
  username = "username";
  password = "password";
  salt = "salt";
  passwordResetToken = "password_reset_token";
  passwordResetExpiration = "password_reset_expiration";
  createdAt = "created_at";
  createdBy = "created_by";

  createUser = async (dataFile) => {
    const data = dataFile.body;

    return knex(this.tableName)
      .where(this.email, data.email)
      .orWhere(this.username, data.username)
      .then((result) => {
        if (result.length > 0) {
          return Promise.reject({
            message: "Email or username already exists",
          });
        } else {
          // Password default 12345
          const { salt, hashedPassword } = hashPassword(
            data.password || "12345"
          );

          const idUser = knex(this.tableName).insert({
            name: data.name,
            age: data.age,
            gender: data.gender || "Male",
            phone: data.phone,
            address: data.address,
            salt: salt,
            email: data.email,
            username: data.username || data.email,
            password: hashedPassword,
            role: data.role,
          });

          return idUser;
        }
      });
  };

  selectAllUsers = () => {
    return knex(this.tableName).select("*");
  };

  selectOneUser = (id) => {
    return knex(this.tableName)
      .select(
        "user.id_user",
        "user.name",
        "user.age",
        "user.gender",
        "user.phone",
        "user.address",
        "user.email",
        "user.username",
        "user.role",
        "user.created_at",
        "user.created_by"
      )

      .where(this.idUser, id);
  };

  selectOneMail = (mail) => {
    return knex(this.tableName).select("*").where(this.email, mail);
  };

  updateUser = async (id, dataFile) => {
    const data = dataFile.body;

    try {
      // Kiểm tra xem email hoặc username đã tồn tại
      const existingUser = await knex(this.tableName)
        .where(this.email, data.email)
        .orWhere(this.username, data.username)
        .select();

      if (existingUser.length > 0 && existingUser[0].id_user !== parseInt(id)) {
        throw new Error("Email or username already exists");
      }

      const updatedUser = await knex(this.tableName)
        .where(this.idUser, id)
        .update({
          name: data.name,
          age: data.age,
          gender: data.gender,
          phone: data.phone,
          address: data.address,
          email: data.email,
          username: data.username,
          passwordResetToken: data.passwordResetToken,
          passwordResetExpiration: data.passwordResetExpiration,
          createdBy: data.createdBy,
          role: data.role,
        });
      console.log("dataa", data);

      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  deleteUser = (id) => {
    return knex(this.tableName).where(this.idUser, id).del();
  };

  searchUser = (key) => {
    return knex(this.tableName)
      .select("*")
      .where(this.name, "like", `%${key}%`)
      .orWhere(this.age, "like", `%${key}%`)
      .orWhere(this.gender, "like", `%${key}%`)
      .orWhere(this.phone, "like", `%${key}%`)
      .orWhere(this.address, "like", `%${key}%`)
      .orWhere(this.mail, "like", `%${key}%`);
  };
}

module.exports = new userModels();
