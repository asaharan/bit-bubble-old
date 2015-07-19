/**
 * Created by amitkum on 20/7/15.
 */
function Grid(){
    this.grid=[];//grid will be array of tiles
    this.previousGrid=[];
    this.fixedTile=null;
    this.size=size;
    this.initialValue=initialValue;
    this.gridContainerOuter=document.querySelector('.gridContainerOuter');
    this.gridContainerInner=document.querySelector('.gridContainerInner');
    this.backgroundGrid=document.querySelector('.backgroundGrid');
    this.mainGrid=document.querySelector('.mainGrid');
    this.setup();
}
Grid.prototype.setup= function () {
    var i,j;
    for(i=0;i<this.size;i++){
        for(j=0;j<this.size;j++){
            this.createTile({x:i,y:j},this.initialValue);
        }
    }
    this.applyChanges();
};
Grid.prototype.createTile= function (position,value) {
    var tile=new Tile(position.x,position.y,value);
    tile.isVisible=true;
    this.grid.push(tile);
};
/*
* Applies changes to grid, if any
**/
Grid.prototype.applyChanges= function () {
    var self=this;
    var addedTiles =this.grid.diff(this.previousGrid);
    var removedTiles=this.previousGrid.diff(this.grid);
    removedTiles.forEach(function (tile) {
        tile.applyChanges();
    });
    addedTiles.forEach(function (tile) {
        self.addTile(tile);
    });
};
Grid.prototype.addTile= function (tile) {
    tile.makeHTMLNode();
    this.mainGrid.appendChild(tile.htmlNode);
};
Grid.prototype.applyClasses=function(element,classes){
    element.setAttribute('class',classes.join(' '));
};
/*
* this is used to diff grid and previousGrid
 */
Array.prototype.diff= function (a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};