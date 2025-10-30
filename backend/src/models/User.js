import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: { isEmail: true }
  },
  password: { type: DataTypes.STRING, allowNull: false, minLength: 6 },
  role: { 
    type: DataTypes.ENUM('patient', 'doctor', 'admin'), 
    defaultValue: 'patient' 
  },
  phone: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  resetPasswordToken: { type: DataTypes.STRING },
  resetPasswordExpire: { type: DataTypes.DATE },
}, { 
  timestamps: true,
  tableName: 'users'
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 12);
});

User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default User;