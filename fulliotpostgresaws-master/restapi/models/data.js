'use strict'
module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define('data', {
        Tension_L1_N: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Tension_L2_N: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Tension_L3_N: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Corriente_L1: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Corriente_L2: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Corriente_L3: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Potencia_Activa_L1: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Potencia_Activa_L2: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Potencia_Activa_L3: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Potencia_Activa_Total_P: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Potencia_Aparente_Total_S: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Potencia_Reactiva_Total_Q: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Energia_Activa: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Energia_Aparente: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Energia_Reactiva: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Factor_de_Potencia_Total: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        TIMESTAMP: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Data;
};