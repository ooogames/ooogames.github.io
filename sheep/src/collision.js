
// standard global variables
var clock = new THREE.Clock();
// custom global variables

var movingCube;
var collidableMeshList = [];


// FUNCTIONS 		
function init() 
{
	scene.add(wall);
	collidableMeshList.push(wall);
	var wall = new THREE.Mesh(wallGeometry, wireMaterial);
	wall.position.set(100, 50, -100);
	scene.add(wall);

}

//LOOP
{
	function collide(){

		var delta = clock.getDelta(); // seconds.

		// collision detection:
		//   determines if any of the rays from the cube's origin to each vertex
		//		intersects any face of a mesh in the array of target meshes
		//   for increased collision accuracy, add more vertices to the cube;
		//		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
		//   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
		var originPoint = staticCube.position;

		sphere.rotation.z += 0.01

		for (var vertexIndex = 0; vertexIndex < staticCube.geometry.vertices.length; vertexIndex++)
		{
			var vertices = staticCube.geometry.vertices;
			vertex.copy( vertices[ vertexIndex ] );

			vertex.applyMatrix4( staticCube.matrixWorld );
			const length = direction.subVectors( vertex, originPoint ).length();
			direction.divideScalar( length );

			var ray = new THREE.Raycaster( originPoint, direction );
			var collisionResults = ray.intersectObjects( collidableMeshList );
			if ( collisionResults.length > 0 && collisionResults[0].distance < length ) 

				sphere.rotation.z -= 0.01
		}	





		var delta = clock.getDelta(); // seconds.
		var moveDistance = 200 * delta; // 200 pixels per second
		var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second


		// collision detection:
		//   determines if any of the rays from the cube's origin to each vertex
		//		intersects any face of a mesh in the array of target meshes
		//   for increased collision accuracy, add more vertices to the cube;
		//		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
		//   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
		var originPoint = movingCube.position.clone();

		sea.mesh.rotation.z += game.speed*deltaTime

		for (var vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++)
		{		
			var localVertex = movingCube.geometry.vertices[vertexIndex].clone();
			var globalVertex = localVertex.applyMatrix4( movingCube.matrix );
			var directionVector = globalVertex.sub( movingCube.position );

			var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
			var collisionResults = ray.intersectObjects( collidableMeshList );
			if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 

				sea.mesh.rotation.z = 0
		}	



	}

}



