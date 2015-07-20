/**
 * Created by amitkum on 20/7/15.
 */
var size= 5,directions={up:1,right:2,down:3,left:4};
var game;
var initialValue=512,width=502,minSpace=10;
window.requestAnimationFrame(function () {
    game=new GameManager(Grid,Stylesheet,BitManager,MasterLogic);
});