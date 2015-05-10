var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// load a texture, set wrap mode to repeat
var texture = THREE.ImageUtils.loadTexture("/images/test.jpg");
//texture.wrapS = THREE.RepeatWrapping;
//texture.wrapT = THREE.RepeatWrapping;
//texture.repeat.set(4, 4);

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
    new THREE.Vector2(0, 1),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1, 0)
]);

geometry.faceVertexUvs[0].push([
    new THREE.Vector2(1, 0),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(0, 1)
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