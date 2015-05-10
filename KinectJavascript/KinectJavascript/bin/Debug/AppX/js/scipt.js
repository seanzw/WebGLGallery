var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// load a texture, set wrap mode to repeat
var texture = THREE.ImageUtils.loadTexture("/images/test.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

//var geometry = new THREE.BufferGeometry();
//// create a simple square shape. We duplicate the top left and bottom right
//// vertices because each vertex needs to appear once per triangle. 
//var vertexPositions = [
//	[-1.0, -1.0, 1.0],
//	[1.0, -1.0, 1.0],
//	[1.0, 1.0, 1.0],

//	[1.0, 1.0, 1.0],
//	[-1.0, 1.0, 1.0],
//	[-1.0, -1.0, 1.0]
//];

//var vertexUVPositions = [
//    [0.0, 0.0],
//	[1.0, 0.0],
//	[1.0, 1.0],

//	[1.0, 1.0],
//	[0.0, 1.0],
//	[0.0, 0.0]
//];

//var vertices = new Float32Array(vertexPositions.length * 3); // three components per vertex
//var verticesUV = new Float32Array(vertexUVPositions.length * 2);

//// components of the position vector for each vertex are stored
//// contiguously in the buffer.
//for (var i = 0; i < vertexPositions.length; i++) {
//    vertices[i * 3 + 0] = vertexPositions[i][0];
//    vertices[i * 3 + 1] = vertexPositions[i][1];
//    vertices[i * 3 + 2] = vertexPositions[i][2];
//}

//// components of the position vector for each vertex are stored
//// contiguously in the buffer.
//for (var i = 0; i < vertexUVPositions.length; i++) {
//    vertices[i * 2 + 0] = vertexUVPositions[i][0];
//    vertices[i * 2 + 1] = vertexUVPositions[i][1];
//}

//// itemSize = 3 because there are 3 values (components) per vertex
//geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

////var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//var material = new THREE.MeshBasicMaterial({ map: texture });
//var mesh = new THREE.Mesh(geometry, material);

var geometry = new THREE.Geometry();

geometry.vertices.push(
	new THREE.Vector3(-1, 1, 0),
	new THREE.Vector3(-1, -1, 0),
	new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(1, 1, 0)
);

geometry.faces.push(new THREE.Face3(0, 1, 2));
geometry.faces.push(new THREE.Face3(2, 3, 0));

geometry.faceVertexUvs[0].push([
    new THREE.UV(0, 1),
    new THREE.UV(1, 1),
    new THREE.UV(1, 0)
]);

var material = new THREE.MeshBasicMaterial({ map: texture });
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

camera.position.z = 5;

var render = function () {
    requestAnimationFrame(render);

    //cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

render();