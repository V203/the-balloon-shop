let assert = require("assert");
// let TheBalloonShop = require("../the-balloon-shop");
const pg = require("pg");
const TheBalloonShop = require("../the-balloon-shop");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/balloons_test';

const pool = new Pool({
    connectionString
});

describe('The balloon function', function () {


    beforeEach(async function () {
     
        // clean the tables before each test run
        await pool.query("delete from valid_color");
        await pool.query("delete from invalid_color")
        await pool.query("insert into valid_color(color_name,count) values('Orange',0)")
        await pool.query("insert into valid_color(color_name,count) values('Purple',0)");
        await pool.query("insert into valid_color(color_name,count) values('Lime',0)");
        
        // add valid colors
    });

    it('should get the valid colors', async function () {

        const theBalloonShop = TheBalloonShop(pool, ['Orange', 'Purple', 'Lime']);
    
        assert.deepEqual(['Orange', 'Purple', 'Lime'], await theBalloonShop.getValidColors());

    });

    it('should get invalid colors', async function () {

        const theBalloonShop = TheBalloonShop(pool, ['Orange', 'Purple', 'Lime']);

        await theBalloonShop.requestColor('Blue');
        await theBalloonShop.requestColor('Red');
        await theBalloonShop.requestColor('Green');
        
        // console.log(await (await pool.query(' select * from invalid_color')).rows);
        assert.deepEqual(['Blue', 'Red', 'Green'], await theBalloonShop.getInvalidColors());

    });

    it('should return count for a specific color', async function () {
        const theBalloonShop = TheBalloonShop(pool/*, ['Orange', 'Purple', 'Lime']*/);

        await theBalloonShop.requestColor('Orange');
        await theBalloonShop.requestColor('Orange');
        await theBalloonShop.requestColor('Purple');
        await theBalloonShop.requestColor('Orange');
        await theBalloonShop.requestColor('Purple');
        await theBalloonShop.requestColor('Orange');
        await theBalloonShop.requestColor('Lime');
       
        assert.equal(4, await theBalloonShop.colorCount('Orange'));
        assert.equal(1, await theBalloonShop.colorCount('Lime'));
        assert.equal(2, await theBalloonShop.colorCount('Purple'));

    })

    it('should get all the colors - valid & invalid', async function () {

        const theBalloonShop = TheBalloonShop(pool, ['Orange', 'Purple', 'Lime']);

        await theBalloonShop.requestColor('Blue')
        await theBalloonShop.requestColor('Red')

        assert.deepEqual(['Orange', 'Purple', 'Lime', 'Blue', 'Red'], await theBalloonShop.allColors());

    })

    // it('an invalid color should become a valid color after 5 requests', async function () {

    //     const theBalloonShop = TheBalloonShop(pool, [[ 'Orange', 'Purple', 'Lime' ]]);

    //     assert.deepEqual([ 'Orange', 'Purple', 'Lime' ], await theBalloonShop.getValidColors());

    //     await theBalloonShop.requestColor('Blue')
    //     await theBalloonShop.requestColor('Blue')
    //     await theBalloonShop.requestColor('Red')
    //     await theBalloonShop.requestColor('Blue')
    //     await theBalloonShop.requestColor('Blue')

    //     assert.deepEqual(['Red','Blue'],await theBalloonShop.getInvalidColors());

    //     await theBalloonShop.requestColor('Blue')

    //     assert.deepEqual(['Blue'], await theBalloonShop.getValidColors());
    //     assert.deepEqual(['Red'], await theBalloonShop.getInvalidColors());

    // });

    after(function () {
        pool.end();
    })
});