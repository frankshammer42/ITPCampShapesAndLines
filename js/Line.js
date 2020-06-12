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
        this.createLine();
        this.line.geometry.dynamic = true;
        this.drawingProgress = this.numberOfPoints;
        this.line.geometry.setDrawRange(0,  this.drawingProgress);
        this.line.geometry.attributes.position.needsUpdate = true;
    }

    createLine(){
        let xDiff = this.end.x - this.start.x;
        let xUnit = xDiff/this.numberOfPoints;
        for (let i=0; i<this.numberOfPoints; i++){
            this.line.geometry.attributes.position.array[i*3] = this.start.x + xUnit*i;
            this.line.geometry.attributes.position.array[i*3+1] = 0;
            this.line.geometry.attributes.position.array[i*3+2] = 0;
        }
    }

    update(){
        this.line.rotation.y += 0.04;
        // this.drawingProgress += this.step;
        // if (this.drawingProgress <= this.numberOfPoints){
        //     this.line.geometry.setDrawRange(0,  this.drawingProgress);
        //     this.line.geometry.attributes.position.needsUpdate = true;
        // }
        // else{
        //     this.drawingProgress = 0;
        // }
    }

}