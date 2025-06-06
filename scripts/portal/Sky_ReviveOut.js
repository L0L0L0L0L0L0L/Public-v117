/*
	名字:	神木村
	地圖:	亡者的洞穴
	描述:	240080050
*/

function enter(pi) {
	if (pi.getMap(240080500).getReactorById(2408005).getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(240080500), pi.getMap(240080500).getPortal(1));
		return true;
		}
	if (pi.getPlayer().getMap().getId() == 240080050) {
		pi.getPlayer().changeMap(pi.getMap(240080400), pi.getMap(240080400).getPortal(1));
		return true;
		}
		map = pi.getMap(240080100).getAllMonstersThreadsafe().size() > 0 ? 240080100 : pi.getMap(240080200).getAllMonstersThreadsafe().size() > 0 ?  240080200 : 240080300;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
		return true;
}