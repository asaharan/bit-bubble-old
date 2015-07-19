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