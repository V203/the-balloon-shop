module.exports = (pool, validColors) => {


    // insert valid colors into the database here




    async function getValidColors() {
        let results = await pool.query(`select valid_color.color_name from valid_color`)

        let arrHolder = []
        for (const i in results.rows) {
            arrHolder
            arrHolder.push(results.rows[i]['color_name'])

        }
        return validColors
    }

    async function requestColor(color) {
        count = 1
        await pool.query(`insert into invalid_color(color_name,count) values('${color}' ,${count++})`)



    }

    async function colorCount(color) {
        let results = await pool.query(`select count from invalid_color where color_name = '${color}'`);

        return results.rows.length
    }

    async function getInvalidColors() {

        let results = await pool.query(`select invalid_color.color_name from invalid_color`)

        let arrHolder = []
        for (const i in results.rows) {
            arrHolder
            arrHolder.push(results.rows[i]['color_name'])

        }
        return arrHolder
    }

    async function allColors() {
        let arrHolder = []

        let results = await pool.query(`select invalid_color.color_name  from invalid_color`)

        for (const i of results.rows) {

            arrHolder.push(Object.values(i))


        }

        return validColors.concat(arrHolder).flat()
    }

    return {
        getValidColors,
        requestColor,
        colorCount,
        getInvalidColors,
        allColors
    }
}