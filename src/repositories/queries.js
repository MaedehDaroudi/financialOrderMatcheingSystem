class Queries {
    constructor() { }


    static receive(table, fields, conditionField, conditionValue) {
        const dbQuery = {
            query: `select ${fields} from ${table}`,
            value: []
        }
        if (conditionField.length) {
            dbQuery.query += ` where ${conditionField}=$1`
            dbQuery.value.push(conditionValue)
        }
        return dbQuery
    }

    static create(table, data) {
        let variables='$1'
        for (let i = 2; i <= Object.keys(data).length; i++)
            variables += `,$${i}`

        const dbQuery = {
            query: `insert into ${table} (${Object.keys(data)}) values (${variables})`,
            value: Object.values(data)
        }
        return dbQuery
    }
}

module.exports = Queries