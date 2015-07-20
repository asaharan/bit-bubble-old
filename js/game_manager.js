function GameManager(gridManager,styleSheetManager,bitManager,masterLogic){
    this.gridManager=new gridManager;
    this.styleSheetManager=new styleSheetManager;
    this.bitManager=new bitManager;
    this.masterLogic=new masterLogic;
    this.init();
}
GameManager.prototype.init= function () {
    this.gridManager.on('tileClick',this.play.bind(this));
    this.bitManager.on('mergeComplete',this.onMerge.bind(this));
};
GameManager.prototype.restart= function () {

};
GameManager.prototype.play=function(clickedTile){
    var self=this;
    clickedTile.isVisible=false;
    var availableDirections=this.masterLogic.directions(clickedTile.position());
    if(availableDirections){
        var scoreOfBit=parseInt(clickedTile.value/availableDirections.length);
        availableDirections.forEach(function (direction) {
            var nextTile=self.gridManager.findNextTile(clickedTile.position(),direction);
            if(nextTile!=null){
                self.bitManager.moveBit(direction,clickedTile.position(),nextTile.position(),scoreOfBit);
            }else{
                console.log('next tile not found for ',direction,directions);
                if(direction==directions.up){
                    console.log('up');
                    self.bitManager.moveBit(direction,clickedTile.position(),{x:clickedTile.x,y:-1});
                }
            }
        });
    }
    this.gridManager.applyChanges();
};
GameManager.prototype.onMerge= function (mergeDetails) {//this will called from bit manager when bit animation is over
    console.log('bit animation over and merge details are: ',mergeDetails,'now it should be updated now')
    var tileToBeUpdated=this.gridManager.findTileByPosition(mergeDetails.position);
    tileToBeUpdated.nextValue=tileToBeUpdated.value+mergeDetails.valueTobeAdded;
    this.gridManager.applyChanges();
};