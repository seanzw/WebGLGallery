var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// load a texture, set wrap mode to repeat
var texture = THREE.ImageUtils.loadTexture(
    "/images/test.jpg",
    undefined,
    function (texture) {
        var h = texture.image.height;
        var w = texture.image.width;

        var geometry = new THREE.Geometry();

        var width = 4;
        var height = width * h / w;

        geometry.vertices.push(
            new THREE.Vector3(-width / 2, height / 2, 0),
            new THREE.Vector3(-width / 2, -height / 2, 0),
            new THREE.Vector3(width / 2, -height / 2, 0),
            new THREE.Vector3(width / 2, height / 2, 0)
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
    }
);

//var image_loader = new THREE.ImageLoader();
//var image = image_loader.load("/images/test.jpg");
//texture = new THREE.Texture(image);

//texture.wrapS = THREE.RepeatWrapping;
//texture.wrapT = THREE.RepeatWrapping;
//texture.repeat.set(4, 4);



var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

render();