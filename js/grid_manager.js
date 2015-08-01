/**
 * Created by amitkum on 20/7/15.
 */
function Grid(){
    var self=this;
    this.events=[];
    this.grid=[];//grid will be array of tiles
    this.previousGrid=[];
    this.fixedTile=null;
    this.size=size;
    this.initialValue=initialValue;
    this.gridContainerOuter=document.querySelector('.gridContainerOuter');
    this.gridContainerInner=document.querySelector('.gridContainerInner');
    this.backgroundGrid=document.querySelector('.backgroundGrid');
    this.mainGrid=document.querySelector('.mainGrid');

    console.log('animation frame is',window.requestAnimationFrame);
    window.requestAnimationFrame(function () {
        self.setup();
    });
}
Grid.prototype.setup= function () {
    var i,j;
    var randomPosition=this.getRandomPosition();
    for(i=0;i<this.size;i++){
        for(j=0;j<this.size;j++){
            var tile;
            if(i==randomPosition.x&&j==randomPosition.y){
                tile=this.createTile({x:i,y:j},this.initialValue,true);
                this.fixedTile=tile;
            }else{
                tile=this.createTile({x:i,y:j},this.initialValue,false);
            }
            console.log('mainGrid is '+this.mainGrid);
            tile.addEventListener('click',this.onTileClick.bind(this));
            this.mainGrid.appendChild(tile);
        }
    }
};
Grid.prototype.createTile= function (position,value,isFixed) {
    var tile=new Tile(position.x,position.y,value);
    if(isFixed==true){
        tile.classList[4]='fixed';
    }
    tile.isVisible=true;
    this.grid.push(tile);
    return tile.makeHTMLNode();
};
Grid.prototype.getRandomPosition= function () {
    var random={};
    random.x=Math.floor(Math.random()*this.size);
    random.y=Math.floor(Math.random()*this.size);
    return random;
};
/*
* Applies changes to grid, if any
**/
Grid.prototype.applyChanges= function () {
    this.grid.forEach(function (tile) {
       tile.applyChanges();
    });
};
Grid.prototype.applyClasses=function(element,classes){
    element.setAttribute('class',classes.join(' '));
};
Grid.prototype.on= function (event,callback) {
    if(!this.events[event]){
        this.events[event]=[];
    }
    this.events[event].push(callback);
};
Grid.prototype.emit= function (event,data) {
    var callbacks=this.events[event];
    if(callbacks){
        callbacks.forEach(function (callback) {
            callback(data);
        })
    }
};
Grid.prototype.onTileClick= function (event) {
    if(event.target==this.fixedTile || this.findTileById(event.target.id).isVisible==false){//clicked on fixed tile
        console.log(event.target);
        return;
    }
    this.emit('tileClick',this.findTileById(event.target.id));
};
Grid.prototype.findTileById= function (id) {
    var tile=null;
    this.grid.forEach(function (t) {
        if(t.positionClass()==id){
            tile=t;
        }
    });
    return tile;
};
Grid.prototype.findNextTile= function (position, dir) {
    var toMerge=null;
    var i=0;
    if(directions.right==dir){
        for(i=position.x+1;i<this.size;i++){
            toMerge=this.findTileByPosition({x:i,y:position.y});
            if(toMerge!=null){
                return toMerge;
            }
        }
        return null;
    }
    if(directions.down==dir){
        for(i=position.y+1;i<this.size;i++){
            toMerge=this.findTileByPosition({x:position.x,y:i});
            if(toMerge!=null){
                return toMerge;
            }
        }
        return null;
    }
    if(directions.left==dir){
        for(i=position.x-1;i>-1;i--){
            toMerge=this.findTileByPosition({x:i,y:position.y});
            if(toMerge!=null){
                return toMerge;
            }
        }
        return null;
    }
    if(directions.up==dir){
        for(i=position.y-1;i>=-1;i--){
            toMerge=this.findTileByPosition({x:position.x,y:i});
            if(toMerge!=null){
                return toMerge;
            }
        }
        return null;
    }
    return false;
};
Grid.prototype.findTileByPosition= function (position) {
    var tileToReturn=null;
    this.grid.forEach(function (tile) {
        var tilePosition=tile.position();
        if(tilePosition.x==position.x&&tilePosition.y==position.y&&tile.isVisible==true){
            tileToReturn=tile;
        }
    });
    return tileToReturn;
};