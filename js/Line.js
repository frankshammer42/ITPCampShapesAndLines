class Line{
    constructor(start, end, numberOfPoints, step){
        this.start = start;
        this.end = end;
        this.numberOfPoints = numberOfPoints;
        this.step = step;
        this.lineGeometry = new THREE.BufferGeometry();
        this.linePosition = new Float32Array(numberOfPoints * 3);
        this.lineGeometry.addAttribute("position", new THREE.BufferAttribute(this.linePosition, 3));
        this.material = new THREE.LineBasicMaterial({color: 0xFFFFFF});
        this.line = new THREE.Line(this.lineGeometry, this.material);
        this.line.geometry.dynamic = true;
        this.line.geometry.setDrawRange(0,  this.numberOfPoints);
        this.line.geometry.attributes.position.needsUpdate = true;
    }



    update(){



    }

}