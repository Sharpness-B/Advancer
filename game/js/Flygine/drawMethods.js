function DrawCube(cube)
{
    let cubeScreen = new Array();
    for(let v = 0; v < cube.vert.length; v++)   
    {
        cubeScreen.push(cam.project(vec3.add(cube.vert[v], cube.pos)));
    }

    for(let f = 0; f < cube.face.length; f++)
    {
        ctx.beginPath();
        ctx.moveTo(scale*cubeScreen[cube.face[f][0]].x, scale*cubeScreen[cube.face[f][0]].y);
        ctx.lineTo(scale*cubeScreen[cube.face[f][1]].x, scale*cubeScreen[cube.face[f][1]].y);
        ctx.lineTo(scale*cubeScreen[cube.face[f][2]].x, scale*cubeScreen[cube.face[f][2]].y);
        ctx.lineTo(scale*cubeScreen[cube.face[f][3]].x, scale*cubeScreen[cube.face[f][3]].y);
        ctx.lineTo(scale*cubeScreen[cube.face[f][4]].x, scale*cubeScreen[cube.face[f][4]].y);
        ctx.fill();
    }
}