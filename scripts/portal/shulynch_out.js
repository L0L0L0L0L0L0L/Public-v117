/*
	名字:	隱藏地圖
	地圖:	萬人迷的第一個試驗場
	描述:	912040100
*/

function enter(pi) {
	pi.getClient().getSession().write(Packages.tools.packet.CWvsContext.serverNotice(5, "You have finished the training and will now return."));
	pi.getPlayer().changeMap(pi.getMap(120000104), pi.getMap(120000104).getPortal(0)); //訓練場
	return true;
}