/*
	名字:	次元的縫隙
	地圖:	邪惡內面的空地
	描述:	272020300
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getPlayer().getMap().startMapEffect("Those who cannot overcome the hatred in their hearts are doomed to remain here forever.", 5120057);
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(272020200), pi.getMap(272020200).getPortal(0)); //阿卡伊農的祭壇
		return true;
}