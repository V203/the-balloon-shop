module.exports = (pool, validColors) => {

    async function getValidColors() {
        let results = await pool.query(`select color_name from valid_color`)
        return results.rows.map((elem) => { return elem.color_name})
    }

    async function getInvalidColors() {
        let results = await pool.query(`select color_name from invalid_color`)
        return  results.rows.map((elem) => { return elem.color_name });
    }

    async function requestColor(color) {
        await pool.query(`insert into invalid_color(color_name,count) values('${color}' ,1) ON CONFLICT (color_name) DO UPDATE  SET count=invalid_color.count+1`)
    }

    async function colorCount(color) {
        let results = await pool.query(`select invalid_color.count from invalid_color,valid_color where invalid_color.color_name = '${color}'`);
        return results.rows[0]['count']
    }

    async function allColors() {

        let results = await pool.query(`select valid_color.color_name from valid_color UNION ALL select invalid_color.color_name from invalid_color`)
        return  results = results.rows.map((elem) => {return elem.color_name})
    }

    async function requestColor_V_II(color) {
        await pool.query(`insert into invalid_color(color_name,count) values('${color}' ,1) ON CONFLICT (color_name) DO update set count = invalid_color.count + 1  where invalid_color.count > 5  (  insert into valid_color(color_name,count) values('${color}' ,1)))`)
    }

    return {
        getValidColors,
        requestColor,
        colorCount,
        getInvalidColors,
        allColors,
        requestColor_V_II
    }
}