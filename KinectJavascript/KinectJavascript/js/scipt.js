function Status() {

    /**
     * 0 : static;
     * 1 : left;
     * 2 : up;
     * 3 : right;
     * 4 : down;
     */
    this.move = 0;

    /** The start time of this action.*/
    this.startTime = 0;

    /** What to draw.*/
    this.curRow = 0;
    this.curCol = 0;

}

function Gallery() {

    this.status = new Status();

    /**
     * The keyboard bind function.
     * 0 -> left arrow
     * 1 -> up arrow
     * 2 -> right arrow
     * 3 -> down arrow
     */
    this.keyFunc = function (key) {
        if (this.status.move == 0) {
            console.log("Key pressed: " + key);

            // ---
            var row = Math.floor(Math.sqrt(this.pictures.length));
            var col = Math.ceil(this.pictures.length / row);
            console.log("row = " + row);
            console.log("col = " + col);
            // ---

            this.status.move = key + 1;
            this.status.startTime = new Date().getTime();
        }
    }.bind(this);

    this.justifyRow = function (r) {
        // return r;
        var row = Math.floor(Math.sqrt(this.pictures.length));
        while (r < 0 && row > 0) {
            r += row;
        }
        return r % row;
    }

    this.justifyCol = function (c) {
        // return c;
        var row = Math.floor(Math.sqrt(this.pictures.length));
        var col = Math.ceil(this.pictures.length / row);
        while (c < 0 && col > 0) {
            c += col;
        }
        return c % col;
    }

    this.getPicId = function (r, c) {
        var row = Math.floor(Math.sqrt(this.pictures.length));
        var col = Math.ceil(this.pictures.length / row);
        r = (r + row) % row;
        c = (c + col) % col;
        var ret = r * col + c;
        if (ret < this.pictures.length && ret >= 0) {
            return ret;
        } else {
            return -1;
        }
    }

    /** The current picture on showing.*/
    this.curPic = 0;

    /**
     * The grid of pictures.
     */
    this.pictures = new Array();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.onLoadPic = function (texture) {
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

        // Add it into the pictures array.
        this.pictures.push(mesh);

        console.log("Finish loading picture: " + this.pictures.length);

    }.bind(this);

    this.onInit = function (filebase) {
        /**
         * First we try 4 by 4 grid.
         */
        for (var i = 0; i < 16; i++) {
            this.texture = THREE.ImageUtils.loadTexture(
                "/images/" + i + ".jpg",
                undefined,
                this.onLoadPic
            );
        }
        
    };

    // this.on

    this.Render = function () {
        
        // set current status

        // var matrix = new THREE.Matrix4();
        // matrix.makeTranslation(1, 1, 1);
        // mesh.applyMatrix(matrix);
        
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 2;
        
        //var idx = this.getPicId(this.status.curRow, this.status.curCol);
        //if (idx >= 0) {
        //    scene.add(this.pictures[idx]);
        //}

        var dx = 5.8;
        var dy = 3.2;
        var dz = 1;
        var cnt = 0;

        var nextCol = this.status.curCol;
        var nextRow = this.status.curRow;
        switch (this.status.move) {
            /**
                     * 0 : static;
                     * 1 : left;
                     * 2 : up;
                     * 3 : right;
                     * 4 : down;
                     */
            case 1:
                nextCol--;
                break;
            case 2:
                nextRow++;
                break;
            case 3:
                nextCol++;
                break;
            case 4:
                nextRow--;
                break;
        }

        var portion = (new Date().getTime() - this.status.startTime) / 1000.0;
        if (portion > 1) {
            portion = 1;
        }

        for (var r = this.status.curRow - 2; r <= this.status.curRow + 2; r++) {
            for (var c = this.status.curCol - 2; c <= this.status.curCol + 2; c++) {
                var idx = this.getPicId(r, c);
                if (idx < 0) {
                    continue;
                }
                var mesh = new THREE.Mesh(this.pictures[idx].geometry, this.pictures[idx].material);

                var x_start = c - this.status.curCol;
                var y_start = r - this.status.curRow;

                var x_end = c - nextCol;
                var y_end = r - nextRow;

                // var translation = new THREE.Matrix4();

                var x = x_start + (x_end - x_start) * portion;
                var y = y_start + (y_end - y_start) * portion;

                mesh.position.x = x * dx;
                mesh.position.y = y * dy;
                mesh.position.z = -Math.sqrt(x * x + y * y) * dz;

                mesh.updateMatrix();

                //translation.makeTranslation(x * dx, y * dy, -Math.sqrt(x * x + y * y) * dz);
                //mesh.applyMatrix(translation);

                scene.add(mesh);
                cnt++;
            }
        }

        //console.log("CNT = " + cnt);

        if (portion >= 1 && this.status.move != 0) {
            this.status.move = 0;
            this.status.curCol = this.justifyCol(nextCol);
            this.status.curRow = this.justifyRow(nextRow);
        }

        //for (var i in this.pictures) {
        //    scene.add(this.pictures[i]);
        //}

        this.renderer.render(scene, camera);

        requestAnimationFrame(this.Render);

    }.bind(this);
    
    this.translation = new THREE.Matrix4();
    this.translation.makeTranslation
}

var theGallery = new Gallery();
theGallery.onInit('a');
theGallery.Render();

$(document).keydown(function (e) {
    switch (e.which) {
        case 37: // left
        case 38: // up
        case 39: // right
        case 40: // down
            theGallery.keyFunc(e.which - 37);
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});