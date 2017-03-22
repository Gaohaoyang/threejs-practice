const THREE = require('three');

class Axes {

  /**
   * 画坐标轴
   * @param  {Scene} scene 场景
   * @param  {Number} x    x 轴长度
   * @param  {Number} y    y 轴长度
   * @param  {Number} z    z 轴长度
   */
  static drawAxes(scene, x = 100, y = 100, z = 100) {
    // x-axis
    const xGeo = new THREE.Geometry();
    xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    xGeo.vertices.push(new THREE.Vector3(x, 0, 0));
    const xMat = new THREE.LineBasicMaterial({color: 0xff0000});
    const xAxis = new THREE.Line(xGeo, xMat);
    scene.add(xAxis);

    // y-axis
    const yGeo = new THREE.Geometry();
    yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    yGeo.vertices.push(new THREE.Vector3(0, y, 0));
    const yMat = new THREE.LineBasicMaterial({color: 0x00ff00});
    const yAxis = new THREE.Line(yGeo, yMat);
    scene.add(yAxis);

    // z-axis
    const zGeo = new THREE.Geometry();
    zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    zGeo.vertices.push(new THREE.Vector3(0, 0, z));
    const zMat = new THREE.LineBasicMaterial({color: 0xffff00});
    const zAxis = new THREE.Line(zGeo, zMat);
    scene.add(zAxis);
  }
}
export default Axes;
