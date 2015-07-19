/*!
 * BubbleUp
 * http://github.com/asaharan/bubbleUp
 * @licence MIT
*/
/*!
 * js/application.js
*/
/**
 * Created by amitkum on 20/7/15.
 */
var size=4;
var game;
var initialValue=512;
window.requestAnimationFrame(function () {
    game=new GameManager(Grid);
});;
/*!
 * js/game_manager.js
*/
function GameManager(gridManager,bitManager,masterLogic){
    this.gridManager=new gridManager;
    this.bitManager=bitManager;
    this.masterLogic=masterLogic;
}
GameManager.prototype.init= function () {

};
GameManager.prototype.restart= function () {

};;
/*!
 * js/grid_manager.js
*/
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
};;
/*!
 * js/tile.js
*/
/**
 * Created by amitkum on 20/7/15.
 */

/*
* create new tile, isVisible=true
* */
function Tile(x,y,value){
    this.x=x;
    this.y=y;
    this.value=value;
    this.isVisible=true;
    this.htmlNode=null;
}
Tile.prototype.position= function () {
    return {x:this.x,y:this.y};
};

/*
* If isVisible show it else hide it
* @this {Tile}
* */
Tile.prototype.applyChanges= function () {
    var visibleClassName='visible',removedClassName='removed';
    if(this.isVisible){
        this.htmlNode.classList.add(removedClassName).remove(visibleClassName);
    }else{
        this.htmlNode.classList.remove(removedClassName).add(visibleClassName);
    }
};
Tile.prototype.positionClass= function () {
    return 'tile-'+this.x+'-'+this.y;
};
Tile.prototype.makeHTMLNode= function () {
    var tileElement=document.createElement('div');
    this.htmlNode=tileElement;
    tileElement.textContent=tile.value;
    var classes=['tile',this.positionClass(),'new'];
    this.applyClasses(classes);
};
Tile.prototype.applyClasses=function(classes){
    element.setAttribute('class',classes.join(' '));
};