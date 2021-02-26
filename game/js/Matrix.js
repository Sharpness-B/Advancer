class Matrix
{
    cols;
    rows;
    matArray;

    constructor(matrixArray)
    {
        this.rows = matrixArray[0].length;
        this.cols = matrixArray.length;
        this.matArray = matrixArray;
    }

    static multiply(mat1, mat2)
    {
        let mat3array = new Array();
        for(let r = 0; r < mat2.cols; r++)
        {
            mat3array.push(new Array(mat1.rows));
        }
        
        for(let k = 0; k < mat2.cols; k++)
        {
            for(let r = 0; r < mat2.rows; r++)
            {
                let sum = 0;
                for(let c = 0; c < mat1.cols; c++)
                {
                    sum += mat1.matArray[c][r] * mat2.matArray[k][c];
                }
                mat3array[k][r] = sum;
            }
        }
        return(mat3array);
    }

    static vtom(vector)
    {
        return(new Matrix([[vector.x, vector.y, vector.z, 1]]));
    }

    static invert(matrix)
    {
        let matArray = matrix.matArray;
        for(let c = 0; c < matArray.length; c++)
        {
            for(let r = 0; r < matArray[0].length; r++)
            {
                matArray[c][r] = 1/matArray[c][r];
            }
        }

        return(new Matrix(matArray));
    }
}