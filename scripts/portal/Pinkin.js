/*
	名字:	神殿深處
	地圖:	遺失的黃昏
	描述:	270050200
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(270050100), pi.getMap(270050100).getPortal(0)); //神祇的黃昏
	return true;
}