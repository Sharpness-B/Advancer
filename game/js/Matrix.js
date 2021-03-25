class Matrix
{
    static multiply(left, right)
    {

        let leftRows      = left.length;
        // let leftColumns   = left[0].length;
        // let rightRows     = right.length;
        let rightColumns  = right[0].length;

        let resultRows    = leftRows;
        let resultColumns = rightColumns;

        let result = [];
        for(let r=0; r<resultRows; r++) {
            let row= [];
            for(let c=0; c<resultColumns; c++) {
                let value = 0;
                for( let i=0; i<right.length; i++) {
                    value += left[r][i] * right[i][c];
                }
                row.push(value);
            }
            result.push(row);
        }
        return result;
    }

    static v3tom(vector)
    {
        return([[vector.x],
                [vector.y],
                [vector.z],
                [1]]);
    }

    static rotateX(ang)
    {
        return([[                 1,                  0,                  0],
                [                 0,    Math.cos(theta), -1*Math.sin(theta)],
                [                 0,    Math.sin(theta),    Math.cos(theta)]]);
    }

    static rotateY(ang)
    {
        return( [[Math.cos(ang),  0, Math.sin(ang)],
                [0,                1,             0],
                [-1*Math.sin(ang), 0,  Math.cos(ang)]]);
    }

    static rotateZ(ang)
    {
        return([[   Math.cos(theta), -1*Math.sin(theta),                  0],
                [   Math.sin(theta),    Math.cos(theta),                  0],
                [                 0,                  0,                  1]]);
    }
}