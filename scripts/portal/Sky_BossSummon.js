/*
	名字:	神木村
	地圖:	天空的巢穴
	描述:	240080500
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorById(2408005).getState() < 1) {
		pi.getPlayer().getMap().getReactorById(2408005).forceHitReactor(1);
		pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8300007), new java.awt.Point(292, -10));
		}
		return false;
}