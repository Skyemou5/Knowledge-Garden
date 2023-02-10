function createDrawingNodes()
{  

  	//Gets the selected nodes.
    	var selectedNodes = selection.numberOfNodesSelected();

	//Process if only one node is selected
	if(selectedNodes == 1){

		//Compiles all operations to undo in one action.
		scene.beginUndoRedoAccum("Create Drawing Nodes");
 
		//Loops through the selected nodes.
   		 for(var n = 0; n < selectedNodes; n++){
 
			//Gets the instance of the currently selected node.
			var currentNode = selection.selectedNode(n);
			//Gets the X and Y coordinate of the selected node.
 			var posX = node.coordX(currentNode);
         		var posY = node.coordY(currentNode);

			//Loops 4 times.
			for(var i = 0; i < 4; i++){

				//Adds a new drawing node close to the selected composite node.
				var newNode =  node.add(node.parentNode(currentNode), "drawing_" + (i + 1), "READ", posX + (120 * i), posY - 100, 0);
				//Links the new node to the selected Composite.
				node.link(newNode, 0, currentNode, 0);

			}
 
    		}

		//Ends the undo redo stack.
		scene.endUndoRedoAccum();

	}else{

		//Displays a warning message if 0 or more than one node is selected.
		MessageBox.information("You must select only 1 Composite node.");

	}
	
}