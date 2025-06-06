/*
	名字:	次元的縫隙
	地圖:	邪惡的內的空地
	描述:	272030410
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getPlayer().getMap().startMapEffect("Those who cannot overcome the hatred in their hearts are doomed to remain here forever.", 5120057);
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(272030400), pi.getMap(272030400).getPortal(0)); //阿卡伊農的祭壇
		return true;
}