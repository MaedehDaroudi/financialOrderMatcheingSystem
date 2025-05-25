class Queries {
    constructor() { }


    static receive(table, fields, conditionField, conditionValue) {
        const dbQuery = {
            query: `select ${fields} from ${table}`,
            value: []
        }
        if (conditionField?.length === 1) {
            dbQuery.query += ` where ${conditionField}=$1`
            dbQuery.value.push(conditionValue)
        }
    }
}

module.exports = Queries