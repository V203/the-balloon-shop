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
        console.log(results.rows.length);
        return results.rows.concat(validColors)
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
        let arrHolder=[]
        let results = await pool.query(`select invalid_color.color_name,invalid_color.color_name from valid_color,invalid_color`)
        for(const i in results.rows){
            arrHolder.concat()
            arrHolder.push(results.rows[0]['color_name'])

            arrHolder.concat(validColors)
            console.log(arrHolder+" arr");
        }
        return arrHolder
    }

    return {
        getValidColors,
        requestColor,
        colorCount,
        getInvalidColors,
        allColors
    }
}