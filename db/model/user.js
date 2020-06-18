const seq = require('../seq')
const Sequelize = require('sequelize')

let User = seq.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING, //varchar(255)
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING, //varchar(255)
        allowNull: false,
        unique: false
    },
    gender: {
        type: Sequelize.ENUM(['男','女','妖']),
        defaultValue: '男'
    }
}, {
    freezeTableName: true,// 不需要给我的表名加上 's'
    timestamps: true // 是否需要自动创建createAt/updateAt这两个字段
})
module.exports = User