class Queries {
    constructor() { }


    static receive(table, fields, condition = {}) {
        const dbQuery = {
            query: `select ${fields} from ${table}`,
            value: []
        }
        const conditionValue = Object.keys(condition)
        if (conditionValue.length) {
            dbQuery.query += ` where ${conditionValue[0]}=$1`
            dbQuery.value.push(condition[conditionValue[0]])
            for (let i = 1; i < conditionValue.length; i++) {
                dbQuery.query += ` and ${conditionValue[i]}=$${i + 1} `
                dbQuery.value.push(condition[conditionValue[i]])
            }
        }
        return dbQuery
    }

    static create(table, data) {
        let variables = '$1'
        for (let i = 2; i <= Object.keys(data).length; i++)
                variables += `,$${i}`

        const dbQuery = {
            query: `insert into ${table} (${Object.keys(data)}) values (${variables})`,
            value: Object.values(data)
        }
        return dbQuery
    }

    static update(table, data, conditionField, conditionValue) {
        const countDataValues = Object.keys(data)
        if (!countDataValues.length)
            throw 'موردی برای آپدیت یافت نشد'
        let values = [data[countDataValues[0]]]
        let updateData = `${countDataValues[0]}=$1`
        for (let i = 1; i < countDataValues.length; i++) {
            values.push(data[countDataValues[i]])
            updateData += `,${countDataValues[i]}=$${i + 1}`
        }

        const dbQuery = {
            query: `update ${table} SET ${updateData} where ${conditionField} = $${countDataValues.length + 1}`,
            value: [...values, conditionValue]
        }
        return dbQuery
    }
}

module.exports = Queries